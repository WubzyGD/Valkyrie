const Discord = require("discord.js");
const fs = require('fs');

module.exports = {
    name: "clearwarn",
    aliases: ["cw", "clearwarnings", "clearwarning"],
    description: "",
    execute(message, msg, args, cmd, prefix, mention, client) {
        if (!message.guild) {return message.reply("This is a server-only command!");}
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}clearwarn <@user>\``);}
        if (!message.member.permissions.has("ADMINISTRATOR")) {return message.reply("You must be an administrator in your server to do this. In the near future, server owners will be able to add roles that can warn users, though!");}
        if (!mention) {if (args.length < 1) {return message.reply("You must mention a user to clear the warnings of.");}
        if (message.guild.members.cache.has(args[0].trim())) {mention = client.users.cache.get(args[0].trim());}}
        else {return message.reply("You must mention a user to clear the warnings of.");}
        if (!fs.existsSync(`./data/mod/${message.guild.id}.json`)) {return message.reply("Nobody in your server has ever been warned! There's actually no moderation settings available for your server at all.");}
        var guildW = JSON.parse(fs.readFileSync(`./data/mod/${message.guild.id}.json`));
        if (!Object.keys(guildW.warnings).length) {return message.reply("Nobody in your server has ever been warned! Consider yourself lucky :D");}

        let warnings = guildW.warnings;
        if (!warnings[mention.id]) {return message.reply("That user has never been warned in your server.");}
        let cwc = 0;
        for (warning of warnings[mention.id]) {
            if (guildW.cases[warning.case].status !== "Cleared") {
                guildW.cases[warning.case].status = "Cleared";
                guildW.cases[warning.case].history.push(`${new Date().toISOString()} - ${message.author.username} - Cleared the warning.`);
                if (!guildW.cases[warning.case].moderators.includes(message.author.id)) {guildW.cases[warning.case].moderators.push(message.author.id)}
            } else {cwc++;}
        }
        if (cwc === warnings[mention.id].length) {return message.reply("That user has no uncleared warnings.");}

        fs.writeFileSync(`./data/mod/${message.guild.id}.json`, JSON.stringify(guildW), 'utf8');
        return message.reply(`Cleared ${warnings[mention.id].length} warnings from <@${mention.id}>.`);
    }
};