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
    name: "bio",
    description: "",
    async execute(message, msg, args, cmd, prefix, mention, client) {
        var e = process.argv.includes('--force') || process.argv.includes('-f');
		sequelize.sync({force: e}).then(async () => {}).catch(console.error);
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}bio <set|clear|view>\``);};
        if (args[0] == "set") {
            var pstats = await userGameData.findOne({where: {user_id: message.author.id}});
            if (!pstats) {return message.reply("Couldn't find your stats ;-;")};
            await pstats.update({user_bio: args.shift().join(" ")}, {where: {user_id: message.author.id}});
            return message.reply("Bio set!");
        } else if (args[0] == "clear") {
            var pstats = await userGameData.findOne({where: {user_id: message.author.id}});
            if (!pstats) {return message.reply("Couldn't find your stats ;-;")};
            await pstats.update({user_bio: "Not Set"}, {where: {user_id: message.author.id}});
            return message.reply("Bio cleared!");
        } else if (args[0] == "view") {
            var pstats = await userGameData.findOne({where: {user_id: message.author.id}});
            if (!pstats) {return message.reply("Couldn't find your stats ;-;")};
            return message.reply(pstats.user_bio);
        }
    }
};