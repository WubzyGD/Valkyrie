const Discord = require("discord.js");
const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const userGameData = sequelize.import("../../models/usergamedata");

module.exports = {
    name: "vip",
    description: "",
    async execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}\`vip <add|remove|is> <@mention>`);};
        if (message.author.id !== "330547934951112705") {return message.reply("Sorry, but only an owner can do that!");};
        var e = process.argv.includes('--force') || process.argv.includes('-f');
		sequelize.sync({force: e}).then(async () => {}).catch(console.error);
        if (args[0] == "add") {
            if (mention) {var pstats = await userGameData.findOne({where: {user_id: mention.id}}); if (!pstats) {return message.reply("That user doesn't seem to have any stats!");};}
            else {return message.reply("You have to mention someone, idiot.");};
            await userGameData.update({is_vip: true}, {where: {user_id: message.author.id}});
            client.users.cache.get(mention.id).send("WubzyGD has made you a Valkyrie VIP! Uh congrats? Are you expecting confetti? Because the bard tried to use it as bait and it didn't work.");
            return message.channel.send(`Made ${message.member.guild.members.cache.get(mention.id).displayName} a VIP!`);
        } else if (args[0] == "remove") {
            if (mention) {var pstats = await userGameData.findOne({where: {user_id: mention.id}}); if (!pstats) {return message.reply("That user doesn't seem to have any stats!");};}
            else {return message.reply("You have to mention someone, idiot.");};
            await userGameData.update({is_vip: false}, {where: {user_id: message.author.id}});
            client.users.cache.get(mention.id).send("WubzyGD has removed you as a Valkyrie VIP! Uh lol? How'd you manage to get that to happen?");
            return message.channel.send(`${message.member.guild.members.cache.get(mention.id).displayName} is no longer a VIP!`);
        } else if (args[0] == "remove") {
            if (mention) {var pstats = await userGameData.findOne({where: {user_id: mention.id}}); if (!pstats) {return message.reply("That user doesn't seem to have any stats!");};}
            else {return message.reply("You have to mention someone, idiot.");};
            if (pstats.is_vip) {return message.channel.send(`${message.member.guild.members.cache.get(mention.id).displayName} is a VIP`);} else {return message.channel.send(`${message.member.guild.members.cache.get(mention.id).displayName} is not a VIP`);};
        } else {return message.channel.send("Bad arg. Use `<add|remove|is>`.");};
    }
};