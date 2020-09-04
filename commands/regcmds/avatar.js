const Discord = require("discord.js");

module.exports = {
    name: "avatar",
    aliases: ["a", "av", "pfp"],
    description: "",
    execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {
            var authorAvatar = new Discord.MessageEmbed()
            .setTitle(`Avatar for ${message.member.displayName}`)
            .setImage(message.author.avatarURL({size: 2048, dynamic: true}));
            return message.channel.send(authorAvatar);
        } else {
            if (!mention) {
                return(message.channel.send("You have to mention someone, just to avoid duplicate username confusion :)"));
            };
            var mentionAvatar = new Discord.MessageEmbed()
            .setTitle(`Avatar for ${message.member.guild.members.cache.get(mention.id).displayName}`)
            .setImage(mention.avatarURL({size: 2048, dynamic: true}));
            return message.channel.send(mentionAvatar);
        };
    }
};