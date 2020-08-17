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
    name: "guild",
    description: "",
    async execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}guild <create|join|leave|view|mod>\``);};
        var e = process.argv.includes('--force') || process.argv.includes('-f');
		sequelize.sync({force: e}).then(async () => {}).catch(console.error);
        if (args[0] == "create") {
            if (!client.guilds.cache.get("679127746592636949").members.cache.has(message.author.id)) {return message.reply(`You have to be in the official server to create a guild! Use \`${prefix}supportserver\` to get the invite!`);};
            var pstats = await userGameData.findOne({where: {user_id: message.author.id}});
            if (!pstats || pstats.level < 30 || pstats.money < 30000) {return message.reply("You do not meet the minimum requirements to create a guild! You must be at least level 30 and have 30,000 GP to create a guild.")};
            if (client.guilds.cache.get().members.has(message.author.id)) {return message.reply(`In order to create a guild, please join the support server with \`${prefix}supportserver\``);};
        };
    }
};