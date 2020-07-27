const Discord = require("discord.js");

module.exports = {
    name: "ping",
    description: "",
    execute(message, msg, args, cmd, prefix, mention, client) {
        return message.channel.send(new Discord.MessageEmbed()
        .setTitle("Pong!")
        .setDescription("Here you go, nerd ;)")
        .addField("Bot Ping", `${Date.now() - message.createdTimestamp}ms`, true)
        .addField("API Ping", `${client.ws.ping}ms`, true))
        .setColor("DC134C")
        .setFooter("Valkyrie", client.user.avatarURL()
        .setTimestamp())
    }
};