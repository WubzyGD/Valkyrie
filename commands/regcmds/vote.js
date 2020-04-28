const Discord = require("discord.js");

module.exports = {
    name: "vote",
    description: "",
    execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(new Discord.RichEmbed().setTitle("Vote for me!").setDescription("You can vote for me on Glenn Bot List [right here](https://glennbotlist.xyz/bot/619305062900039726/vote)! In the future, this will give you a giant amount of XP and possibly exclusive commands.").setColor("DC134C"));};
    }
};