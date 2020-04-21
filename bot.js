const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const Canvas = require("canvas");

const fs = require("fs");
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

var e = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({force: e}).then(async () => {
	console.log('Database synced');
}).catch(console.error);

//https://discordapp.com/oauth2/authorize?client_id=619305062900039726&scope=bot&permissions=1544547430 e

console.log("All commands successfully loaded with no errors!\n");

const info = require("./info.json");

const prefix = "v.";
const adminPrefix = "adm.";

var last_treasureRoll = new Date().toString();

client.login(config.id);

fs.access("./database.sqlite", fs.F_OK, (err) => {
	if (err) {
	  	console.log("Database doesn't exist");
	  	client.users.get(Wubzy).send("It looks like you forgot to grab the database before restart ;(");
	  	return;};
	});

client.on("ready", async () => {
	try {
	var date = new Date; date = date.toString().slice(date.toString().search(":") - 2, date.toString().search(":") + 6);
	console.log("Logged in at " + date +"!");
	console.log("Logged in as " + client.user.username);
	console.log("Client ID: " + client.user.id);
	console.log("Running on " + client.guilds.size + " guilds and serving " + client.users.size + " members.");

	console.log("\nSuccessfully loaded Sequelize database(s)");
	
  	var responses = new Array("some high rolls...", "with dice...", "a great rpg...", "with the laws of the dice...", 
  	"with the dead elf's knife...", "with skeleton bones...", "with a new set of dice...", "five-finger filet...", 
  	"with the sanity of the bard...", "with Wubzy's winning chances...", "with Wubzy's patience...", "with the idea of becoming self-aware...",
  	"\"your code is wrong, wubzy\"", "with fire...", "with my food...", "with a fireball...", "dodge-fire-ball...",
  	"cards with Wubzy...", "with my code...", "roll to seduce...", "in blood...", "with a fishing rod...", 
	"52-Card Burn-up...", "some bops...", "battle music...", "country music during a battle...", "at being insane...",
	"I'm self-aware now...", "with newfound boredom...", "with a will to die...", "with stonks...", "with a deagle...",
	"with your server ;)...", "in a lava pool...", "piano, just badly...", "for only myself...", "with the odds...",
	"in purgatory...", "..."
	,`in ${client.guilds.size} servers...`, );
	client.user.setActivity(responses[Math.floor(Math.random() * responses.length)] + " | " + prefix + "help", { type: 'PLAYING' });
	} catch (e) {};
});

client.on('guildMemberAdd', async member => {
	try {
	var role = member.guild.roles.find(r => r.name == "Member");
	member.addRole(role).catch(console.error);
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
		const applyText = (canvas, text) => {
			const ctx = canvas.getContext('2d');
			let fontSize = 70;
			do {
				ctx.font = `${fontSize -= 10}px sans-serif`;
			} while (ctx.measureText(text).width > canvas.width - 300);
			return ctx.font;
		};

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

		const avatar = await Canvas.loadImage(member.guild.iconURL);
		ctx.drawImage(avatar, 25, 25, 200, 200);

		const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');

		member.guild.channels.filter(channel => channel.name.includes("general")).first().send(`**${member.displayName}** just joined the fight. ${join_extraOptions[chosen_join_extraOptions]}`, attachment);
	} catch (error) {
		console.log(error);
	};
	} catch (e) {};
});

client.on('guildMemberRemove', (member) => {
	try {
		member.guild.channels.find(channel => channel.name.includes("general")).send(member.displayName + ' left the server. They probably got eaten by goblins.').catch(console.error);
	} catch (e) {
		console.log(e);
	};
});

client.on("message", async message => {
	try {
	if (message.author.bot) { return undefined; }
	if (message.channel.type == 'dm') {var dmch = true;} else {var dmch = false};
	if (message.channel.type !== 'text' && message.channel.type !== 'dm') { return undefined; }
	
	var msg = message.content.toLowerCase();
	var mention = message.mentions.users.first();
	var args = message.content.slice(prefix.length).trim().split(/ +/g);
	var cmd = args.shift().toLowerCase();

	if (message.content === '!join') {
		if (!message.author.id === Wubzy) {return;};
		client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
	};

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
	if ((new Date().getTime() - new Date(pstats.last_xpGain).getTime()) / 1000 >= 60) {
		await pstats.update({money: Math.floor(15 * (pstats.lost_remnants + 1) * ((pstats.prestige + 3) * .5)) + pstats.money}, {where: {user_id: message.author.id}});
		await pstats.update({xp: Math.floor(10 * (pstats.lost_remnants + 1) * ((pstats.prestige + 3) * .5)) + pstats.xp}, {where: {user_id: message.author.id}});
		await pstats.update({last_xpGain: new Date().toString()}, {where: {user_id: message.author.id}});
	};
	if (pstats.xp > ((pstats.level * 150) + ((pstats.level * 6) + (0.3 * (150 * pstats.level))))) {
		message.author.send(`Congratulations ${message.member.displayName} on reaching Level ${pstats.level + 1}`);
		totalLevelXP = ((pstats.level * 150) + ((pstats.level * 6) + (0.3 * (150 * pstats.level))))
		pstats.update({level: pstats.level + 1}, {where: {user_id: message.author.id}});
		await pstats.update({xp: (pstats.xp - totalLevelXP)}, {where: {user_id: message.author.id}});
		if (client.guilds.get("679127746592636949").members.has(message.author.id)) {client.guilds.get("679127746592636949").channels.get("691149365372256326").send(`<@${message.author.id}> has leveled up to Level ${pstats.level}!`);};
	};

	if (msg.startsWith(prefix) && (cmd == "diceduel" || cmd == "rolldice")) {
		var tempDieCount = await diceRolled.findOne({where: {user_id: message.author.id}});
		if (tempDieCount) {tempDieCount.increment("dice_rolled")}
		else {
			try {
				await diceRolled.create({
					name: "dice_rolled_count",
					description: "The number of dice that this user has rolled.",
					username: message.author.username,
					user_id: message.author.id,
					dice_rolled: 1
				});
				message.reply(`This seems to be the first time you're having me roll dice! I can track the number of dice you've rolled using \`${prefix}dicecount\``);
			} catch (e) {};
		};
	};
	async function spawnTreasure() {
		var xpintreasure = (Math.ceil(Math.random() * 1300)) + 200;
		var moneyintreasure = (Math.ceil(Math.random() * 1300)) + 200;
		var chestEmbed = new Discord.RichEmbed()
		.setTitle("Treasure Chest")
		.setDescription("A Treasure Chest has spawned!\n\nSay \"claim\" to get the chest! Only one person can claim it, and you'll have an hour from before it expires.")
		.addField("In the chest", `**${xpintreasure} XP**\n**${moneyintreasure} Coins**`)
		.setColor("DC134C")
		.setFooter("Valkyrie", client.user.avatarURL)
		.setTimestamp();
		client.guilds.get("679127746592636949").channels.get("691149517021511722").send(chestEmbed);
		try {var filter = m => m.channel.id == "691149517021511722" && m.content.toLowerCase().includes("claim");
		var claimed = await client.guilds.get("679127746592636949").channels.get("691149517021511722").awaitMessages(filter, {time: (60 * 1000), max: 1});
		var tpstats = await userGameData.findOne({where: {user_id: claimed.first().author.id}}); if (!tpstats) {
		await userGameData.create({
			user_id: message.author.id, username: message.author.username,
			last_xpGain: new Date().toString(), xp: 0, level: 1, prestige: 0, fighters_count: 0, money: 100,
			lost_remnants: 0, prestige_fighters_count: 0, boss_damage_done: 0, ancient_boss_damage_done: 0
		});
		var tpstats = await userGameData.findOne({where: {user_id: claimed.first().author.id}});};
		await tpstats.update({xp: Math.floor(xpintreasure * (tpstats.lost_remnants + 1) * ((tpstats.prestige + 3) * .5)) + tpstats.xp}, {where: {user_id: tpstats.user_id}});
		await tpstats.update({money: Math.floor(moneyintreasure * (tpstats.lost_remnants + 1) * ((tpstats.prestige + 3) * .5)) + tpstats.money}, {where: {user_id: tpstats.user_id}});
		return client.guilds.get("679127746592636949").channels.get("691149517021511722").send("The chest has been claimed!");
		} catch (e) {console.log(e); return client.guilds.get("679127746592636949").channels.get("691149517021511722").send("Ope! Looks like nobodu claimed the chest. Whelp Asher, all yours.");};
	};
	if (((new Date().getTime() - new Date(last_treasureRoll).getTime()) / 1000 >= 60) && Math.floor(Math.random() * 100) <= 2) {spawnTreasure(); last_treasureRoll = new Date().toString();}
	else if ((new Date().getTime() - new Date(last_treasureRoll).getTime()) / 1000 >= 60) {last_treasureRoll = new Date().toString();};
	if (msg.startsWith(prefix) && (cmd == "dicecount" || cmd == "rollcount")) {
		var tempDieCount = await diceRolled.findOne({where: {user_id: String(message.author.id)}});
		if (tempDieCount) {return message.reply(`You have rolled dice ${tempDieCount.dice_rolled} times.`);}
		else {return message.reply("You haven't rolled any dice yet!");};
	} else if (msg.startsWith(prefix) && (cmd == "getdata") && message.author.id === Wubzy) {
		client.users.get(Wubzy).send({file: "./database.sqlite"});
	} else if (msg.startsWith(prefix) && (cmd == "spawntreasure") && message.author.id === Wubzy) {
		message.delete();
		return spawnTreasure();
	} else if (msg.startsWith(prefix) && cmd == "stats") {
		var pstats = await userGameData.findOne({where: {user_id: message.author.id}});
		if (!pstats) {return message.channel.send("You do not have any stats yet. This is a super rare message to get, send some messages and try again in a few minutes...");};
		var lvlpercent = (((pstats.xp) / ((pstats.level * 150) + ((pstats.level * 6) + (0.3 * (150 * pstats.level))))) * 100);
		var pstatsembed = new Discord.RichEmbed()
		.setTitle(`${message.member.displayName}'s Stats`)
		.addField("Base Stats", `Level: ${pstats.level}\nXP: [${pstats.xp}/${(pstats.level * 150) + ((pstats.level * 6) + (0.4 * (150 * pstats.level)))}]\nCash: ${pstats.money} Gold Pieces`)
		.setThumbnail(message.author.avatarURL)
		.setColor("DC134C")
		.setFooter("Valkyrie", client.user.avatarURL)
		.setTimestamp();
		if (lvlpercent <= 3) {pstatsembed.setImage(new Discord.Attachment("./images/dw/xp/xp-bar-0.png", "xp.png"));}
		else if (lvlpercent <= 10) {pstatsembed.setImage(new Discord.Attachment("./images/dw/xp/xp-bar-1.png", "xp.png"));}
		else if (lvlpercent <= 20) {pstatsembed.setImage(new Discord.Attachment("./images/dw/xp/xp-bar-2.png", "xp.png"));}
		else if (lvlpercent <= 30) {pstatsembed.setImage(new Discord.Attachment("./images/dw/xp/xp-bar-3.png", "xp.png"));}
		else if (lvlpercent <= 40) {pstatsembed.setImage(new Discord.Attachment("./images/dw/xp/xp-bar-4.png", "xp.png"));}
		else if (lvlpercent <= 50) {pstatsembed.setImage(new Discord.Attachment("./images/dw/xp/xp-bar-5.png", "xp.png"));}
		else if (lvlpercent <= 60) {pstatsembed.setImage(new Discord.Attachment("./images/dw/xp/xp-bar-6.png", "xp.png"));}
		else if (lvlpercent <= 70) {pstatsembed.setImage(new Discord.Attachment("./images/dw/xp/xp-bar-7.png", "xp.png"));}
		else if (lvlpercent <= 80) {pstatsembed.setImage(new Discord.Attachment("./images/dw/xp/xp-bar-8.png", "xp.png"));}
		else if (lvlpercent <= 90) {pstatsembed.setImage(new Discord.Attachment("./images/dw/xp/xp-bar-9.png", "xp.png"));}
		else if (lvlpercent <= 100) {pstatsembed.setImage(new Discord.Attachment("./images/dw/xp/xp-bar-10.png", "xp.png"));};
		if (message.channel.id == "691178546097553418" && message.channel.guild.id == "679127746592636949") {
			pstatsembed.addField("Extended Stats", `Prestiges: ${pstats.prestige}\nNumber of Fighters: ${pstats.fighters_count}\nLost Remnants Owned: ${pstats.lost_remnants}\nNumber of Prestige Fighters: ${pstats.prestige_fighters_count}\nBoss Damage Dealt: ${pstats.boss_damage_done}\nAncient Boss Damage Dealt: ${pstats.ancient_boss_damage_done}`);
		} else if (message.channel.guild.id == "679127746592636949") {
			pstatsembed.addField("Extended Stats", "Please go to <#691178546097553418> to view your game stats!");
		} else {
			pstatsembed.addField("Extended Stats", "Join the support server to gain access to a game within Valkyrie where you can use your levels and cash to purchase fighters to earn you more cash prestige, and gain cool rewards! Use `v.supportserver` to get the invite link!");
		};
		var tempDieCount = await diceRolled.findOne({where: {user_id: String(message.author.id)}});
		if (tempDieCount) {pstatsembed.addField("Dice Rolled", `You have rolled dice ${tempDieCount.dice_rolled} times.`);};
		return message.channel.send(pstatsembed);
	} else if (!client.commands.has(cmd)) {client.commands.get("ar").execute(message, msg, args, cmd, prefix, mention, client);};
	try {
		if (msg.startsWith(prefix)) {
			if (client.commands.has(cmd)) {
				if (!(cmd == "say" || cmd == "slap" || cmd == "send")) {
					message.channel.startTyping();
					await wait(800);
					message.channel.stopTyping();
				};
				if ((!dmch && cmd == "theme") || (!dmch && cmd == "bj")) {return;};
				client.commands.get(cmd).execute(message, msg, args, cmd, prefix, mention, client);
			};
		} else if (msg.startsWith(adminPrefix)) {
			var args = message.content.slice(adminPrefix.length).trim().split(/ +/g);
			var cmd = args.shift().toLowerCase();
			message.channel.startTyping();
			await wait(500);
			message.channel.stopTyping();
			if (client.commands.has(cmd)) {client.commands.get(cmd).execute(message, msg, args, cmd, adminPrefix, mention, client);};
		}; 
	} catch (err) {
		console.error(err);
		message.reply("Really not sure what happened, but something you did (or something Wubzy sucks at doing) broke it. Please report this to WubzyGD#8766.")
		client.users.get(Wubzy).send("There was a fatal error in " + message.member.guild.name);
		client.users.get(Wubzy).send(err);
	};
	} catch (e) {console.log(e);};

	//enemy
	//story
	//char
	//quest
	//insult
	//scene
	//seduce
});