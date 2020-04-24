const Discord = require("discord.js");
const Canvas = require("canvas");
const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const userGameData = sequelize.import("../../models/usergamedata");

module.exports = {
    name: "shop",
    description: "",
    async execute(message, msg, args, cmd, prefix, mention, client) {
        var e = process.argv.includes('--force') || process.argv.includes('-f');
        sequelize.sync({force: e}).then(async () => {}).catch(console.error);
        if (message.channel.id !== "691149309755916370") {return message.delete();};
		message.delete();
		if (!args.length) {var mr = await message.channel.send(`Syntax: \`${prefix}shop <fighter|f|prestigefighter|pf>\` or use \`${prefix}shop display\` to view your prices. **The shop does not have a purchase confirmation. If you use a buy command with sufficient funds, the items will be purchased.**`); return mr.delete(20000);};
		if (!pstats) {var mr = await message.reply("Hmm, it looks like you aren't in my databse. Send some messages and try again in a few minutes?"); return mr.delete(20000);};
		if (pstats.fighters_count < 1) {var fighterCost = 500;}
		else {var fighterCost = (500 + Math.ceil((pstats.fighters_count * 110) ** 1.05));};
		if (pstats.prestige_fighters_count < 1) {var pfcost = 5;}
		else {var pfcost = (5 + Math.ceil((pstats.prestige_fighters_count * 10) ** 1.25));};
		if (args[0] == "fighter" || args[0] == "f") {
			if (fighterCost > pstats.money) {var mr = await message.reply(`You don't have Gold enough for that! (\`${pstats.money}\`/\`${fighterCost}\`)`); return mr.delete(20000);};
			await userGameData.update({fighters_count: pstats.fighters_count + 1}, {where: {user_id: message.author.id}});
			await userGameData.update({money: pstats.money - fighterCost}, {where: {user_id: message.author.id}});
			var mr = await message.reply("Fighter bought!"); mr.delete(20000);
			pstats = await userGameData.findOne({where: {user_id: message.author.id}});
			await userGameData.update({xp: Math.floor(100 * (pstats.lost_remnants + 1) * ((pstats.prestige + 2) * .5)) + pstats.xp}, {where: {user_id: message.author.id}});
			return message.author.send(`Purchase receipt:\n\n(This is mainly for debugging purposes. It will likely be removed in the future.)\n\nPurchased: 1 Fighter\nSpent: ${fighterCost}\nMoney left: ${pstats.money}\nFighter Count: ${pstats.fighters_count}`);
		} else if (args[0] == "prestigefighter" || args[0] == "pf") {
			if (pfcost > pstats.lost_remnants) {var mr = await message.reply(`You don't have enough Lost Remnants for that! (\`${pstats.lost_remnants}\`/\`${pfcost}\`)`); return mr.delete(20000);};
			await userGameData.update({prestige_fighters_count: pstats.prestige_fighters_count + 1}, {where: {user_id: message.author.id}});
			await userGameData.update({lost_remnants: pstats.lost_remnants - pfcost}, {where: {user_id: message.author.id}});
			var mr = await message.reply("Prestige Fighter bought!"); mr.delete(20000);
			await userGameData.update({xp: Math.floor(500 * (pstats.lost_remnants + 1) * ((pstats.prestige + 2) * .5)) + pstats.xp}, {where: {user_id: message.author.id}});
			pstats = await userGameData.findOne({where: {user_id: message.author.id}});
			return message.author.send(`Purchase receipt:\n\n(This is mainly for debugging purposes. It will likely be removed in the future.)\n\nPurchased: 1 Prestige Fighter\nSpent: ${pfcost}\nLost Remnants left: ${pstats.lost_remnants}\nFighter Count: ${pstats.prestige_fighters_count}`);
		} else if (args[0] == "display" || args[0] == "d") {
			var mr = await message.reply(`Your fighters cost ${fighterCost} Gold. Your prestige fighters cost ${pfcost} Lost Remnants.`);
			return mr.delete(20000);
        } else {var mr = await message.reply(`Syntax: \`${prefix}shop <fighter|f|prestigefighter|pf>\` or use \`${prefix}shop display\` to view your prices.`); return mr.delete(20000);};
    }
};