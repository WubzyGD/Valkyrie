const Discord = require('discord.js');

module.exports = {
    name: "supportserver",
    aliases: ['helpserver', 'support'],
    meta: {
        category: 'Misc',
        description: "Get an invite to Valkyrie's support server!",
        syntax: '`supportserver`',
        extra: null
    },
    help: "Get an invite to Valkyrie's support server!",
    async execute(message, msg, args, cmd, prefix, mention, client) {
        return message.channel.send({embeds: [new Discord.MessageEmbed()
            .setTitle("Sure thing!")
            .setThumbnail(client.user.displayAvatarURL({size: 2048}))
            .setDescription("Join the server with [this link](https://discord.gg/T2JZtuf)!\n\n`->` Here you can talk to the devs, suggest features, hang out with the community, get update alerts, report bugs/issues and get help, or just stop and say hi!")
            .setColor("dc134c")
            .setFooter({text: "Valkyrie"})
            .setTimestamp()
        ]});
    }
};