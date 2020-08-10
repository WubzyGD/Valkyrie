const Discord = require("discord.js");
const fs = require('fs');


module.exports = {
    name: "faction",
    description: "",
    execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}faction <stats|leaderboard>\``);};
        if (args[0] == "leaderboard") {
            var factions = [];
            for (let file of fs.readdirSync('./data/factions')) {factions.push(JSON.parse(fs.readFileSync(`./data/factions/${file}`)));};
            factions.sort(function (a, b) {return b.members.length - a.members.length;});
            var ls = '';
            for (let i = 0; i < factions.length; i++) {
                let faction = factions[i];
                ls += `#${i + 1}: **${faction.name}** - **${faction.members.length}** Members\n\n`
            };
            return message.channel.send(new Discord.MessageEmbed()
            .setTitle("Factions Leaderboard").setDescription("Sorted by member count")
            .addField("Leaderboard", ls)
            .setColor("DC134C").setFooter("Valkyrie", client.user.avatarURL()).setTimestamp());
        };
    }
};