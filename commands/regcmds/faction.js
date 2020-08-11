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
                ls += `#${i + 1}: **${faction.name}** - **${faction.members.length}** Members\n\n`;
            };
            var rs = ``;
            factions.sort(function (a, b) {return b.score.total - a.score.total;});
            for (let i = 0; i < factions.length; i++) {
                let faction = factions[i];
                rs += `#${i + 1}: **${faction.name}** - **${faction.score.total}** Score\n\n`;
            };
            return message.channel.send(new Discord.MessageEmbed()
            .setTitle("Factions Leaderboard").setDescription("Stats are accurate of up to 45 seconds ago.")
            .addField("Member Count Leaderboard", ls)
            .addField("Score Leaderboard", rs)
            .setColor("DC134C").setFooter("Valkyrie", client.user.avatarURL()).setTimestamp());
        } else if (args[0] == "stats") {
            if (!fs.existsSync(`./data/factions/${args[1]}.json`)) {return message.reply("Please specify the faction name!");};
            var faction = JSON.parse(fs.readFileSync(`./data/factions/${args[1]}.json`));
            if (Object.keys(faction.score.members).includes(message.author.id)) {var uscore = `You've contributed ${faction.score.members[message.author.id]} Score to this faction!`;}
            else {var uscore = "You haven't contributed any Score to this Faction.";};
            return message.channel.send(new Discord.MessageEmbed()
            .setTitle("Faction Stats").setDescription(`For ${faction.name}`)
            .addField("Members", faction.members.length, true)
            .addField("Score", faction.score.total, true)
            .addField("Your Score", uscore)
            .setColor("DC134C")
            .setFooter("Valkyrie", client.user.avatarURL())
            .setTimestamp());
        };
    }
};