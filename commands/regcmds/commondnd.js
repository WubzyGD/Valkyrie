const Discord = require("discord.js");

module.exports = {
    name: "commondnd",
    aliases: ["cmdnd", "cdnd"],
    description: "",
    execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}commondnd <styleguide|metawarn|>\``);};
    }
};