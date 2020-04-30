const Discord = require("discord.js");

module.exports = {
    name: "party",
    description: "",
    execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}party <create|edit|delete|view|join|leave|mod>\``);};

    }
};