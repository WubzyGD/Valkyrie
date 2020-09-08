const Discord = require("discord.js");
const fs = require('fs');

module.exports = {
    name: "warn",
    aliases: ["w"],
    description: "",
    execute(message, msg, args, cmd, prefix, mention, client) {
        if (!message.guild) {return message.reply("This is a server-only command!");}
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}warn <@user> <reason>\` or use \`warn <list|clear> @user\``);}
        if (args[0] === "list" || args[0] === "view" || args[0] === "v" || args[0] === "l") {
            if (args.length < 2) {return message.reply("You must mention a user to check the warnings of.");}
            if (message.guild.members.cache.has(args[1].trim())) {mention = client.users.cache.get(args[1].trim());}
            else {return message.reply("You must mention a user to check the warnings of.");}
            if (!fs.existsSync(`./data/mod/${message.guild.id}.json`)) {return message.reply("Nobody in your server has ever been warned! There's actually no moderation settings available for your server at all.");}
            var guildW = JSON.parse(fs.readFileSync(`./data/mod/${message.guild.id}.json`));
            if (!Object.keys(guildW.warnings).length) {return message.reply("Nobody in your server has ever been warned! Consider yourself lucky :D");}

            let warnings = guildW.warnings;
            if (!warnings[mention.id]) {return message.reply("That user has never been warned in your server.");}
            let ws = '';
            let cwc = 0;
            for (warning of warnings[mention.id]) {if (guildW.cases[warning.case].status !== "Cleared") {ws += `\`Case #${warning.case}\` - Issued by <@${warning.moderator}>\n${warning.warning}\n\n`;} else {cwc++;}}
            if (cwc > 0) {ws += '\n\n*Plus ' + cwc + ' other warnings that have been cleared.*';}
            if (cwc === warnings[mention.id].length) {return message.reply("That user has no uncleared warnings.");}
            return message.reply(new Discord.MessageEmbed()
            .setTitle("User Warnings")
            .setThumbnail(mention.avatarURL({size: 1024}))
            .setDescription(`For ${message.guild.members.cache.get(mention.id).displayName}`)
            .addField("Warnings", ws)
            .setColor("DC134C")
            .setFooter("Valkyrie", client.user.avatarURL())
            .setTimestamp());
        } else if (args[0] === "clear" || args[0] === "c") {
            if (!message.member.permissions.has("ADMINISTRATOR")) {return message.reply("You must be an administrator in your server to do this. In the near future, server owners will be able to add roles that can warn users, though!");}
            if (args.length < 2) {return message.reply("You must mention a user to clear the warnings of.");}
            if (message.guild.members.cache.has(args[1].trim())) {mention = client.users.cache.get(args[1].trim());}
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
        } else {
            if (!message.member.permissions.has("ADMINISTRATOR")) {return message.reply("You must be an administrator in your server to do this. In the near future, server owners will be able to add roles that can warn users, though!");}
            if (args.length < 1) {return message.reply("You must mention a user to warn.");}
            if (message.guild.members.cache.has(args[0].trim())) {mention = client.users.cache.get(args[0].trim());}
            else {return message.reply("You must mention a user to warn.");}
            args.shift();
            if (!args.length) {return message.reply("You must specify what you'd like to warn the user with!");}
            if (!fs.existsSync(`./data/mod/${message.guild.id}.json`)) {
                var tg = {
                    config: {
                        logch: null, 
                        maxWarnings: 0, 
                        onMaxWarn: "kick", 
                        muteOnWarn: false
                    },
                    cases: {},
                    nextCaseNo: 1,
                    warnings: {},
                    automod: null
                }
            } else {var tg = JSON.parse(fs.readFileSync(`./data/mod/${message.guild.id}.json`));}

            if (!Object.keys(tg.warnings).includes(mention.id)) {tg.warnings[mention.id] = [];}
            tg.warnings[mention.id].push({
                warning: args.join(" ").trim(),
                moderator: message.author.id,
                case: tg.nextCaseNo
            });

            tg.cases[tg.nextCaseNo] = {
                members: [mention.id],
                punishment: "Warned",
                reason: args.join(" ").trim(),
                status: "Closed",
                moderators: [message.author.id],
                notes: [],
                history: [],
                issued: new Date().toUTCString()
            };
            tg.cases[tg.nextCaseNo].history.push(`${new Date().toISOString()} - ${message.author.username} - Created case`);
            tg.cases[tg.nextCaseNo].history.push(`${new Date().toISOString()} - ${message.author.username} - Warned ${mention.username}`);
            mention.send(`You have been warned in ${message.guild.name} for \`${args.join(" ").trim()}\``);
            message.reply(`Member has been warned! - \`Case #${tg.nextCaseNo} - ${args.join(" ").trim()}\``);
            tg.nextCaseNo += 1;
            return fs.writeFileSync(`./data/mod/${message.guild.id}.json`, JSON.stringify(tg), 'utf8');
        }
    }
};