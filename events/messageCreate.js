const Discord = require('discord.js');
const chalk = require('chalk');

const wait = require('../util/wait');

const UserData = require('../models/user');
const AR = require('../models/ar');
const RP = require('../models/rpch');

const channelTypes = ["GUILD_MESSAGE", "DM", "GUILD_NEWS_THREAD", "GUILD_PRIVATE_THREAD", "GUILD_PUBLIC_THREAD", "GUILD_NEWS", "GROUP_DM", "GUILD_STORE", "GUILD_TEXT"];

module.exports = async (client, message) => {
    if (!client.misc.fullyReady) {return;}

    if (message.partial) {await message.fetch();}
    if (message.channel.partial) {await message.channel.fetch();}

    if (!message.author || message.author.bot) {return undefined;}

	if (!channelTypes.includes(message.channel.type)) {return undefined;}

    if (message.guild && !message.member.permissions.has("SEND_MESSAGES")) {return undefined;}
	
    let defaultPrefix = client.misc.config.dev ? 'v..' : 'v.';
    let prefix = message.guild ? client.guildconfig.prefixes.has(message.guild.id) ? client.guildconfig.prefixes.get(message.guild.id) !== null ? client.guildconfig.prefixes.get(message.guild.id) : defaultPrefix : defaultPrefix : defaultPrefix;

	let msg = message.content.toLowerCase().replace('\u200E', '');
	let mention = message.mentions.users.first();
    let args = msg.startsWith(prefix)
        ? message.content.slice(prefix.length).trim().replace('\u200E', '').split(/\s+/g)
        : msg.startsWith('<@!')
            ? message.content.slice(4 + client.user.id.length).trim().replace('\u200E', '').split(/\s+/g)
            : message.content.slice(3 + client.user.id.length).trim().replace('\u200E', '').split(/\s+/g);
	let cmd = args.shift().toLowerCase().trim();

    if (message.content.includes("@everyone")) {return;}

	if ([`<@${client.user.id}>`, `<@!${client.user.id}>`].includes(msg)) {
	    return message.channel.send({embeds: [new Discord.MessageEmbed()
        .setTitle(["Yep, that's me!", "^^ Hiya!", "Oh, hi there!", "Sure, what's up?", "How can I help!", "Valkyrie is busy, but I can take a message for you!", "Teehee that's me!", "You were looking for Valkyrie, right?", "Sure! What's up?", "Pong!"][Math.floor(Math.random() * 10)])
        .setDescription(`My prefix here is \`${prefix}\`. Use \`${prefix}help\` to see what commands you can use.`)
        .setColor('dc134c')]}).catch(() => {});
    }

    if (message.guild && client.misc.cache.rp.has(message.guild.id) && client.misc.cache.rp.get(message.guild.id).includes(message.channel.id)) {
        if (msg.match(/^\w+:/m)) {    
            const rp = await RP.findOne({uid: message.author.id});
            if (rp && rp.chars[msg.split(':')[0]]) {
                const webhooks = await message.channel.fetchWebhooks();
                const webhook = await webhooks.find(wh => wh.token);
                if (webhook) {
                    const char = rp.chars[msg.split(':')[0]];
                    webhook.send({content: message.content.slice(char.prefix.length + 1), avatarURL: char.image, username: char.name}).catch(() => {});
                    message.delete().catch(() => {});
                }
            }
        }
    }

	if (mention && message.guild) {require('../util/mention')(message, msg, args, cmd, prefix, mention, client);}
    UserData.findOne({uid: message.author.id}).then(async (tu) => {
	if (tu && tu.statusmsg.length && tu.statusclearmode === 'auto') {
        tu.statusmsg = '';
        tu.statustype = '';
        tu.save();
        require('../util/siftstatuses')(client, message.author.id, true);
        message.reply('Hey there! You asked me to clear your status when you send a message next, so I went ahead and did that for you.').then(m => {setTimeout(() => {m.delete().catch(() => {});}, 5000);}).catch(() => {});
	}});

	if (message.guild && client.misc.cache.ar.has(message.guild.id) && client.misc.cache.ar.get(message.guild.id).includes(msg.trim()) && !(client.misc.cache.arIgnore.has(message.guild.id) && client.misc.cache.arIgnore.get(message.guild.id).includes(message.channel.id))) {
	    AR.findOne({gid: message.guild.id}).then(ar => {
	        if (ar && ar.triggers.length && ar.triggers.includes(msg.trim())) {return message.channel.send(ar.ars[ar.triggers.indexOf(msg.trim())]).catch(() => {});}
	    });
	}

    try {
        if (msg.startsWith(prefix) || msg.startsWith(`<@${client.user.id}>`) || msg.startsWith(`<@!${client.user.id}>`)) {
            let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

            if (command && command.name !== "blacklist") {
                if (message.guild && client.misc.cache.bl.guild.includes(message.guild.id)) {return message.channel.send("Your server has been blacklisted from using my commands! Shame, tsk tsk").catch(() => {});}
                if (client.misc.cache.bl.user.includes(message.author.id)) {return message.channel.send("You've been blacklisted from using my commands! Now what'd ya do to deserve that??").catch(() => {});}
            }

            if (!command) {let trigger; for (trigger of client.responses.triggers) {if (await trigger[1](message, msg, args, cmd, prefix, mention, client)) {await client.responses.commands.get(trigger[0]).execute(message, msg, args, cmd, prefix, mention, client); break;}} return;}
            if (message.guild && !message.channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) {return message.author.send(`You tried to run the \`${command.name}\` command, but I don't seem to be able to send messages in <#${message.channel.id}>, so I can't do that!`).catch(() => {});};
            await message.channel.sendTyping().catch(() => {});
            if (!require('../util/cooldownhandler')(client, message, command)) {return;}
            if (command.meta && command.meta.guildOnly && !message.guild) {return message.channel.send("You must be in a server to use this command!").catch(() => {});}
            require('../util/oncommand')(message, msg, args, cmd, prefix, mention, client);
            return command.execute(message, msg, args, cmd, prefix, mention, client);
        }
        let trigger; for (trigger of client.responses.triggers) {if (await trigger[1](message, msg, args, cmd, prefix, mention, client)) {await client.responses.commands.get(trigger[0]).execute(message, msg, args, cmd, prefix, mention, client); break;}}
    } catch (e) {
        let date = new Date(); date = date.toString().slice(date.toString().search(":") - 2, date.toString().search(":") + 6);
        console.error(`\n${chalk.red('[ERROR]')} >> ${chalk.yellow(`At [${date}] | In ${message.guild ? message.guild.name : `a DM with ${message.author.username}`}\n`)}`, e);
    }
};