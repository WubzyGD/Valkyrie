﻿const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const Canvas = require("canvas");
const gbl = require("gblapi.js");
const fetch = require("node-fetch");
const fs = require("fs");
const dbl = require("dblapi.js");

client.commands = new Discord.Collection();

const Wubzy = "330547934951112705";

const regCommands = fs.readdirSync("./commands/regcmds").filter(file => file.endsWith(".js"));
for (var file of regCommands) {
	const command = require(`./commands/regcmds/${file}`);
	client.commands.set(command.name, command);
};
const admCommands = fs.readdirSync("./commands/admcmds").filter(file => file.endsWith(".js"));
for (var file of admCommands) {
	const command = require(`./commands/admcmds/${file}`);
	client.commands.set(command.name, command);
};

function wait(time) {
	return new Promise(function (resolve) {
		setTimeout(function () {
		  	resolve("anything");
		}, time);
	});
};

const GBLValk = new gbl("619305062900039726", 'XA-46200ce4794741d3bf7216dcb3f725b1', false, {webhookPort: 7429, webhookPath: "/GBLWebhook", webhookAuth: "pizzapineapplespeachesandpears"});
const DBLValk = new dbl("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTMwNTA2MjkwMDAzOTcyNiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTk5MzU0OTE0fQ.R339bPSx99_0HdK_96zbZnvO2oGlKdkuZQSgitFqEpM", {webhookAuth: "soup420", webhookPort: 7428, webhookPath: "/TopGG", statsInterval: 3600000}, client);

var botstats = {
	cmdcount: 0,
	cmdcounts: {},
	messages: 0,
	dicerolls: 0
};

var dmcmds = ["theme", "bj"];
var chcmds = ["slap", "battle", "serverinfo", "secretsanta", "vibecheck", "poll", ""];

const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const diceRolled = sequelize.import("./models/dicerolled");
const userGameData = sequelize.import("./models/usergamedata");
const serverSettings = sequelize.import("./models/serversettings");

var e = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({force: e}).then(async () => {}).catch(console.error);

//https://discordapp.com/oauth2/authorize?client_id=619305062900039726&scope=bot&permissions=1544547430 e

console.log("All commands successfully loaded with no errors!\n");

const info = require("./info.json");

var prefix = "v.";
const adminPrefix = "adm.";

const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');
	let fontSize = 70;
	do {
		ctx.font = `${fontSize -= 10}px sans-serif`;
	} while (ctx.measureText(text).width > canvas.width - 300);
	return ctx.font;
};

var last_treasureRoll = new Date().toString();

client.login(config.token);

fs.access("./database.sqlite", fs.F_OK, (err) => {
	if (err) {
	  	console.log("Database doesn't exist");
	  	return;};
	});

var snipe = {
	"edit": {},
	"delete": {}
};

var ars = {};
var settings = {};
var scores = {};
var cstats = {};

var factions = fs.readdirSync('./data/factions');
for (let faction of factions) {scores[faction.slice(0, faction.length - 5)] = {total: 0, members: {}};};

var accountsd = fs.readdirSync('./data/accounts');
var accounts = {};
for (let accountf of accountsd) {
	let account = JSON.parse(fs.readFileSync(`./data/accounts/${accountf}`));
	accounts[accountf.slice(0, accountf.length - 5)] = account;
};

for (var guild of Array.from(client.guilds.cache.values())) {
	if (fs.existsSync(`./data/ar/${guild.id}.json`)) {
		var t = fs.readFileSync(`./data/ar/${guild.id}.json`);
		ars[guild.id] = JSON.parse(t);
	} else {ars[guild.id] = null;};
};
setInterval(async () => {
	for (var guild of Array.from(client.guilds.cache.values())) {
		if (fs.existsSync(`./data/ar/${guild.id}.json`)) {
			var t = fs.readFileSync(`./data/ar/${guild.id}.json`);
			ars[guild.id] = JSON.parse(t);
		} else {ars[guild.id] = null;};
		if (fs.existsSync(`./data/guildconfig/${guild.id}.json`)) {
			var t = fs.readFileSync(`./data/guildconfig/${guild.id}.json`);
			settings[guild.id] = JSON.parse(t);
		} else {settings[guild.id] = null;};
	};
	for (let factionf of factions) {
		let faction = JSON.parse(fs.readFileSync(`./data/factions/${factionf}`));
		faction.score.total += scores[faction.name.toLowerCase()].total;
		for (let member of Object.keys(scores[faction.name.toLowerCase()].members)) {
			if (Object.keys(faction.score.members).includes(member)) {faction.score.members[member] += scores[faction.name.toLowerCase()].members[member];}
			else {faction.score.members[member] = scores[faction.name.toLowerCase()].members[member];};
		};
		fs.writeFileSync(`./data/factions/${factionf}`, JSON.stringify(faction), 'utf8');
	};
	for (let faction of factions) {scores[faction.slice(0, faction.length - 5)] = {total: 0, members: {}};};
	for (let accountf of accountsd) {
		let account = JSON.parse(fs.readFileSync(`./data/accounts/${accountf}`));
		accounts[accountf.slice(0, accountf.length - 5)] = account;
	};
}, 45000);

setInterval(async() => {
	var userss = Array.from(client.guilds.cache.get("679127746592636949").members.cache.values());
	var users = [];
	for (var u of userss) {
		var ps = await userGameData.findOne({where: {user_id: u.id}});
		if (ps != undefined && ps != null) {users.push(ps);};
	};
	var ls = "";
	var ls_money = "";
	var users_money = users;
	users.sort(function(a, b){return b.level-a.level});
	users_money.sort(function(a, b){return b.money-a.money});
	for (var i = 0; i < 10; i++) {
		if (users[i] == undefined) {delete users[i];}
		else {ls += `**${i + 1}**. __${client.guilds.cache.get("679127746592636949").members.cache.get(users[i].user_id).displayName}__ - **Level ${users[i].level}**\n->  ${users[i].money}GP // Prestige ${users[i].prestige}\n\n`;};
		if (users_money[i] == undefined) {delete users_money[i];}
		else {ls_money += `**${i + 1}**. __${client.guilds.cache.get("679127746592636949").members.cache.get(users_money[i].user_id).displayName}__ - **${users_money[i].money} GP**\n->  Level ${users_money[i].level} // Prestige ${users[i].prestige}\n\n`;};
	};
	var lbm = await client.guilds.cache.get("679127746592636949").channels.cache.get("737087839413469185").messages.fetch("737135205382357003");
	await lbm.edit(new Discord.MessageEmbed()
	.setTitle("Level Leaderboard")
	.setDescription(`For ${client.guilds.cache.get("679127746592636949").name}`)
	.setThumbnail(client.guilds.cache.get("679127746592636949").iconURL({size: 2048}))
	.addField("Scores", ls)
	.setColor("DC134C")
	.setFooter("Valkyrie", client.user.avatarURL())
	.setTimestamp());
	var lbmm = await client.guilds.cache.get("679127746592636949").channels.cache.get("737087839413469185").messages.fetch("737140287704531034");
	await lbmm.edit(new Discord.MessageEmbed()
	.setTitle("GP Leaderboard")
	.setDescription(`For ${client.guilds.cache.get("679127746592636949").name}`)
	.setThumbnail(client.guilds.cache.get("679127746592636949").iconURL({size: 2048}))
	.addField("Scores", ls_money)
	.setColor("DC134C")
	.setFooter("Valkyrie", client.user.avatarURL())
	.setTimestamp());
}, 120000);

client.on("ready", async () => {
	try {
	var date = new Date; date = date.toString().slice(date.toString().search(":") - 2, date.toString().search(":") + 6);
	console.log(`Logged in at ${date}!`);
	console.log(`Logged in as ${client.user.username}`);
	console.log(`Client ID: ${client.user.id}`);
	console.log(`Running on ${client.guilds.cache.size} guilds and serving ${client.users.cache.size} members.`);

	console.log("\nSuccessfully loaded Sequelize database(s)");
	
  	var responses = {"PLAYING": ["some high rolls...", "with dice...", "a great rpg...", "with the laws of the dice...", 
  	"with the dead elf's knife...", "with skeleton bones...", "with a new set of dice...", "five-finger filet...", 
  	"with the sanity of the bard...", "with Wubzy's winning chances...", "with Wubzy's patience...", "with the idea of becoming self-aware...",
  	"\"your code is wrong, wubzy\"", "with fire...", "with my food...", "with a fireball...", "dodge-fire-ball...",
  	"cards with Wubzy...", "with my code...", "roll to seduce...", "in blood...", "with a fishing rod...", 
	"52-Card Burn-up...", "some bops...", "battle music...", "country music during a battle...", "at being insane...",
	"I'm self-aware now...", "with newfound boredom...", "with a will to die...", "with stonks...", "with a deagle...",
	"with your server ;)...", "in a lava pool...", "piano, just badly...", "for only myself...", "with the odds...",
	"in purgatory...", "...", "hot cross bones...", "lots of nat 20s...", "with your odds of survival...",
	"with a knife", "0 days since last nat 1...", "it thicc and jazzy...", "it cool...", "in a new dungeon...",
	"Valkyrie4President...", "with time..."
	,`in ${client.guilds.cache.size} servers...`], "WATCHING": [
	"swordfights...", "Code Geass...", "Wubzy suffer...", "people suffer...", "low rolls...", "my plans unfold...",
	"over the dungeon...", "idiots get low rolls...", `for ${regCommands.length + admCommands.length} commands...`,
	"my palace of gold...", "high rolls...", "risky battles...", "some idiot use a sword...", "castles crumble...",
	"for newcomers...", "out for some fun...", "the party argue...", "a bad love story...", "something sad...",
	"the plan go wrong...", "plans F through K...", "I'm not a bad slime, slurp", "the black swordsman...",
	"some tanuki girl...", "the 4 Heroes' Church...", "you sleep...", "Lelouch vi Britannia commands you...",
	"Touka run a marathon..."
	, `over ${client.guilds.cache.size} servers...`]};
	var type = Object.keys(responses)[Math.floor(Math.random() * Object.keys(responses).length)];
	client.user.setActivity(responses[type][Math.floor(Math.random() * responses[type].length)] + " | " + prefix + "help", {type: type});
	GBLValk.webhook.on("vote", async vote => {
		var u = client.users.cache.get(vote.id);
		var stats = await GBLValk.getBot(client.user.id);
		client.guilds.cache.get("679127746592636949").channels.cache.get("736690885324177549").send(new Discord.MessageEmbed()
		.setAuthor("New GBL Vote!", u.avatarURL())
		.setThumbnail("https://cdn.discordapp.com/icons/623600255987875870/a_fdb1896f4a9e2b1d1ab74b6e1eadad7b.gif?size=2048")
		.setDescription(`From ${u.username}`)
		.addField("Votes/Monthly", stats.monthly_upvotes, true)
		.addField("Votes/Total", stats.total_upvotes, true)
		.addField("In Server?", client.guilds.cache.get("679127746592636949").members.cache.has(u.id), true)
		.setColor("ff33ff"));
	
		await sequelize.sync({force: e}).then(async () => {}).catch(console.error);
		var pstats = await userGameData.findOne({where: {user_id: u.id}});
		if (pstats) {await userGameData.update({xp: pstats.xp + 1500}, {where: {user_id: u.id}})};
	
		if (client.guilds.cache.get("679127746592636949").members.cache.has(u.id)) {
			client.guilds.cache.get("679127746592636949").channels.cache.get("679127747469115405").send(new Discord.MessageEmbed()
			.setAuthor("New Vote")
			.setDescription(`Thanks <@${u.id}> for the vote! Enjoy 1,500XP on the house`)
			.setColor("33ff33"));
		};
	});

	DBLValk.webhook.on('vote', async vote => {
		var u = client.users.cache.get(vote.user);
		var stats = await DBLValk.getBot(client.user.id);
		client.guilds.cache.get("679127746592636949").channels.cache.get("736690885324177549").send(new Discord.MessageEmbed()
		.setAuthor("New DBL Vote!", u.avatarURL())
		.setThumbnail("https://cdn.discordapp.com/icons/264445053596991498/a_eadf00405ab375668c76da10ee95f646.gif?size=2048")
		.setDescription(`From ${u.username}`)
		.addField("Votes/Monthly", stats.points, true)
		.addField("Votes/Total", stats.monthlyPoints, true)
		.addField("In Server?", client.guilds.cache.get("679127746592636949").members.cache.has(u.id), true)
		.setColor("7711cc"));
	
		await sequelize.sync({force: e}).then(async () => {}).catch(console.error);
		var pstats = await userGameData.findOne({where: {user_id: u.id}});
		if (pstats) {await userGameData.update({xp: pstats.xp + 1500}, {where: {user_id: u.id}})};
	
		if (client.guilds.cache.get("679127746592636949").members.cache.has(u.id)) {
			client.guilds.cache.get("679127746592636949").channels.cache.get("679127747469115405").send(new Discord.MessageEmbed()
			.setAuthor("New Vote")
			.setDescription(`Thanks <@${u.id}> for the vote! Enjoy 1,500XP on the house`)
			.setColor("33ff33"));
		};
	});

	fetch(`https://discordbotlist.com/api/v1/bots/619305062900039726/stats`, {
        method: 'POST',
        headers: {
            'authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0IjoxLCJpZCI6IjYxOTMwNTA2MjkwMDAzOTcyNiIsImlhdCI6MTU5NjQwODU0M30.o7Tfuc_WnRfzjWLyFD2MdjlnbkQ0g77zdowAUb1eb-w"
        },
        body: {"guilds": client.guilds.cache.size, "users": client.users.cache.size}
    }).then(res => res.json()).then(/*json => console.log(json)*/);
} catch (e) {console.log(e)};
});

client.on('guildCreate', async (guild) => {
	GBLValk.updateStats(client.guilds.cache.size);
	client.guilds.cache.get("679127746592636949").channels.cache.get("736690885324177549").send(new Discord.MessageEmbed()
	.setAuthor("Valk Added to Server", guild.owner.user.avatarURL())
	.setDescription(guild.name)
	.addField("Members", guild.members.cache.size, true)
	.addField("Guild #", client.guilds.cache.size, true)
	.addField("Added", `${new Date().getDate()} of ${new Date().toLocaleString('default', { month: 'long' })}`, true)
	.setColor("00ff00")
	.setFooter("Valkyrie", client.user.avatarURL())
	.setTimestamp());

	fetch(`https://discordbotlist.com/api/v1/bots/619305062900039726/stats`, {
        method: 'POST',
        headers: {
            'authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0IjoxLCJpZCI6IjYxOTMwNTA2MjkwMDAzOTcyNiIsImlhdCI6MTU5NjQwODU0M30.o7Tfuc_WnRfzjWLyFD2MdjlnbkQ0g77zdowAUb1eb-w"
        },
        body: JSON.stringify({guilds: client.guilds.cache.size, users: client.users.cache.size})
    }).then(res => res.json());
});

client.on('guildDelete', async (guild) => {
	GBLValk.updateStats(client.guilds.cache.size);
	client.guilds.cache.get("679127746592636949").channels.cache.get("736690885324177549").send(new Discord.MessageEmbed()
	.setAuthor("Valk Removed from Server", guild.owner.user.avatarURL())
	.setDescription(guild.name)
	.addField("Members", guild.members.cache.size, true)
	.addField("Guild #", client.guilds.cache.size + 1, true)
	.addField("Removed", `${new Date().getDate()} of ${new Date().toLocaleString('default', { month: 'long' })}`, true)
	.setColor("ff0000")
	.setFooter("Valkyrie", client.user.avatarURL())
	.setTimestamp());

	fetch(`https://discordbotlist.com/api/v1/bots/619305062900039726/stats`, {
        method: 'POST',
        headers: {
            'authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0IjoxLCJpZCI6IjYxOTMwNTA2MjkwMDAzOTcyNiIsImlhdCI6MTU5NjQwODU0M30.o7Tfuc_WnRfzjWLyFD2MdjlnbkQ0g77zdowAUb1eb-w"
        },
        body: JSON.stringify({guilds: client.guilds.cache.size, users: client.users.cache.size})
    }).then(res => res.json());
});

client.on('guildMemberAdd', async member => {
	await sequelize.sync({force: e}).then(async () => {}).catch(console.error);
    if (fs.existsSync(`./data/guildconfig/${member.guild.id}.json`)) {
        var thisServerSettings = fs.readFileSync(`./data/guildconfig/${member.guild.id}.json`);
		thisServerSettings = JSON.parse(thisServerSettings);
		if (thisServerSettings.welcome_message_channel != null) {var channel = member.guild.channels.cache.get(thisServerSettings.welcome_message_channel);};
    };
	try {
	/*if (thisServerSettings.join_role != "none") {
		var role = member.guild.roles.cache.get(thisServerSettings.join_role.slice(3, thisServerSettings.join_role.length - 1).trim());
		if (!role) {serverSettings.update({join_role: "none"}, {where: {guild_id: member.guild.id}}); var thisServerSettings = await serverSettings.findOne({where: {guild_id: member.guild.id}});};
	};*/
	var join_extraOptions = new Array("Careful, the tiefling riled up the skeletons.", 
	"Be warned, the wizard is a little irritable, he just rolled pretty low.", "Careful, dice rolls are a little low today.", 
	"Look on the bright side, finally someone other than the dragonborn can help take care of the goblins.", 
	"I hope you brought HP.", "You better have good gear.", "Bad timing, the boss just showed up. Free health potions? Anyone?",
	"Now isn't the best time. The tiefling is forcing her worship on the party, and it's come to knives.",
	"I hope you're good at five finger filet. The barbarian made a deal I don't think he can get out of...",
	"You've been to dungeon floors this low... right? Wait a minute, do I hear rumbling? I don't think that's the barbarian's stomach.",
	"Look, for once, it's actually pretty melow here... Unless you don't count nine dragons and a goblin army as just another Tuesday.",
	"Here's a sword, a helmet, and an excerpt from the Bible, good luck in there.", "Did you bring applesauce? -Asher Crestworth",
	"Don't pay attention to the dark cavern over there. Except for when you go into it in a minute.");
	var chosen_join_extraOptions = Math.floor(Math.random() * join_extraOptions.length);
	try {
		const canvas = Canvas.createCanvas(700, 250);
		const ctx = canvas.getContext('2d');

		const background = await Canvas.loadImage('./wallpaper.jpg');
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

		ctx.strokeStyle = '#74037b';
		ctx.strokeRect(0, 0, canvas.width, canvas.height);

		ctx.font = '28px sans-serif';
		ctx.fillStyle = '#ffffff';
		ctx.fillText('Welcome to the dungeon,', canvas.width / 2.5, canvas.height / 3.5);

		ctx.font = applyText(canvas, member.displayName);
		ctx.fillStyle = '#ffffff';
		ctx.fillText(member.displayName, canvas.width / 2.5, canvas.height / 1.8);

		ctx.beginPath();
		ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.clip();

		const avatar = await Canvas.loadImage(member.guild.iconURL({size: 2048, format: "png"}));
		ctx.drawImage(avatar, 25, 25, 200, 200);

		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

		if (channel != null && channel != undefined) {channel.send(`**${member.displayName}** just joined the fight. ${join_extraOptions[chosen_join_extraOptions]}`, attachment);};
	} catch (error) {console.log(error);};} catch (e) {console.log(e);};
});

client.on('guildMemberRemove', async member => {
	try {
		if (fs.existsSync(`./data/guildconfig/${member.guild.id}.json`)) {
			var thisServerSettings = fs.readFileSync(`./data/guildconfig/${member.guild.id}.json`);
			thisServerSettings = JSON.parse(thisServerSettings);
			if (thisServerSettings.leave_message_channel != null) {var channel = member.guild.channels.cache.get(thisServerSettings.leave_message_channel);};
			if (channel != null && channel != undefined) {channel.send(member.displayName + ' left the server. They probably got eaten by goblins.')};
		};
	} catch (e) {
		console.log(e);
	};
});

client.on("message", async message => {
	await sequelize.sync({force: e}).then(async () => {}).catch(console.error);
	try {
	if (message.author.bot) { return undefined; }
	if (message.channel.type == 'dm') {var dmch = true;} else {var dmch = false};
	if (message.channel.type !== 'text' && message.channel.type !== 'dm') { return undefined; }

	if (message.channel.type == "text") {if (settings[message.guild.id]) {prefix = settings[message.guild.id].prefix;};};
	
	var msg = message.content.toLowerCase();
	var mention = message.mentions.users.first();
	var args = message.content.slice(prefix.length).trim().split(/\s+/g);
	var cmd = args.shift().toLowerCase();

	if (message.content === '!join') {
		if (message.author.id != Wubzy) {return;};
		message.channel.send("Simulating member join...");
		client.emit('guildMemberAdd', message.member || message.guild.members.cache.get(message.author));
	};
	if (msg.startsWith(prefix)) {botstats.cmdcount += 1;}; if (msg.startsWith(prefix) && cmd == "cmdcount") {return message.channel.send(new Discord.MessageEmbed().setAuthor("Commands Executed since last restart", client.user.avatarURL()).setDescription(`${botstats.cmdcount} commands.`));};

	if (message.channel.id == "691149309755916370" && (msg.startsWith(prefix)) && (cmd !== "shop") && (message.author.id !== Wubzy)) {return message.delete();};

	var pstats = await userGameData.findOne({where: {user_id: message.author.id}});
	if (!pstats) {
		await userGameData.create({
			user_id: message.author.id,
			username: message.author.username,
			last_xpGain: new Date().toString(),
			xp: 0,
			level: 1,
			prestige: 0,
			fighters_count: 0,
			money: 100,
			lost_remnants: 0,
			prestige_fighters_count: 0,
			boss_damage_done: 0,
			ancient_boss_damage_done: 0
		});
		var pstats = await userGameData.findOne({where: {user_id: message.author.id}});
	};

	if (Object.keys(accounts).includes(message.author.id)) {var account = accounts[message.author.id]; if (!Object.keys(cstats).includes(message.author.id)) {cstats[message.author.id] = new Date().toString();}; if (!Object.keys(scores[account.faction.toLowerCase()].members).includes(message.author.id)) {scores[account.faction.toLowerCase()].members[message.author.id] = 0;};} else {var account = null;};

	if ((new Date().getTime() - new Date(pstats.last_xpGain).getTime()) / 1000 >= 60) {
		if (message.channel.type == "text" && message.channel.guild.id == "679127746592636949") {var guildBoost = 1.5;} else {var guildBoost = 1;};
		await userGameData.update({money: Math.floor(15 * (pstats.lost_remnants + 1) * ((pstats.prestige + 2) * .5) * guildBoost) + pstats.money}, {where: {user_id: message.author.id}});
		await userGameData.update({xp: Math.floor(10 * (pstats.lost_remnants + 1) * ((pstats.prestige + 2) * .5) * guildBoost) + pstats.xp}, {where: {user_id: message.author.id}});
		await userGameData.update({last_xpGain: new Date().toString()}, {where: {user_id: message.author.id}});
		if (account) {scores[account.faction.toLowerCase()].total += Math.floor(5 * guildBoost); scores[account.faction.toLowerCase()].members[message.author.id] += Math.floor(5 * guildBoost);};
	};
	if (pstats.xp > ((pstats.level * 100) + ((pstats.level * 6) + (0.3 * (100 * pstats.level))))) {try{if (message.channel.type == "text") {
		var thisServerSettings = settings[message.guild.id];
		if (thisServerSettings.level_update == true) {message.channel.send(`Congratulations ${message.member.displayName} on reaching Level ${pstats.level + 1}`);};
		totalLevelXP = ((pstats.level * 100) + ((pstats.level * 6) + (0.3 * (100 * pstats.level))))
		await userGameData.update({level: pstats.level + 1}, {where: {user_id: message.author.id}});
		await userGameData.update({xp: (pstats.xp - totalLevelXP)}, {where: {user_id: message.author.id}});
		if (client.guilds.cache.get("679127746592636949").members.cache.has(message.author.id)) {client.guilds.cache.get("679127746592636949").channels.cache.get("691149365372256326").send(`<@${message.author.id}> has leveled up to Level ${pstats.level + 1}!`);};
		if (account) {scores[account.faction.toLowerCase()].total += (pstats.level + 1) * 25; scores[account.faction.toLowerCase()].members[message.author.id] += (pstats.level + 1) * 25;};
	};}catch{};};

	if (pstats.commands_executed == 10) {
		message.author.send(new Discord.MessageEmbed().setTitle("Enjoying Valkyrie?").setDescription("I hope I'm living up to your expectations!").addField("Get Support", "Join the [official Valkyrie Server](https://discord.gg/hg4VTwc)").addField("Vote for me", "Drop me a vote [here](https://glennbotlist.xyz/bot/619305062900039726/vote) on Glenn Bot List :) You'll get an XP boost!").setColor("DC134C").setFooter("Valkyrie | This message was automatically sent because you executed 10 commands", client.user.avatarURL()).setTimestamp());
		await userGameData.update({commands_executed: pstats.commands_executed + 1}, {where: {user_id: message.author.id}});
	}

	async function spawnTreasure() {
		var xpintreasure = (Math.ceil(Math.random() * 1300)) + 200;
		var moneyintreasure = (Math.ceil(Math.random() * 1300)) + 200;
		var chestEmbed = new Discord.MessageEmbed().setAuthor("Treasure Chest")
		.setDescription("A Treasure Chest has spawned!\n\nSay \"claim\" to get the chest! Only one person can claim it, and you'll have an hour from before it expires.")
		.addField("In the chest", `**${xpintreasure} XP**\n**${moneyintreasure} Coins**`)
		.setColor("DC134C")
		.setFooter("Valkyrie", client.user.avatarURL())
		.setTimestamp();
		client.guilds.cache.get("679127746592636949").channels.cache.get("691149517021511722").send(chestEmbed);
		try {var filter = m => m.channel.id == "691149517021511722" && m.content.toLowerCase().includes("claim");
		var claimed = await client.guilds.cache.get("679127746592636949").channels.cache.get("691149517021511722").awaitMessages(filter, {time: (600000), max: 1});
		var tpstats = await userGameData.findOne({where: {user_id: claimed.first().author.id}}); if (!tpstats) {
		await userGameData.create({
			user_id: message.author.id, username: message.author.username,
			last_xpGain: new Date().toString(), xp: 0, level: 1, prestige: 0, fighters_count: 0, money: 100,
			lost_remnants: 0, prestige_fighters_count: 0, boss_damage_done: 0, ancient_boss_damage_done: 0
		});
		var tpstats = await userGameData.findOne({where: {user_id: claimed.first().author.id}});};
		await userGameData.update({xp: Math.floor(xpintreasure * (tpstats.lost_remnants + 1) * ((tpstats.prestige + 2) * .5)) + tpstats.xp}, {where: {user_id: tpstats.user_id}});
		await userGameData.update({money: Math.floor(moneyintreasure * (tpstats.lost_remnants + 1) * ((tpstats.prestige + 2) * .5)) + tpstats.money}, {where: {user_id: tpstats.user_id}});
		return client.guilds.cache.get("679127746592636949").channels.cache.get("691149517021511722").send("The chest has been claimed!");
		} catch (e) {return client.guilds.cache.get("679127746592636949").channels.cache.get("691149517021511722").send("Ope! Looks like nobody claimed the chest. Whelp Asher, all yours.");};
	};
	if (((new Date().getTime() - new Date(last_treasureRoll).getTime()) / 1000 >= 60) && Math.floor(Math.random() * 100) <= 1) {spawnTreasure(); last_treasureRoll = new Date().toString();}
	else if ((new Date().getTime() - new Date(last_treasureRoll).getTime()) / 1000 >= 60) {last_treasureRoll = new Date().toString();};
	if (msg.startsWith(prefix) && (cmd == "dicecount" || cmd == "rollcount")) {
		var tempDieCount = await diceRolled.findOne({where: {user_id: String(message.author.id)}});
		if (tempDieCount) {return message.reply(`You have rolled dice ${tempDieCount.dice_rolled} times.`);}
		else {return message.reply("You haven't rolled any dice yet!");};
	} else if (msg.startsWith(prefix) && (cmd == "getdata") && message.author.id === Wubzy) {
		client.users.cache.get(Wubzy).send({file: "./database.sqlite"});
	} else if (msg.startsWith(prefix) && (cmd == "spawntreasure") && message.author.id === Wubzy) {
		message.delete();
		return spawnTreasure();
	} else if (msg.startsWith(prefix) && cmd == "snipe") {
		if (!args.length) {return message.reply(`Syntax: \`${prefix}snipe <e|edit|d|delete> [#channel]\``);};
		if (message.mentions.channels.size > 0) {var channel = message.mentions.channels.first()} else if (args.length > 1 && args[1].length == 18) {
			var channel = message.guild.channels.cache.get(args[1]);
			if (channel == undefined) {return message.reply("You provided an invalid channel ID!");};
		} else {var channel = message.channel;};
		if (args[0].startsWith("e")) {
			message.delete();
			if (!Object.keys(snipe.edit).includes(message.guild.id)) {return message.reply("Looks like nobody has edited a message in this guild recently.");};
			if (!Object.keys(snipe.edit[message.guild.id]).includes(channel.id)) {return message.reply("Looks like nobody has edited a message in this channel recently.");};
			var m = snipe.edit[message.guild.id][channel.id];
			return message.channel.send(new Discord.MessageEmbed()
			.setAuthor("Last Edited Message", m.old.author.avatarURL())
			.setDescription(`In \`${m.old.channel.name}\`\nSent by ${m.old.member.displayName}`)
			.addField("Old Message", m.old.content)
			.addField("New Message", m.cur.content)
			.setThumbnail(m.old.guild.iconURL({size: 2048}))
			.setColor("DC134C"));
		} else if (args[0].startsWith("d")) {
			message.delete();
			if (!Object.keys(snipe.delete).includes(message.guild.id)) {return message.reply("Looks like nobody has deleted a message in this guild recently.");};
			if (!Object.keys(snipe.delete[message.guild.id]).includes(channel.id)) {return message.reply("Looks like nobody has deleted a message in this channel recently.");};
			var m = snipe.delete[message.guild.id][channel.id];
			return message.channel.send(new Discord.MessageEmbed()
			.setAuthor("Last Deleted Message", m.author.avatarURL())
			.setDescription(`In \`${m.channel.name}\`\nSent by ${m.member.displayName}`)
			.addField("Message", m.content)
			.setThumbnail(m.guild.iconURL({size: 2048}))
			.setColor("DC134C"));
		} else {return message.reply("I can snipe an `edit` or a `delete`!");};
	} else if (msg.startsWith(prefix) && cmd === "music") {
		const ytdl = require('ytdl-core-discord');

		async function play(connection, url) {return connection.play(await ytdl(url), {type: 'opus', highWaterMark: 500});}
		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel) {return message.reply('You have to be in a voice channel for me to play music!');}

		voiceChannel.join().then(async connection => {
			let dispatcher = await play(connection, args.join(" ").trim());
			dispatcher.on('finish', () => {voiceChannel.leave();});
		});
	} else if (!client.commands.has(cmd)) {
	if (message.channel.type == "text") {client.commands.get("arcustom").execute(message, msg, args, cmd, prefix, mention, client, ars[message.guild.id]);};};
	try {
		if (msg.startsWith(prefix)) {
			if (client.commands.has(cmd) || client.commands.find(cmddd => cmddd.aliases && cmddd.aliases.includes(cmd))) {
				if (account && (new Date().getTime() - new Date(cstats[message.author.id]).getTime()) / 1000 >= 60) {cstats[message.author.id] = new Date().toString(); scores[account.faction.toLowerCase()].total += 15; scores[account.faction.toLowerCase()].members[message.author.id] += 15;};
				if (!(cmd == "say" || cmd == "slap" || cmd == "send")) {
					message.channel.startTyping();
					await wait(800);
					message.channel.stopTyping();
				};
				let cmdd = client.commands.get(cmd) || client.commands.find(cmddd => cmddd.aliases && cmddd.aliases.includes(cmd));
				cmdd.execute(message, msg, args, cmd, prefix, mention, client);
				client.guilds.cache.get('679127746592636949').channels.cache.get('758787493847236638').setName(`Commands Run: ${Number(client.guilds.cache.get('679127746592636949').channels.cache.get('758787493847236638').name.slice(14).trim()) + 1}`);
				await userGameData.update({commands_executed: pstats.commands_executed + 1}, {where: {user_id: message.author.id}});
			};
		} else if (msg.startsWith(adminPrefix)) {
			var args = message.content.slice(adminPrefix.length).trim().split(/ +/g);
			var cmd = args.shift().toLowerCase();
			message.channel.startTyping();
			await wait(800);
			message.channel.stopTyping();
			if (client.commands.has(cmd) || client.commands.find(cmddd => cmddd.aliases && cmddd.aliases.includes(cmd))) {
				let cmdd = client.commands.get(cmd) || client.commands.find(cmddd => cmddd.aliases && cmddd.aliases.includes(cmd));
				cmdd.execute(message, msg, args, cmd, adminPrefix, mention, client);
			};
			await userGameData.update({commands_executed: pstats.commands_executed + 1}, {where: {user_id: message.author.id}});
		};
	} catch (err) {
		console.error(err);
		message.reply("Really not sure what happened, but something you did (or something Wubzy sucks at doing) broke it. Please report this to WubzyGD#8766.")
		client.users.cache.get(Wubzy).send("There was a fatal error in " + message.member.guild.name);
		client.users.cache.get(Wubzy).send(err);
	};
	} catch (e) {console.log(e);};

	//enemy
	//story
	//char
	//quest
	//insult
	//scene
	//seduce
	//waifu
	//card games
	//raids
});

function getTS(guildId) {
	if (fs.existsSync(`./data/guildconfig/${guildId}.json`)) {
		var thisServerSettings = fs.readFileSync(`./data/guildconfig/${guildId}.json`);
		thisServerSettings = JSON.parse(thisServerSettings);
		return thisServerSettings;
	} else {return null;}
};

client.on("messageUpdate", async (oldM, newM) => {
	if (oldM.channel.type != "text") {return;};
	if (oldM.author.bot) {return;}
	if (oldM.deleted) {return;}
	if (!Object.keys(snipe.edit).includes(oldM.guild.id)) {snipe.edit[oldM.guild.id] = {};};
	snipe.edit[oldM.guild.id][oldM.channel.id] = {old: oldM, cur: newM};

	let ts = getTS(oldM.guild.id);
	if (ts && ts.log_channel) {if (oldM.guild.channels.cache.has(ts.log_channel)) {oldM.guild.channels.cache.get(ts.log_channel).send(new Discord.MessageEmbed()
		.setTitle('Message Edited')
		.setDescription(`Sent by <@${oldM.author.id}> | In <#${oldM.channel.id}> | [See Message](${oldM.url})`)
		.setThumbnail(oldM.author.avatarURL({size: 1024}))
		.addField("Old Message", "`-> `" + oldM.content.toString())
		.addField("New Message", "`-> `" + newM.content.toString())
		.setColor('8034eb').setFooter("Valkyrie", client.user.avatarURL()).setTimestamp());
	}}
});

client.on("messageDelete", async message => {
	if (message.channel.type != "text") {return;};
	if (!Object.keys(snipe.delete).includes(message.guild.id)) {snipe.delete[message.guild.id] = {};};
	snipe.delete[message.guild.id][message.channel.id] = message;

	let ts = getTS(message.guild.id);
	if (ts && ts.log_channel) {if (message.guild.channels.cache.has(ts.log_channel)) {
		let mde = new Discord.MessageEmbed()
			.setTitle('Message Deleted')
			.setDescription(`Sent by <@${message.author.id}> | In <#${message.channel.id}>`)
			.setThumbnail(message.author.avatarURL({size: 1024}))
			.setColor('ecff8f').setFooter("Valkyrie", client.user.avatarURL()).setTimestamp();
		if (message.content && message.content.length) {mde.addField("Message", "`-> `" + message.content.toString());}
		if (message.attachments.size) {
			if (message.attachments.first().url.includes(".png") || message.attachments.first().url.includes(".jpg") || message.attachments.first().url.includes(".gif")) {/*console.log('e');*/ try {mde.setImage(message.attachments.first().url);} catch {}}
			let av = Array.from(message.attachments.values());
			as = ''; for (let a of av) {
				as += `[Att. ${av.indexOf(a) + 1}](${a.url})`;
				if (av.indexOf(a) + 1 < av.length) {as += ' | ';}
			}
			if (as.length) {mde.addField('Attachments', as);}
		}
		message.guild.channels.cache.get(ts.log_channel).send(mde);
	}}
});

client.on('channelCreate', async channel => {
	if (channel.type == 'dm') {return;}

	let ts = getTS(channel.guild.id);
	if (ts && ts.log_channel) {if (channel.guild.channels.cache.has(ts.log_channel)) {channel.guild.channels.cache.get(ts.log_channel).send(new Discord.MessageEmbed()
		.setTitle('Channel Created')
		.setDescription(`Channel: <#${channel.id}> | \`#${channel.name}\``)
		.addField(`In Category`, channel.parent.name, true)
		.addField(`Type`, channel.type, true)
		.setThumbnail(channel.guild.iconURL({size: 1024}))
		.setColor('66d2e3').setFooter("Valkyrie", client.user.avatarURL()).setTimestamp());
	}}
});

client.on('channelDelete', async channel => {
	if (channel.type == 'dm') {return;}

	let ts = getTS(channel.guild.id);
	if (ts && ts.log_channel) {if (channel.guild.channels.cache.has(ts.log_channel)) {channel.guild.channels.cache.get(ts.log_channel).send(new Discord.MessageEmbed()
		.setTitle('Channel Deleted')
		.setDescription(`Old Channel Naame: #${channel.name}`)
		.addField(`In Category`, channel.parent.name)
		.setThumbnail(channel.guild.iconURL({size: 1024}))
		.setColor('66d2e3').setFooter("Valkyrie", client.user.avatarURL()).setTimestamp());
	}}
});

client.on('channelUpdate', async (oldCh, newCh) => {
	let channel = oldCh;
	if (channel.type == 'dm') {return;}
	if (channel.deleted) {return;}
	if (channel.id == '758787493847236638') {return;}
	let ts = getTS(channel.guild.id);
	if (ts && ts.log_channel) {if (channel.guild.channels.cache.has(ts.log_channel)) {
		let ded = new Discord.MessageEmbed()
			.setTitle('Channel Edited')
			.setDescription(`Channel: <#${channel.id}>`)
			.setThumbnail(channel.guild.iconURL({size: 1024}))
			.setColor('66d2e3').setFooter("Valkyrie", client.user.avatarURL()).setTimestamp()
		if (oldCh.name !== newCh.name) {ded.addField("Name Change", `**Old**: \`${oldCh.name}\`\n**New**: \`${newCh.name}\``, true);}
		if (oldCh.parent && oldCh.parent.name != newCh.parent.name) {ded.addField("Category Change", `**Old**: \`${oldCh.parent.name}\`\n**New**: \`${newCh.parent.name}\``, true);}
		//if (!oldCh.permissions.equals(newCh.permissions)) {ded.addField("Permissions Update", "Channel permissions were changed.");}
		if (!ded.fields.length) {return;}
		channel.guild.channels.cache.get(ts.log_channel).send(ded);
	}}
})