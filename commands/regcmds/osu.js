const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "osu",
    description: "",
    async execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}osu <stats>\``);};
        if (args[0] == "stats") {
            await fetch("")
        };
    }
};