const Discord = require("discord.js");

module.exports = {
    name: "rules",
    aliases: ["rule"],
    description: "",
    execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}rules <view|add|edit|delete|list|cite|config>\``);};
        if (args[0] == "view") {

        } else if (args[0] == "add") {
            if (!message.member.permissions.has("ADMINISTRATOR")) {return message.reply("You must be an administrator to do that! Try suggesting a rule addition to an admin!");} JSON.stringify
        } else if (args[0] == "edit") {} else if (args[0] == "delete") {} else if (args[0] == "list") {} else if (args[0] == "config") {} else if (args[0] == "config") {} else {return message.reply("That's not a valid option! Use \`<view|add|edit|delete|list|cite|config>\`");}
    }
};