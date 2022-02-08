const Discord = require('discord.js');

module.exports = {
    name: "pain",
    help: new Discord.MessageEmbed()
        .setTitle("Help -> ")
        .setDescription("")
        .addField("Syntax", "``"),
    async condition (message, msg, args, cmd, prefix, mention, client) {return ["497598953206841375", "408025692228550676", "417877804672352256", "468903364533420074", "335792072638595083", "378014504211972106", "386604180963459102", "330547934951112705", "599873116914581504", "378773868896059394", "276576032964739082"].includes(message.author.id)},
    async execute(message, msg, args, cmd, prefix, mention, client) {
        if (msg.includes("dice said so")) {
            return message.channel.send("And the dice are never wrong.");
        }

        if (msg.startsWith("whats up valk") || msg.startsWith("what's up valk") || msg.startsWith("what’s up valk")) {
            return message.channel.send("Not too much. But quit asking how I'm doing, ask it to the goblin behind you. Party member down...");
        }
        if ((msg.startsWith("i am ") || msg.startsWith("im ") || msg.startsWith("i'm ") || msg.startsWith("i’m ")) && message.content.length <= 30) {
            if (msg.slice((message.content.search("m ") + 2)).trim() === "valk" || msg.slice((message.content.search("m ") + 2)).trim() === "valkyrie") {return message.channel.send("No, I'm Valkyrie, you silly goose!");}
            return message.channel.send(`Hi **${message.content.slice((message.content.search("m ") + 2))}**, I'm Mom!`);
        }
        function inc(i) {return msg.includes(i);}
        function incw() {return (inc('want to') || inc('going to') || inc('gonna') || inc('wanna'));}
        if (
            ((inc('want') && inc('to fuck valk'))
            || (incw() && (
                inc('fuck valk')
                || inc('have sex with valk')
                || inc('69 valk')
            ))
            || (
                (inc('dom ')
                    || inc('dominate')
                    || inc('dominatrix')
                    || inc('bite my penis')
                    || inc('pinch')
                    || inc('tickle')
                    || inc('bite')
                    || inc('pee on')
                    || inc('fuck my')
                    || inc('fuck me')
                    || inc('69')
                    || inc('choke')
                    || inc('choked')
                    || inc('use')
                    || inc('used')
                    || inc('make love')
                    || inc('enslave')
                ) && (
                    inc('me valk')
                    || inc('by valk')
                    || inc('valk')
                ))
            || (inc('mommy valk'))
            || (
                (inc('pinch') || inc('tickle') || inc('bite'))
                && (inc('my') || inc('valk'))
                && (inc('nipples'))
            )
            || (
                inc('valk')
                && (inc('makes me') || inc('gets me'))
                && (inc('wet') || inc('horny') || inc('moist') || inc('hard') || inc('erect') || inc('stiff') || inc('solid'))
            )
            || (inc('fuck me valk') || inc('fuck me now valk') || inc('fuck me please valk') || inc('fuck me already valk'))) && (!inc('urinal'))
        ) {
            let bot = await require('../models/bot').findOne({finder: 'lel'});
            if (!bot.simp) {bot.simp = 0; bot.markModified('simp');}
            bot.simp++;
            bot.save();
            const fr = [
                "You're such a horny child. Make that {a} coins in the horny jar.", "Bonk! Horny! And thus the bonk meter increases to {a}...",
                "Do you ever stop? Like at all? {a} times you people have said some weird horny shit.", "Y'all are just plain weird.",
                "Okay you horny fuck! Make that {a} times I've had to tell you to shut your filthy trap.",
                "Just... why? Why must you be this way?", "Horny rat shit counter: #{a}",
                "Ew, disgusting horny animal alert! Add that to the pile of {a} horny animal alerts I've already had to set off."
            ];
            return message.channel.send(fr[Math.floor(Math.random() * fr.length)].replace('{a}', `${bot.simp}`));
        }
        if (
            (
                (inc('use valk') && inc('urinal'))
                || ((inc('use me') || inc('make me')) && inc('urinal') && inc('valk'))
            )
        ) {return message.channel.send("...k then... *I'm gonna step away now.*");}
        if (incw() && inc('marry valk')) {return message.channel.send("I am a dragon, and I actually have a soulmate! But that's really sweet of you to think of me that way ^^");}
        if (inc('i love valk') || inc('love you valk')) {return message.channel.send("Thanks for that! ~~Though I hope you just mean platonically~~");}
    }
};