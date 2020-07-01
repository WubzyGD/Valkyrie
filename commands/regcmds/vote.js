const Discord = require("discord.js");

const gbl = require("gblapi.js");
const GBLValk = new gbl("619305062900039726", 'XA-46200ce4794741d3bf7216dcb3f725b1', false);

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
        if (!args.length) {return message.channel.send(new Discord.MessageEmbed().setTitle("Vote for me!").setDescription("You can vote for me on Glenn Bot List [right here](https://glennbotlist.xyz/bot/619305062900039726/vote)! In the future, this will give you a giant amount of XP and possibly exclusive commands.").setColor("DC134C"));};
        var e = process.argv.includes('--force') || process.argv.includes('-f');
        sequelize.sync({force: e}).then(async () => {}).catch(console.error);
        if (args[0] == "server") {
            var votedString = "";
            var botStats = await GBLValk.getBot();
            for (member of message.member.guild.members.cache.first(message.member.guild.members.cache.size)) {
                var hasVoted = await GBLValk.hasVoted(member.id);
                if (hasVoted) {
                    if (client.users.cache.get(member.id).username == member.displayName) {votedString += `<@${member.id}>, `;} else {votedString += `<@!${member.id}>, `;};
                };
            };
            votedString += "\nYou can vote for me on Glenn Bot List [right here](https://glennbotlist.xyz/bot/619305062900039726/vote)!";
            return message.channel.send(new Discord.MessageEmbed()
            .setAuthor("Server Vote Pulse", message.member.guild.iconURL())
            .setDescription(votedString)
            .setColor("DC134C")
            .setFooter("Valkyrie")
            .setTimestamp());
        } else if (args[0] == "has") {
            var votedString = "";
            if (mention) {var voted = await GBLValk.hasVoted(mention.id);} else {var voted = await GBLValk.hasVoted(message.member.id);};
            if (voted) {if (mention) {votedString = "They have voted! Thank you!"} else {votedString = "You have voted! Thank you very much!";};} else {if (mention) {var votedString = "It doesn't look like that person has voted. Vote for me on Glenn Bot List [right here](https://glennbotlist.xyz/bot/619305062900039726/vote)!"} else {votedString = "It doesn't look like you've voted. You can vote for me on Glenn Bot List [right here](https://glennbotlist.xyz/bot/619305062900039726/vote)!";};};
            return message.channel.send(new Discord.MessageEmbed()
            .setAuthor("Vote Check", message.member.guild.iconURL())
            .setDescription(votedString)
            .setColor("DC134C")
            .setFooter("Valkyrie")
            .setTimestamp());
        } else if (args[0] == "monthly") {
            var botStats = await GBLValk.getBot();
            return message.reply(`${botStats.monthly_upvotes} monthly votes.`);
        } else if (args[0] == "total") {
            var botStats = await GBLValk.getBot();
            return message.reply(`${botStats.total_upvotes} total votes.`);
        } else {return message.reply("Yeah chief that wasn't a good arg. Try `server`, `has`, `monthly`, `total`.");};
    }
};