const Discord = require("discord.js");
const fs = require('fs');

module.exports = {
    name: "warn",
    aliases: ["w"],
    description: "",
    execute(message, msg, args, cmd, prefix, mention, client) {
        if (!message.guild) {return message.reply("This is a server-only command!");}
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}warn <@user> <reason>\` or use \`warn list @user\``);};
        if (args[0] == "list") {
            if (args.length < 2 || !mention) {return message.reply("You must mention a user to check the warnings of.");}
            if (!fs.existsSync(`./data/mod/${message.guild.id}.json`)) {return message.reply("Nobody in your server has ever been warned! There's actually no moderation settings available for your server at all.");}
            var guildW = JSON.parse(fs.readFileSync(`./data/mod/${message.guild.id}.json`));
            if (!Object.keys(guildW.warnings).length) {return message.reply("Nobody in your server has ever been warned! Consider yourself lucky :D");}

            let warnings = guildW.warnings;
            if (!guildW.warnings[mention.id]) {return message.reply("That user has never been warned in your server.");}
            let ws = '';
            for (warning of warnings) {ws += `\`Case #${warning.case}\` - Issued by <@${warning.moderator}>\n${warning}\n\n`;}
            return message.reply(new Discord.MessageEmbed()
            .setTitle("User Warnings")
            .setThumbnail(mention.avatarURL({size: 1024}))
            .setDescription(`For ${message.guild.members.cache.get(mention.id).displayName}`)
            .addField("Warnings", ws)
            .setColor("DC134C")
            .setFooter("Valkyrie", client.user.avatarURL())
            .setTimestamp());
        } else {
            if (!message.member.permissions.has("ADMINISTRATOR")) {return message.reply("You must be an administrator in your server to do this. In the near future, server owners will be able to add roles that can warn users, though!");}
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
                issued: new Date().toUTCString()
            };
            
            message.reply(`Member has been warned! - \`Case #${tg.nextCaseNo} - ${args.join(" ").trim()}\``);
            tg.nextCaseNo += 1;
            return fs.writeFileSync(`./data/mod/${message.guild.id}.json`, JSON.stringify(tg), 'utf8');
        }
    }
};