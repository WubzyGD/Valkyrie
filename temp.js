const Discord = require("discord.js");

module.exports = {
    name: "",
    aliases: [],
    description: "",
    execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}\``);};
    }
};