const Discord = require("discord.js");

module.exports = {
    name: "kick",
    description: "",
    execute(message, msg, args, cmd, adminPrefix, mention, client) {
        if (!message.member.hasPermission("KICK_MEMBERS")) {return message.channel.send("You must have the permissions to kick members.");};
        if (!args.length) {return(message.channel.send(`Syntax: \`${adminPrefix}kick <@member>\`.`))};
        if (!mention) {return(message.channel.send("You must mention someone!"))};
        if (msg.length - (adminPrefix.length + cmd.length + mention + 2) < 1) {
            var reason = "Reason not specified.";
        }
        mention.kick
    }
};