const Discord = require("discord.js");

const gbl = require("gblapi.js");
const GBLValk = new gbl(client.user.id, 'XA-ecf51d0686fd4f6f8232f16f835367a8', false);

const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const userGameData = sequelize.import("../../models/usergamedata");

module.exports = {
    name: "vote",
    description: "",
    async execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(new Discord.RichEmbed().setTitle("Vote for me!").setDescription("You can vote for me on Glenn Bot List [right here](https://glennbotlist.xyz/bot/619305062900039726/vote)! In the future, this will give you a giant amount of XP and possibly exclusive commands.").setColor("DC134C"));};
        var e = process.argv.includes('--force') || process.argv.includes('-f');
        sequelize.sync({force: e}).then(async () => {}).catch(console.error);
        if (args[0] == "server") {
            var votedString = "";
            var botStats = await GBLValk.getBot();
            for (vote of botStats.votes) {
                if (message.member.guild.members.has(vote.id)) {
                    var member = message.member.guild.members.get(vote.id);    
                    var voted = await GBLValk.hasVoted(member.id);
                    if (voted) {
                        if (client.users.get(member.id).username == member.displayName) {votedString += `<@${member.id}>, `;} else {votedString += `<@!${member.id}>, `;};
                    };
                };
            };
            votedString += "\nYou can vote for me on Glenn Bot List [right here](https://glennbotlist.xyz/bot/619305062900039726/vote)!";
            return message.channel.send(new Discord.RichEmbed()
            .setAuthor("Server Vote Pulse", message.member.guild.iconURL)
            .setDescription(votedString)
            .setColor("DC134C")
            .setFooter("Valkyrie")
            .setTimestamp());
        } else if (args[0] == "has") {
            var votedString = "";
            var voted = await GBLValk.hasVoted(member.id);
            if (voted) {votedString = "You have voted! Thank you very much!";} else {votedString = "It doesn't look like you've voted. You can vote for me on Glenn Bot List [right here](https://glennbotlist.xyz/bot/619305062900039726/vote)!"}
            return message.channel.send(new Discord.RichEmbed()
            .setAuthor("Vote Check", message.member.guild.iconURL)
            .setDescription(votedString)
            .setColor("DC134C")
            .setFooter("Valkyrie")
            .setTimestamp());
        } else if (args[0] == "monthly") {
            var botStats = await GBLValk.getBot();
            return message.reply(`${botStats.monthly_votes} monthly votes.`);
        } else if (args[0] == "total") {
            var botStats = await GBLValk.getBot();
            return message.reply(`${botStats.all_time_votes} total votes.`);
        } else {return message.reply("Yeah chief that wasn't a good arg. Try `server`, `has`, `monthly`, `total`.");};
    }
};