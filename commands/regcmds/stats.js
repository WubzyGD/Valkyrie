const Discord = require("discord.js");
const Canvas = require("canvas");
const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const diceRolled = sequelize.import("../../models/dicerolled");
const userGameData = sequelize.import("../../models/usergamedata");

const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');
	let fontSize = 70;
	do {
		ctx.font = `${fontSize -= 10}px sans-serif`;
	} while (ctx.measureText(text).width > canvas.width - 300);
	return ctx.font;
};

module.exports = {
    name: "stats",
    description: "",
    async execute(message, msg, args, cmd, prefix, mention, client) {
        var e = process.argv.includes('--force') || process.argv.includes('-f');
		sequelize.sync({force: e}).then(async () => {}).catch(console.error);
		if (mention) {var pstats = await userGameData.findOne({where: {user_id: mention.id}}); if (!pstats) {return message.reply("That user doesn't seem to have any stats!");};}
        else {var pstats = await userGameData.findOne({where: {user_id: message.author.id}});};
		try {if (!pstats) {return message.channel.send("You do not have any stats yet. This is a super rare message to get, send some messages and try again in a few minutes...");};
		if (pstats.xp == 0) {var lvlpercent = 0;}
		else {var lvlpercent = (((pstats.xp) / ((pstats.level * 100) + ((pstats.level * 6) + (0.3 * (100 * pstats.level))))) * 100);};

		if (!mention) {var person = message.member;} else {var person = message.member.guild.members.cache.get(mention.id);};

		const canvas = Canvas.createCanvas(700, 250);
		const ctx = canvas.getContext('2d');
		const background = await Canvas.loadImage('./wallpaper.jpg');
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
		ctx.strokeStyle = '#74037b';
		ctx.strokeRect(0, 0, canvas.width, canvas.height);
		ctx.font = '28px sans-serif';
		ctx.fillStyle = '#ffffff';
		ctx.fillText(`Level ${pstats.level} | [${pstats.xp}/${((pstats.level * 100) + ((pstats.level * 6) + (0.3 * (100 * pstats.level))))}]`, canvas.width / 2.5, canvas.height / 3.5);
		ctx.font = applyText(canvas, person.displayName);
		ctx.fillStyle = '#ffffff';
		ctx.fillText(person.displayName, canvas.width / 2.5, canvas.height / 1.8);
		if (lvlpercent <= 3) {var xpbar = await Canvas.loadImage("./images/dw/xp/xp-bar-0.png");} else if (lvlpercent <= 10) {var xpbar = await Canvas.loadImage("./images/dw/xp/xp-bar-1.png");} else if (lvlpercent <= 20) {var xpbar = await Canvas.loadImage("./images/dw/xp/xp-bar-2.png");} else if (lvlpercent <= 30) {var xpbar = await Canvas.loadImage("./images/dw/xp/xp-bar-3.png");} else if (lvlpercent <= 40) {var xpbar = await Canvas.loadImage("./images/dw/xp/xp-bar-4.png");} else if (lvlpercent <= 50) {var xpbar = await Canvas.loadImage("./images/dw/xp/xp-bar-5.png");} else if (lvlpercent <= 60) {var xpbar = await Canvas.loadImage("./images/dw/xp/xp-bar-6.png");} else if (lvlpercent <= 70) {var xpbar = await Canvas.loadImage("./images/dw/xp/xp-bar-7.png");} else if (lvlpercent <= 80) {var xpbar = await Canvas.loadImage("./images/dw/xp/xp-bar-8.png");} else if (lvlpercent <= 90) {var xpbar = await Canvas.loadImage("./images/dw/xp/xp-bar-9.png");} else if (lvlpercent >= 90) {var xpbar = await Canvas.loadImage("./images/dw/xp/xp-bar-10.png");}
		else {return message.reply("Yeah chief it seems Wubzy is an idiot. He also probably alredy knows that this is a problem, so give him a bit to fix it. Gaining a bit more xp could help.");};
		ctx.drawImage(xpbar, canvas.width / 2.5, canvas.height / 1.5, (canvas.width / 2.2) - 5, (canvas.height / 1.5) - 100);
		ctx.beginPath();
		ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.clip();
		const avatar = await Canvas.loadImage(client.users.cache.get(person.id).avatarURL({format: "png", dynamic: false, size: 2048}));
		ctx.drawImage(avatar, 25, 25, 200, 200);

		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'user-stats.png');

		var pstatsembed = new Discord.MessageEmbed()
		.setTitle(`${person.displayName}'s Stats`)
		.addField("Base Stats", `Level: ${pstats.level}\nXP: [${pstats.xp}/${(pstats.level * 100) + ((pstats.level * 6) + (0.3 * (100 * pstats.level)))}]\nCash: ${pstats.money} Gold Pieces`)
		.setThumbnail(client.users.cache.get(person.id).avatarURL())
		.setColor("DC134C")
		.setFooter("Valkyrie", client.user.avatarURL())
		.setTimestamp();

		if (message.channel.id == "691178546097553418" && message.channel.guild.id == "679127746592636949") {
			pstatsembed.addField("Extended Stats", `Prestiges: ${pstats.prestige}\nNumber of Fighters: ${pstats.fighters_count}\nLost Remnants Owned: ${pstats.lost_remnants}\nNumber of Prestige Fighters: ${pstats.prestige_fighters_count}\nBoss Damage Dealt: ${pstats.boss_damage_done}\nAncient Boss Damage Dealt: ${pstats.ancient_boss_damage_done}`);
		} else if (message.channel.guild.id == "679127746592636949") {
			pstatsembed.addField("Extended Stats", "Please go to <#691178546097553418> to view your game stats!");
		} else {
			pstatsembed.addField("Extended Stats", "Join the support server to gain access to a game within Valkyrie where you can use your levels and cash to purchase fighters to earn you more cash prestige, and gain cool rewards! Use `v.supportserver` to get the invite link!");
		};
		var tempDieCount = await diceRolled.findOne({where: {user_id: String(person.id)}});
		if (tempDieCount) {pstatsembed.addField("Dice Rolled", `You have rolled dice ${tempDieCount.dice_rolled} times.`);};
		if (args[0] == "image") {return message.channel.send(attachment);};
		if (args[0] == "leaderboard" || args[0] == "l") {
			if (message.channel.type != "text") {return;};
			var users = {};
			await message.guild.members.cache.forEach(async m => {
				var ps = await userGameData.findOne({where: {user_id: m.id}});
				if (ps != undefined && ps != null) {users[m.id] = ps;};
			});
			console.log(users);
			return message.channel.send(Object.keys(users).length);
		};
        return message.channel.send(pstatsembed);} catch (e) {console.log(e);};
    }
};