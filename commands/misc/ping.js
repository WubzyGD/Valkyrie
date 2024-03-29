const Discord = require('discord.js');

module.exports = {
    name: "ping",
    aliases: [],
    meta: {
        category: 'Misc',
        description: "Find out Valkyrie's latency",
        syntax: '`ping`',
        extra: null
    },
    help: "Definitely not much to see here...",
    async execute(message, msg, args, cmd, prefix, mention, client) {
        return message.channel.send({embeds: [new Discord.MessageEmbed()
            .setTitle("Client Latency")
            .setDescription(`Response Latency: \`${new Date().getTime() - message.createdTimestamp}ms\`\nAPI Latency: \`${client.ws.ping}ms\``)
            .setFooter({text: "Valkyrie", iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            .setColor('dc134c')
        ]});
    }
};