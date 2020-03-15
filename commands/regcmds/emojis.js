const Discord = require("discord.js");

module.exports = {
    name: "emoji",
    description: "",
    async execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}emoji <reactLast|send> <emoteId>`);};
        var toDo = args[0].toLowerCase();
        var emoji = args[1];
        if (!emoji) {return message.reply("You must provide an emoji id.");};
        try {
            if (toDo == "reactlast") {
                var lastm = await message.channel.fetchMessages({limit: 1});
                await lastm.react(emoji);
            } else if (toDo == "send") {
                message.channel.send(client.emojis.get(emoji).name);
            } /*else if (toDo == "addtoserver") {
                if (!message.member.hasPermission("MANAGE_EMOJIS")) {return message.reply("You don't have the rigt permissions for that.");};
                message.member.guild.createEmoji
            } else if (toDo == "removefromserver") {

            }*/ else {
                return message.reply("That wasn't a valid option.");
            };
        } catch (e) {return message.reply("Something went wrong. You probably didn't provide a valid emote id.");};
    }
};