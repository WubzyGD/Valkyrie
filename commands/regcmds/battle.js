const Discord = require("discord.js");

const itemIndex = require("../../itemIndex.json");
const items = {"weapons": itemIndex.weapons, "armor": itemIndex.armor};

var rarityColors = {
    "Scrap": "7B3C3C",
    "Common": "A0A0A0",
    "Uncommon": "1AB21F",
    "Rare": "2F8FD1",
    "Legendary": "8E14D9",
    "Exotic": "EDBE20",
    "Exalted": "F6FF69",
};

function wait(time) {
return new Promise(function (resolve) {setTimeout(function() {resolve("anything");}, time
);});};

function makeHDStr(weapon) {
	var hitDice = "";
    var hitDiceMod = 0;
    for (i of weapon.hitDice) {if (i.startsWith("d")) {var hasDice = true;};};
    if (hasDice) {
        for (i = 0; i < weapon.hitDice.length; i++) {
            t = weapon.hitDice[i];
            if (t.startsWith("d")) {hitDice += `${t}, `;}
			else {hitDiceMod += Number(t);};};}
	else {hitDice = "None  ";};
    hitDice = hitDice.slice(0, (hitDice.length - 2));
    if (hitDiceMod >= 0) {hitDiceMod = `+${hitDiceMod}`;} else {hitDiceMod = `-${hitDiceMod}`;};
	hitDice += `\n-Modifier: ${hitDiceMod}`;
	return hitDice
};

function getRar() {
var bRand = Math.ceil(Math.random() * 100);
if (bRand < 26) {return "Scrap";} else if (bRand > 25 && bRand < 46) {return "Common";}
else if (bRand > 45 && bRand < 65) {return "Uncommon";} else if (bRand > 64 && bRand < 80) {return "Rare";}
else if (bRand > 79 && bRand < 89) {return "Legendary";} else if (bRand > 88 && bRand < 97) {return "Exotic";}
else if (bRand > 96) {return "Exalted";};};

module.exports = {
    name: "battle",
    description: "",
    async execute(message, msg, args, cmd, prefix, mention, client) {
		if (!args.length) {return message.channel.send(`Syntax: ${prefix}battle create [@person]`);};
		var td = args[0];
		if (td == "create") {
			if (!mention) {
				var openBattle = await message.channel.send(`${message.member.displayName} has created an open battle game! Send \`battle accept @${message.member.displayName}\` to accept their battle. Make sure you don't use my prefix!`);
				var filter = m => m.content.toLowerCase().startsWith("battle accept") && m.mentions.members.first().id == message.author.id;
				var response = await message.channel.awaitMessages(filter, {time: 200000, max: 1});
				if (!response.first()) {openBattle.delete(); return message.reply("Nobody accepted your battle! Maybe try again, or mention someone?");};
				var p1 = message.member; var p2 = message.member.guild.members.get(response.first().author.id);
			} else {
				var closedBattle = await message.channel.send(`${message.member.guild.members.get(mention.id).displayName}, you have been challenged to battle by ${message.member.displayName}! To accept, type \`battle accept @${message.member.displayName}\`, and do not use my prefix!`);
				var filter = m => m.content.toLowerCase().startsWith("battle accept") && m.author.id == message.mentions.members.first().id && m.mentions.members.first().id == message.author.id;
				var response = await message.channel.awaitMessages(filter, {time: 200000, max: 1});
				if (!response.first()) {closedBattle.delete(); return message.reply("Nobody accepted your battle! Maybe try again?");};
				var p1 = message.member; var p2 = message.member.guild.members.get(response.first().author.id);
			};
			var coin = Math.ceil(Math.random() * 2);
			if (coin == 1) {
				var coin = "Tails";
				var thumb = "https://cdn.discordapp.com/attachments/563198656241598484/655514881293811753/SmartSelect_20191214-140131_Samsung_Internet.jpg";
			} else {
				var coin = "Heads";
				var thumb = "https://cdn.discordapp.com/attachments/563198656241598484/655514893033799700/SmartSelect_20191214-140108_Samsung_Internet.jpg";
			};
			if (coin == "Tails") {var first = p2;} else {var first = p1;};
			var coinflipEmbed = new Discord.RichEmbed()
			.setTitle("Coinflip to decide the first player...")
			.setThumbnail(thumb)
			.addField("Coin Flip", `Result: \`${coin}\``)
			.addField("The first player is", `**${first.displayName}**`)
			.setFooter("Valkyrie", client.user.avatarURL)
			.setColor("DC134C")
			.setTimestamp();
			var coinFlipMsg = await message.channel.send(coinflipEmbed); coinFlipMsg.delete(10000);
			var game = await message.channel.send("The game has started!");
			var p1n = p1.displayName; var p2n = p2.displayName;
			var players = {};
			players[p1n] = {
				"weapon": null,
				"hp": 100,
				"armor": null,
			};
			players[p2n] = {
				"weapon": null,
				"hp": 100,
				"armor": null,
			};
			players[p1n].weapon = items.weapons.Scrap[0];
			players[p2n].weapon = items.weapons.Scrap[0];
			players[p1n].armor = items.armor.Scrap[2].pieces[Math.floor(Math.random() * items.armor.Scrap[2].pieces.length)];
			players[p2n].armor = items.armor.Scrap[2].pieces[Math.floor(Math.random() * items.armor.Scrap[2].pieces.length)];
			var lastTurn = "There have been no turns yet.";
			async function turn(p) {
				console.log(`${p.displayName} has started their turn.`);
				var inst = `React to this message with a :crossed_swords: to attack the other player, and react to it with a :fish: to get better materials. Or, react to it with an :x: to just be a plain coward and get oofed instantly.`;
				var battleEmbed = new Discord.RichEmbed()
				.setAuthor("1v1 Duel", client.users.get(p.id).avatarURL)
				.setDescription(`${p1n} vs ${p2n}`)
				.addField("Turn", `It is currently ${p.displayName}'s turn.\n\n${inst}`)
				.addField("In the last turn...", lastTurn)
				.addField("Current Stats", `**__${p1.displayName}__**\n\n**Health**: ${players[p1n].hp}/100 HP\n__**Weapon**__: ${players[p1n].weapon.name}\n**Rarity**: ${players[p1n].weapon.rarity}\n**Hit Dice**: ${makeHDStr(players[p1n].weapon)}\n**__Armor__**: ${players[p1n].armor.name}\n**Rarity**: ${players[p1n].armor.rarity}\n**Defense**: ${players[p1n].armor.defense}`)
				.addField("Current Stats", `**__${p2.displayName}__**\n\n**Health**: ${players[p2n].hp}/100 HP\n__**Weapon**__: ${players[p2n].weapon.name}\n**Rarity**: ${players[p2n].weapon.rarity}\n**Hit Dice**: ${makeHDStr(players[p2n].weapon)}\n**__Armor__**: ${players[p2n].armor.name}\n**Rarity**: ${players[p2n].armor.rarity}\n**Defense**: ${players[p2n].armor.defense}`)
				.setColor("DC134C").setFooter("Valkyrie").setTimestamp();
				await game.edit(battleEmbed);
				await game.clearReactions();
				await game.react("⚔️"); await game.react("🐟"); await game.react("❌");
				await wait(200);

				async function attack() {
					var hitDiceO = players[p.displayName].weapon.hitDice;
					var hitDice = [];
					var hitDiceMod = 0;
					for (i of hitDiceO) {if (i.startsWith("d")) {var hasDice = true;};};
					if (hasDice) {
						for (i = 0; i < hitDiceO.length; i++) {
							t = hitDiceO[i];
							if (t.startsWith("d")) {hitDice.push(t);}
							else {hitDiceMod += Number(t);};};};
					var dmg = 0;
					for (i of hitDice) {dmg += Math.ceil(Math.random() * Number(i.slice(1).trim()));};
					dmg += hitDiceMod;
					if (p == p1) {
						var defense = players[p2n].armor.defense; 
						dmg -= defense; 
						if (dmg <= 0) {dmg = 0;};
						players[p2n].hp -= dmg;
					} else {
						var defense = players[p1n].armor.defense;
						dmg -= defense;
						if (dmg <= 0) {dmg = 0;};
						players[p1n].hp -= dmg;
					};
					lastTurn = `${p.displayName} attacked using **${players[p.displayName].weapon.name}**, dealing ${dmg} Damage.`;
					if (players[p.displayName].hp <= 0) {if(p==p1){win(p2);}else{win(p1);};};
					if (players[p.displayName].hp > 100) {players[p.displayName].hp = 100};
					if (p == p1) {turn(p2);} else {turn(p1);};
				};

				async function find() {
					var begdec = ["weapons", "armor", "heal"]; begdec = begdec[Math.floor(Math.random() * begdec.length)];
					if (begdec == "weapons") {
						var rarity = items.weapons[getRar()];
						var nweapon = rarity[Math.floor(Math.random() * rarity.length)];
						var cweapon = players[p.displayName].weapon;
						
						var oldWeaponEmbed = new Discord.RichEmbed()
						.setTitle(`${p.displayName}'s Old Weapon`)
						.setDescription(`**Name**: ${cweapon.name}\n\n**Rarity**: ${cweapon.rarity}\n${makeHDStr(cweapon)}`)
						.setColor(rarityColors[cweapon.rarity]);
						var newWeaponEmbed = new Discord.RichEmbed()
						.setTitle(`${p.displayName}'s New Weapon`)
						.setDescription(`**Name**: ${nweapon.name}\n\n**Rarity**: ${nweapon.rarity}\n${makeHDStr(nweapon)}`)
						.setColor(rarityColors[nweapon.rarity]);

						var gatherQuery1 = await message.channel.send(oldWeaponEmbed);
						gatherQuery1.delete(200000);
						var gatherQuery = await message.channel.send(newWeaponEmbed);
						var gatherQuery2 = await message.channel.send("React to this message to confirm/deny that you want/don't want the weapon you just got!");
						gatherQuery2.delete(200000);
					} else if (begdec == "armor") {
						var rarity = items.armor[getRar()];
						var set = rarity[Math.floor(Math.random() * rarity.length)];
						var narmor = set.pieces[Math.floor(Math.random() * set.pieces.length)];
						var carmor = players[p.displayName].armor;

						var oldArmorEmbed = new Discord.RichEmbed()
						.setTitle(`${p.displayName}'s Old Armor`)
						.setDescription(`**Name**: ${carmor.name}\n\n**Rarity**: ${carmor.rarity}\n**Defense**: ${carmor.defense}`)
						.setColor(rarityColors[carmor.rarity]);
						var newArmorEmbed = new Discord.RichEmbed()
						.setTitle(`${p.displayName}'s New Armor`)
						.setDescription(`**Name**: ${narmor.name}\n\n**Rarity**: ${narmor.rarity}\n**Defense**: ${narmor.defense}\n**Set Name**: ${set.name}`)
						.setColor(rarityColors[narmor.rarity]);

						var gatherQuery1 = await message.channel.send(oldArmorEmbed);
						gatherQuery1.delete(200000);
						var gatherQuery = await message.channel.send(newArmorEmbed);
						var gatherQuery2 = await message.channel.send("React to this message to confirm/deny that you want/don't want the armor you just got!");
						gatherQuery2.delete(200000);
					} else if (begdec == "heal") {
						var oldHealth = players[p.displayName].hp;
						var healthPot = ["Greater", "Standard", "Lesser"]; healthPot = healthPot[Math.floor(Math.random() * healthPot.length)];
						var du = false;
						if (healthPot == "Greater" && players[p.displayName].hp > 17) {
							var bubble = Math.floor(Math.random() * 35);
							players[p.displayName].hp += ((players[p.displayName].hp - 17) + bubble);
						} else if (healthPot == "Standard") {
							var bubble = Math.floor(Math.random() * 21);
							players[p.displayName].hp += ((players[p.displayName].hp - 10) + bubble);
						} else if (healthPot == "Lesser") {
							var bubble = Math.floor(Math.random() * 11);
							players[p.displayName].hp += ((players[p.displayName].hp - 5) + bubble);
						} else {du = true; lastTurn = `${p.displayName} fished a ${healthPot} Healing Potion, but could not use it because the potential health loss is greater than the health they have.`};
						if (!du) {lastTurn = `${p.displayName} fished a ${healthPot} Healing Potion and used it to heal ${players[p.displayName].hp - oldHealth}HP, leaving them at ${players[p.displayName].hp}HP.`;};
						if (players[p.displayName].hp <= 0) {if(p==p1){win(p2);}else{win(p1);};};
						if (players[p.displayName].hp > 100) {players[p.displayName].hp = 100};
						if (p == p1) {turn(p2);} else {turn(p1);};
					} else {throw new SyntaxError("Wubzy sucks at coding. If he knew how to use sequelize there'd be a counter here.");};
					if (begdec !== "heal") {
						await gatherQuery.react("👍");
						await gatherQuery.react("👎");
						await wait(300);
						gatherQuery.delete(200000);
						var filter = filter = reaction => (reaction.emoji.name.includes("👍") || reaction.emoji.name.includes("👎")) && reaction.users.array()[1].id == p.id;
						var collector = await gatherQuery.createReactionCollector(filter, {time: 200000, maxMatches: 1});
						collector.on("collect", choice => {
							if (choice.emoji.name == "👍") {players[p.displayName].weapon = nweapon; lastTurn = `${p.displayName} fished an item and kept it!`}
							else if (choice.emoji.name == "👎") {lastTurn = `${p.displayName} fished an item and didn't keep it!`};
							gatherQuery.clearReactions();
							if (players[p.displayName].hp <= 0) {if(p==p1){win(p2);}else{win(p1);};};
							if (players[p.displayName].hp > 100) {players[p.displayName].hp = 100};
							if (p == p1) {turn(p2);} else {turn(p1);};
						});
						collector.on("end", collected => {
							if ((!collected.size) || collected.size == 0) {return message.channel.send("The battle ended becuase someone didn't take their turn ;-;");};
						});
					}
				};

				var filter = filter = reaction => (reaction.emoji.name.includes("⚔️") || reaction.emoji.name.includes("🐟") || reaction.emoji.name.includes("❌")) && reaction.users.array()[1].id == p.id;
				var collector = await game.createReactionCollector(filter, {time: 200000, maxMatches: 1});
				var choice;
				collector.on("collect", async collected => {
					console.log("collected");
					choice = collected.emoji.name;
					if (choice == "⚔️") {await attack();}
					else if (choice == "🐟") {await find();}
					else if (choice == "❌") {if(p==p1){await win(p2);}else{await win(p1);};};
				});
				collector.on("end", collected => {
					if ((!collected.size) || collected.size == 0) {return message.channel.send("The battle ended becuase someone didn't take their turn ;-;");};
				});
			};
			async function win(wpn) {
				var battleEmbed = new Discord.RichEmbed()
				.setAuthor("1v1 Duel", client.users.get(p.id).avatarURL)
				.setDescription(`${p1n} vs ${p2n}`)
				.addField("Winner", `The **winner** of the battle is **${p.displayName}**!`)
				.addField("In the last turn...", lastTurn)
				.setColor("DC134C").setFooter("Valkyrie").setTimestamp();
				return game.edit(battleEmbed);
			};
			turn(first);
		} else {return message.reply("Hmmmm, you might've typed something wrong, or used my prefix to do something in the battle when you weren't supposed to ;(");};
    }
};