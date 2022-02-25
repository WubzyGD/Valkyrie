const Discord = require('discord.js');
const cp = require('child_process');

module.exports = {
    name: "restart",
    aliases: ['res'],
    meta: {
        category: 'Developer',
        description: "Fully restart Valkyrie",
        syntax: '`restart`',
        extra: null
    },
    help: "Fully restarts the bot. Developer-only.",
    async execute(message, msg, args, cmd, prefix, mention, client) {
        if (!client.developers.includes(message.author.id)) {return message.channel.send("You must be a developer in order to do that!");}
        try {return cp.exec("pm2 restart valk", function(error, stdout, stderr) {
                if (error) {
                    return message.channel.send({embeds: [new Discord.MessageEmbed()
                        .setTitle("Error")
                        .setDescription(`\`\`\`${error}\`\`\``)
                        .setColor("ff446a")
                        .setFooter({text: "Valkyrie", iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()]}
                    );
                }
            });
        } catch {return message.channel.send("There was an error in trying to do that!");}
    }
};