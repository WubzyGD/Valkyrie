const Discord = require("discord.js");

function wait(time) {
	return new Promise(function (resolve) {
		setTimeout(function () {
		  	resolve("anything");
		}, time);
	});
};

const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const userGameData = sequelize.import("../../models/usergamedata");

module.exports = {
    name: "spinthedragon",
    description: "",
    execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.reply(`Syntax: \`${prefix}spinthedragon <create|limit> [bet]\`. \`create\` opens a match for up to 20 players. \`limit\` restricts the match to the number you specify (place this number before \`bet\`). Your number has to be 20 or less. The default bet is 500 Gold. Prestige and lost remnant bonuses **do not** apply to betting games.`);};
        if (message.channel.type == "dm") {return message.reply("This command can't be done in a DM!");};
        var e = process.argv.includes('--force') || process.argv.includes('-f');
        sequelize.sync({force: e}).then(async () => {}).catch(console.error);
        if (args[0] == "create") {
            var bet = Number(args[1]);
            if (!args[1] || isNaN(Number(args[1]))) {bet = 500};
            var pLim = 20;
        } else if (args[0] == "limit") {
            if (args.length < 2) {return message.reply("Specify the `limit` then the `bet`.");};
            var bet = Number(args[2]);
            if (!args[2] || isNaN(Number(args[2]))) {bet = 500};
            var pLim = Number(args[1]);
            if (isNaN(Number(pLim)) || pLim > 20) {pLim = 20;};
        } else {return message.reply("You must use either `create` or `limit`.");};
        var gameEmbed = new Discord.MessageEmbed()
        .setTitle("Spin the Dragon Match Created")
        .setDescription(`Created by ${message.member.displayName}. Match will automatically start in 60 seconds.`)
        .addField("What is the game?", "Spin the dragon is an elimination-roullette-type game where players take turns spinning the dragon on a platform. The dragon can hit a player with its tail, which will take some HP, it can breathe fire, which takes HP from multiple people, or")
        .addField("How do I join?", `If you have the required amount, use \`spin accept @${message.member.displayName}\`. **Do not use my prefix! It won't do anything if you do!**`)
        .addField("Match info", `Max players: ${pLim}\nBet: ${bet}\n\n*You must have the bet amount to join.*\n*The match host may start the match before the 60s with \`match start\`*`)
        .setColor("DC134C")
        .setFooter("Valkyrie", client.user.avatarURL())
        .setTimestamp();
        var game = await message.channel.send(gameEmbed);
    }
};