const Discord = require("discord.js");

const gbl = require("gblapi.js");
const GBLValk = new gbl("619305062900039726", 'XA-46200ce4794741d3bf7216dcb3f725b1', false);

const dbl = require("dblapi.js");
const DBLValk = new dbl("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTMwNTA2MjkwMDAzOTcyNiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTk5MzU0OTE0fQ.R339bPSx99_0HdK_96zbZnvO2oGlKdkuZQSgitFqEpM");

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
    aliases: ["votes", "vo"],
    description: "",
    async execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(new Discord.MessageEmbed().setTitle("Vote for me!").setDescription("You can vote for me on Glenn Bot List [right here](https://glennbotlist.xyz/bot/619305062900039726/vote)! This will give you a giant amount of XP (1,500) and in the future, possibly exclusive commands.").setColor("DC134C"));};
        var e = process.argv.includes('--force') || process.argv.includes('-f');
        sequelize.sync({force: e}).then(async () => {}).catch(console.error);
        if (args[0] == "server") {
            var votedString = "";
            var botStats = await GBLValk.getBot();
            message.member.guild.members.cache.forEach(async member => {
                var hasVoted = await GBLValk.hasVoted(member.id);
                if (hasVoted) {
                    if (client.users.cache.get(member.id).username == member.displayName) {votedString += `<@${member.id}>, `;} else {votedString += `<@!${member.id}>, `;};
                };
            });
            votedString += "\nYou can vote for me on Glenn Bot List [right here](https://glennbotlist.xyz/bot/619305062900039726/vote)!";
            return message.channel.send(new Discord.MessageEmbed()
            .setAuthor("Server Vote Pulse", message.member.guild.iconURL())
            .setDescription(votedString)
            .setColor("DC134C")
            .setFooter("Valkyrie")
            .setTimestamp());
        } else if (args[0] === "has") {
            var votedString = "Glenn Bot List: ";
            if (mention) {var voted = await GBLValk.hasVoted(mention.id); var voted2 = await DBLValk.hasVoted(mention.id);} else {var voted = await GBLValk.hasVoted(message.member.id); var voted2 = await DBLValk.hasVoted(message.member.id);}
            if (voted) {if (mention) {votedString += "They have voted! Thank you!"} else {votedString += "You have voted! Thank you very much!";};} else {if (mention) {votedString += "It doesn't look like that person has voted. Vote for me on Glenn Bot List [right here](https://glennbotlist.xyz/bot/619305062900039726/vote)!"} else {votedString += "It doesn't look like you've voted. You can vote for me on Glenn Bot List [right here](https://glennbotlist.xyz/bot/619305062900039726/vote)!";};};
            if (voted2) {if (mention) {votedString += "\n\nTop.gg: They have voted! Thank you!"} else {votedString += "\n\nTop.gg: You have voted! Thank you very much!"}} else {if (mention) {votedString += "\n\nTop.gg: It doesn't look like that person has voted. Vote for me on Top.gg [right here](https://top.gg/bot/619305062900039726/vote)!"} else {votedString += "\n\nTop.gg: It doesn't look like you've voted. You can vote for me on Top.gg [right here](https://top.gg/bot/619305062900039726/vote)!"}}
            return message.channel.send(new Discord.MessageEmbed()
            .setAuthor("Vote Check", message.member.guild.iconURL())
            .setDescription(votedString)
            .setColor("DC134C")
            .setFooter("Valkyrie")
            .setTimestamp());
        } else if (args[0] == "monthly") {
            var botStats = await GBLValk.getBot();
            var botStats2 = await DBLValk.getBot(client.user.id);
            return message.reply(`${botStats.monthly_upvotes} monthly votes on Glenn Bot List, and ${botStats2.monthlyPoints} on Top.gg.`);
        } else if (args[0] == "total") {
            var botStats = await GBLValk.getBot();
            var botStats2 = await DBLValk.getBot(client.user.id);
            return message.reply(`${botStats.total_upvotes} total votes on Glenn Bot List, and ${botStats2.points} on Top.gg.`);
        } else if (args[0] == "stats") {
            var botStats = await GBLValk.getBot();
            var botStats2 = await DBLValk.getBot(client.user.id);
            return message.channel.send(new Discord.MessageEmbed()
            .setAuthor("Bot List Stats", client.users.cache.get("330547934951112705").avatarURL())
            .setThumbnail(client.user.avatarURL())
            .setDescription("Some of these stats are retrieved from [Glenn Bot List](https://glennbotlist.xyz/bot/619305062900039726/vote)")
            .addField("Monthly Votes", `${botStats.monthly_upvotes} monthly votes on Glenn Bot List, and ${botStats2.monthlyPoints} on Top.gg.`, true)
            .addField("Total Votes", `${botStats.total_upvotes} total votes on Glenn Bot List, and ${botStats2.points} on Top.gg.`, true)
            .addField("Vote", "[Vote Here](https://glennbotlist.xyz/bot/619305062900039726/vote) or [here](https://top.gg/bot/619305062900039726/vote)! It helps a lot!", false)
            .addField("Invite", `[Invite me](${botStats.invite_url}) to your server`, true)
            .addField("Support Server", `Join the [official Valkyrie Server](https://discord.gg/hg4VTwc)`, true)
            .addField("Submit Feedback", `Feedback/Suggestions/Bugs? Fill out [the form](https://docs.google.com/forms/d/e/1FAIpQLSeJYUvmHURJXJZ_G99LHvAr002kN-EkmWbTDg7y1w7k3MOXKw/viewform?usp=sf_link)`, true)
            .addField("Servers", `Currently in ${client.guilds.cache.size} servers`, true)
            .addField("Users", `Serving approximately ${client.users.cache.size} people`, true)
            .setColor("DC134C")
            .setFooter("Valkyrie")
            .setTimestamp());
        } else {return message.reply("Yeah chief that wasn't a good arg. Try `server`, `has`, `monthly`, `total`, or `stats`.");};
    }
};