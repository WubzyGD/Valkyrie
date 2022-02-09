const Discord = require('discord.js');
const mi = require('manyitems');

const {Tag} = require('../../util/tag');
const {TagFilter} = require('../../util/tagfilter');

module.exports = {
    name: "dice",
    aliases: ["die", "d", "rolldice", "diceroll", "roll"],
    meta: {
        category: 'Utility',
        description: "Roll some dice",
        syntax: '`dice <roll|create|delete|list|info> <roll ID> [-options]`\n`dice [\"reason\"] d<die> d[die] [etc...] [-options]`',
        extra: null,
    },
    help: new Discord.MessageEmbed()
    .setTitle("Help -> Dice")
    .setDescription("The center for all things dice-related! Quickly roll a die or dice, or make a new roll to save for later! This command can be really simple, or super complex, so here's a nice, handy guide to using it.")
    .addField("Syntax", "`dice <roll|create|delete|list|info> <roll ID> [-options]`\n`dice [\"reason\"] d<die> d[die] [etc...] [-options]`")
    .addField("Simple Syntax", "By just using `roll d#` you can get a fast and easy roll! Just make sure you start every die with `d`.\n\nThere are some optional things to do for this:\n-You can specify a reason for rolling by placing quotes and some text before the dice\nYou can add some options as well. Use `-option` to do so. Valid options are `-reason <your reason>` or `-against <person>`"),
    async execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}dice ["reason"] <die> [die] [die] [etc...]\``);}
        
        let m = args.join(" ");
        let reason, against;

        if (![-1, 0, 2].includes(msg.split('"').length - 1)) {return message.reply("You need two quotes to specify a reason!");}
        if (args[0].startsWith('"')) { //reason parsing
            m = m.slice(m.search('"') + 1).trim(); //slice up to the quote
            reason = m.split('"')[0].trim(); //split by 2nd quote and grab first half = reason
            m = m.split('"')[1].trim(); //split and grab 2nd half = rest of message
        }
        args = m.split(/\s+/gm); //reform args
        if (!args.length || !args[0].length) {return message.channel.send("Looks like you didn't give me any dice to roll!");} //user didn't supply dice after reason

        let options = new TagFilter([
            new Tag(['f', 'force'], 'force', 'toggle'), //custom dice values
            new Tag(['a', 'against'], 'against', 'append'), //both people roll the same thing
            new Tag(['d', 'die'], 'dice', "listAppend"), //another way to add dice
            new Tag(['r', 'reason'], 'reason', 'append'), //another way to set a reason
            new Tag(['n', 'name', 't', 'title'], 'name', 'append') //name the roll
        ]).test(args.join(" "));

        if (options.reason) {
            reason = options.reason;
            if (reason.length > 250) {return message.channel.send("I asked for a reason why you rolled, not a 20-page essay >:(");}
        } if (options.against) {
            against = options.against;
            if (against.length > 50) {return message.channel.send("Are you rolling against an entire nation or.... I'm not gonna remember that big of a name, lad.");}
            //parse message, channel, and role mentions
            if (against.match(/<@!?\d+>/)) {against = against.split(/\s+/).map(arg => {return arg.match(/<@!?\d+>/) ? message.guild && message.guild.members.cache.has(arg.replace(/[^\d]+/gm, '')) ? message.guild.members.cache.get(arg.replace(/[^\d]+/gm, '')).displayName : arg.replace(/[^\d]+/gm, '') : arg}).join(" ");}
            if (against.match(/<#\d+>/)) {against = against.split(/\s+/).map(arg => {return arg.match(/<#\d+>/) ? message.guild && message.guild.channels.cache.has(arg.replace(/[^\d]+/gm, '')) ? `#${message.guild.channels.cache.get(arg.replace(/[^\d]+/gm, '')).name}` : arg.replace(/[^\d]+/gm, '') : arg}).join(" ");}
            if (against.match(/<@&\d+>/)) {against = against.split(/\s+/).map(arg => {return arg.match(/<@&\d+>/) ? message.guild && message.guild.roles.cache.has(arg.replace(/[^\d]+/gm, '')) ? message.guild.roles.cache.get(arg.replace(/[^\d]+/gm, '')).name : arg.replace(/[^\d]+/gm, '') : arg}).join(" ");}
        }

        let dice = [];
        for (let i = 0; i < args.length; i++) { //main dice loop
            let arg = args[i];
            if (arg.toLowerCase().match(/^d?\d+$/)) {dice.push(arg.toLowerCase().startsWith('d') ? arg.slice(1) : arg);} //test if it's a die, format and push
            else {break;} //stop trying to add dice if one isn't a match because tags have started
        }
        if (options.dice && options.dice.length) {options.dice.forEach(die => {if (die.toLowerCase().match(/^d?\d+$/)) {dice.push(die.toLowerCase().startsWith('d') ? die.slice(1) : die);}});}
        if (!dice.length) {return message.channel.send("Looks like you don't have any dice. Try again?");}
        if (dice.map(die => isNaN(Number(die)) ? 1 : 0).includes(1)) {return message.channel.send("One of your dice doesn't seem to be a die or valid number! Try again?");} //validate all dice
        if (dice.map(die => (options.force || ['4', '6', '8', '10', '12', '20', '100'].includes(die)) ? 0 : 1).includes(1)) {return message.channel.send("One of your dice isn't a valid number. Must be 4, 6, 8, 10, 12, 20, or 100.");}
        dice = dice.map(die => Number(die)); //make all numbers

        let diceEmbed = new Discord.MessageEmbed()
            .setTitle("Dice Roll")
            .setThumbnail((message.guild ? message.member : message.author).displayAvatarURL({dynamic: true}))
            .setDescription(`Rolled by ${message.guild ? message.member.displayName : message.author.username}${options.force ? '\nMay contain custom dice sizes.' : ''}`)
            .setColor("dc134c")
            .setFooter({text: "Valkyrie", iconURL: client.user.displayAvatarURL()})
            .setTimestamp(); //base embed
        if (reason) {diceEmbed.addField("Reason", reason);}
        if (options.name) {diceEmbed.setTitle(options.title); diceEmbed.setAuthor({name: "Named Dice Roll"});}

        const buildRes = (name='') => {
            let total = 0;
            diceEmbed.addField(`${name.length ? `${name} ` : ''}Results`, `${dice
                .map(die => {let res = {res: new mi.Random("int", die).calc_int(), die}; total += res.res; return res;})
                .map((res, ind) => `${ind + 1}. **${res.res}** *[d${res.die}]*`)
                .join("\n")
            }\n**Total: ${total}**`);
        };
        if (!against) {buildRes();}
        else {
            buildRes(client.utils.ps(message.guild ? message.member.displayName : message.author.username));
            buildRes(client.utils.ps(against));
        }

        return message.channel.send({embeds: [diceEmbed]});
    }
};