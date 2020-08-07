const Discord = require("discord.js");

module.exports = {
    name: "session",
    description: "",
    async execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}session <query|checkin|start|quick> [options]\``);};
        if (args[0] == "quick") {
            try {
                var m1 = await message.channel.send("What is the session for? Say something small, like \"Tonight's Roleplay\" or \"This week's DnD session\".");
                var name = await message.channel.awaitMessages(filter, {max: 1, time: 60000});
                name = name.first().content;
                var m2 = await message.channel.send("Describe what you want the session to accomplish or what you think will happen in the session, or some requirements etc. etc.");
                var desc = await message.channel.awaitMessages(filter, {max: 1, time: 180000});
                desc = desc.first().content;
                var m3 = await message.channel.send("When do you want the session to start?");
                var when = await message.channel.awaitMessages(filter, {max: 1, time: 60000});
            } catch {return message.reply("Seems like you took too long!");};
        }
    }
};