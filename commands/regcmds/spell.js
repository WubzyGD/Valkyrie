const Discord = require("discord.js");

module.exports = {
    name: "spell",
    description: "",
    async execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`Yeah that's wrong :(. Syntax: \`${prefix}spell <list|info|cast|create> <name>\``)};
		function defSpells(name, type, hitType, hitTypeInt, mana, dice, range, description, castText, origin, otherStats, difficulty, altNames, made) {
			var spellInfo = new Discord.MessageEmbed()
			.setTitle(name)
			.setDescription(`Cassliamastro's Magic and Monsters - Vol. 2`)
			.addField("Name", name)
			.addField("Description", description)
			.addField("Spell Type/Elemental", type)
			.addField("Hit and Hit Type", `${hitType} | ${hitTypeInt}`)
			.addField("Mana", mana)
			.addField("Hit Dice", dice)
			.addField("Range", `${range}ft`)
			.addField("Origin", origin)
			.addField("Other Info", otherStats)
			.addField("Difficulty", difficulty)
			.addField("Alternate Names", altNames)
			.addField("Credit", `Spell requested/made by ${made}.`)
			.addField(`Spell Info Card`, `Requested by ${message.member.displayName}`)
			.setColor("DC134C")
			.setFooter("Valkyrie", client.user.avatarURL())
			.setTimestamp();

			return({
				"name": name,
				"type": type,
				"hitType": hitType,
				"hitTypeInt": hitTypeInt,
				"mana": mana,
				"dice": dice,
				"range": range,
				"description": description,
				"castText": castText,
				"origin": origin,
				"otherStats": otherStats,
				"difficulty": difficulty,
				"altNames": altNames,
				"made": made,

				"embed": spellInfo,
				"spellInfo": spellInfo,
			});
		};

		var spells = {
			"fireball": defSpells("Fireball", "Fire", "Damage", 15, 20, ["d6", "d6"], 60,
			"Casts a fireball approximately 2 to 3 inches in diameter, which travels slowly towards its target. This spell is considered one of the easiest and most simple spells, taught often as a first spell to novice mages and even non-mage warriors.",
			"You focus on your enemy, remember your training, and watch as your hands glow orange, light on fire, then procure a bright ball of spewing flame, then you *fire* it from your hands, pun not intended.",
			"Unknown", "Deals 1d4 of burn damage if the enemy has no resistance to burn damage.", "Extremely Easy", 
			["Fireball", "Fire Ball", "Ball o' fire", "one big burnyboi"], "WubzyGD#8766"),
			"basic_heal": defSpells("Basic Heal", "Life/Light", "Regeneration", 20, 25, ["d20"], 20,
			"A simple spell taught often to beginner mage healers. The spell can slightly heal minor wounds, but won't necessarily save lives.",
			"Using your love for others, you close your eyes and invoke your power to regenerate your allies. Your hands glow greenish-blue, as does the wounds of the injured, which repair enough for your ally to stand.",
			"Elvin; Fairy Derived", "Heals for 1d20 + DEX Mod \n--DEX Mod / 2 if greater than 5\n--Rounds Down if divided\n\nCannot heal if healee is below 0HP\n--Instead adds 2 to AC for next 3 turns or until conscious",
			"Easy", ["Regeneration", "Basic Health Recovery", "Heal BooBoo", "A Band-Aid :)"], "WubzyGD#8766"),
			"wind_gust": defSpells("Wind Gust", "Wind", "Damage", 25, 35, ["d10", "d10", "d8"], 40,
			"An ancient art that uses the caster's strong emotions and desires, channeling that into their hands and sending it out in the form of a powerful gust of wind. The stronger the emotion put into it, the bigger the reaction. Another spell taught to novice-intermediate battle mages, it will be useful throughout a mage's career.",
			"You let yourself feel your desire to hit your enemy, and reach your hands out, sending a torrent of wind at them.",
			"Elvin-Human; Dwarf-Derived", "Deals 2d10 + 1d8 damage on impact\n--If the target hits an object < 20ft away, roll 1d6.",
			"Low-Intermediate", ["Gust of Wind", "big strong airboi", "hippity hoppity the wind is now my property"], "WubzyGD#8766"),
			"papa_murphy": defSpells("Papa Murphy's Krusty Krab Pizza", "Shadow", "Restoration", 69, 350, ["d20", "d8", "d8"], 120,
			"Creates one large pepperoni pizza; pepperoni not included. The spell's origin is unknown, nor is the \"Papa Murphy\" it references. Please use with caution. Warning, contents may be hot.",
			"A red glow evelops the caster as they offer their body and spirit to Papa Murphy, as he possesses their spirit, spinning a pizza and tossing it at their allies.",
			"Earth; The Italian Master Himself: Papa Murphy", "Caster must make a Dexterity saving throw, else they will fail the pizza and ultimately die.",
			"Master-Impossible", ["Create Pizza", "Spin Pizza", "honger satisfy", "one big hungeryboi", "hippity hoppity your hungery is now my property", "wanna sprite cranberry?"], "UsernameCopied707#1066")
		}
		if (msg.startsWith(`${prefix}spell list`)) {
			var spellList = "\n>>> `fireball`\n`basic heal`\n`wind gust`\n`papa murphy's pizza`";
			message.channel.send("Spells listed within Valkyrie's Spellbook are: " + spellList);
		} else if (msg.startsWith(`${prefix}spell info`)) {
			var parsing_spellName = msg.slice(prefix.length + 11);
			if ((parsing_spellName.includes("fire") || parsing_spellName.includes("flame")) && parsing_spellName.includes("ball")) {
				message.channel.send(spells.fireball.embed);
			} else if ((parsing_spellName.includes("basic") || parsing_spellName.includes("simple") || parsing_spellName.includes("easy")) && (parsing_spellName.includes("heal") || parsing_spellName.includes("regen") || parsing_spellName.includes("recover")) || parsing_spellName.includes("repair")) {
				message.channel.send(spells.basic_heal.embed);
			} else if (parsing_spellName.includes("wind") && parsing_spellName.includes("gust")) {
				message.channel.send(spells.wind_gust.embed);
			} else if (parsing_spellName.includes("pizza") && parsing_spellName.includes("murphy")) {
				message.channel.send(spells.papa_murphy.embed);
			} else {
				message.channel.send(`Ope! That's actually not a spell name. Try using \`${prefix}spell list\` to see a list of all valid spells.`);
			};
		} else if (msg.startsWith(`${prefix}spell cast`)) {
			var parsing_spellName = msg.slice(prefix.length + 11);
			if ((parsing_spellName.includes("fire") || parsing_spellName.includes("flame")) && parsing_spellName.includes("ball")) {
				var dice = spells.fireball.dice;
				var spellCast = {"name": spells.fireball.name, "castText": spells.fireball.castText, "type": spells.fireball.hitType};
			} else if ((parsing_spellName.includes("basic") || parsing_spellName.includes("simple") || parsing_spellName.includes("easy")) && (parsing_spellName.includes("heal") || parsing_spellName.includes("regen") || parsing_spellName.includes("recover")) || parsing_spellName.includes("repair")) {
				var dice = spells.basic_heal.dice;
				var spellCast = {"name": spells.basic_heal.name, "castText": spells.basic_heal.castText, "type": spells.basic_heal.hitType};
			} else if (parsing_spellName.includes("wind") && parsing_spellName.includes("gust")) {
				var dice = spells.wind_gust.dice;
				var spellCast = {"name": spells.wind_gust.name, "castText": spells.wind_gust.castText, "type": spells.wind_gust.hitType};
			} else if (parsing_spellName.includes("pizza") && parsing_spellName.includes("murphy")) {
				var dice = spells.papa_murphy.dice;
				var spellCast = {"name": spells.papa_murphy.name, "castText": spells.papa_murphy.castText, "type": spells.papa_murphy.hitType};
			} else {
				return(message.channel.send(`Ope! That's actually not a spell name. Try using \`${prefix}spell list\` to see a list of all valid spells.`));
			};
			var rollresults = "";
			var totalRoll = 0;
			for (i = 0; i < dice.length; i++) {
				var die = dice[i];
				var roll = Math.ceil(Math.random() * Number(die.slice(1)));
				rollresults += `${i + 1}. ${die} Roll: ${roll}\n`;
				totalRoll += roll;
			};
			message.channel.send(spellCast.castText);

			var castToSend = new Discord.MessageEmbed()
			.setTitle(`${spellCast.name} Cast`)
			.setDescription("Cassliamastro's Magic and Monsters - Vol. 2")
			.addField("Rolls", rollresults)
			.addField(spellCast.type, totalRoll)
			.addField("Caster", message.member.displayName)
			.setColor("DC134C")
			.setFooter("Valkyrie", client.user.avatarURL())
			.setTimestamp();
			
			message.channel.send(castToSend);
		} else if (msg.startsWith(`${prefix}spell create`)) {
			var parsing_spellName = message.content.slice(prefix.length + 13);
			if (!parsing_spellName.length) {
				var text = "You did not provide a name for your spell, so, let's give it a name!";
			} else {
				var text = `The name you provided was "${parsing_spellName}", but I want to make sure that that's really what you want, so, please tell me your spell's name.`;
			};
			message.channel.send("So, you want to make a spell! No worries, I can do that!\nHere's how it works: I'll ask you some questions, all you have to do is just reply in the same channel. Then, I'll deliver your spell straight to the creator, and then he can notify you if it gets accepted! If you want to cancel, type \"cancel123\" anywhere in your message.");
			try {
				var requestedSpell = {
					"name": "",
					"type": "",
					"hitType": "",
					"hitTypeInt": "",
					"mana": "",
					"dice": "",
					"range": "",
					"description": "",
					"castText": "",
					"origin": "",
					"otherStats": "",
					"difficulty": "",
					"altNames": "",
				};
				var filter = m => m.author.id === message.author.id
				var up1 = await message.reply("First: " + text)
				up1.delete({timeout: 20000})
				var test = await message.channel.awaitMessages(filter, {time: 200000, max: 1})
				requestedSpell.name = test.first().content
				var up2 = await message.reply(`You chose ${requestedSpell.name} for your spell name.`)
				var up3 = await message.reply("Now, describe your spell. What does it look like to cast, that kinda stuff.")
				up2.delete({timeout: 20000})
				up3.delete({timeout: 20000})
				var test = await message.channel.awaitMessages(filter, {time: 1000000, max: 1})
				requestedSpell.description = test.first().content
				var up4 = await message.reply(`Description: ${requestedSpell.description}`)
				up4.delete({timeout: 20000})
				var up5 = await message.reply("What type or elemental is your spell? E.g. Fire or Wind")
				up5.delete({timeout: 20000})
				var test = await message.channel.awaitMessages(filter, {time: 200000, max: 1})
				requestedSpell.type = test.first().content
				var up6 = await message.reply(`${requestedSpell.name} is type \`${requestedSpell.type}\`.`)
				var up7 = await message.reply("What does the spell do when it hits? E.g. Damage or Heal")
				up6.delete({timeout: 20000})
				up7.delete({timeout: 20000})
				var test = await message.channel.awaitMessages(filter, {time: 200000, max: 1})
				requestedSpell.hitType = test.first().content
				var up8 = await message.reply(`How much ${requestedSpell.hitType} will ${requestedSpell.name} do?`)
				up8.delete({timeout: 20000})
				var test = await message.channel.awaitMessages(filter, {time: 200000, max: 1})
				requestedSpell.hitTypeInt = test.first().content
				var up9 = await message.reply(`${requestedSpell.name} does ${requestedSpell.hitTypeInt} ${requestedSpell.hitType}.`)
				var up10 = await message.reply("And how much mana will that take?")
				up9.delete({timeout: 20000})
				up10.delete({timeout: 20000})
				var test = await message.channel.awaitMessages(filter, {time: 200000, max: 1})
				requestedSpell.mana = test.first().content
				var up11 = await message.reply("What dice do you need to roll for this spell? (You may opt to type \"skip\".)")
				up11.delete({timeout: 20000})
				var test = await message.channel.awaitMessages(filter, {time: 200000, max: 1})
				requestedSpell.dice = test.first().content
				var up12 = await message.reply("What is the spell's range, in feet?")
				up12.delete({timeout: 20000})
				var test = await message.channel.awaitMessages(filter, {time: 200000, max: 1})
				requestedSpell.range = test.first().content
				var up13 = await message.reply("What happens when you cast the spell? E.g. Your hands glow orange and send out a flaming ball.")
				up13.delete({timeout: 20000})
				var test = await message.channel.awaitMessages(filter, {time: 1000000, max: 1})
				requestedSpell.castText = test.first().content
				var up14 = await message.reply("What race created the spell?")
				up14.delete({timeout: 20000})
				var test = await message.channel.awaitMessages(filter, {time: 200000, max: 1})
				requestedSpell.origin = test.first().content
				var up15 = await message.reply("How difficult is the spell to cast?")
				up15.delete({timeout: 20000})
				var test = await message.channel.awaitMessages(filter, {time: 200000, max: 1})
				requestedSpell.difficulty = test.first().content
				var up16 = await message.reply("What are some other names for your spell?")
				up16.delete({timeout: 20000})
				var test = await message.channel.awaitMessages(filter, {time: 200000, max: 1})
				requestedSpell.altNames = test.first().content
				var up17 = await message.reply("Lastly, please provide any other statistics you may find necessary.")
				up17.delete({timeout: 20000})
				var test = await message.channel.awaitMessages(filter, {time: 1000000, max: 1})
				requestedSpell.otherStats = test.first().content
				var spellComplete = new Discord.MessageEmbed()
				.setTitle("Spell Complete!")
				.setDescription("Your spell will be sent to WubzyGD where he will then process it and then add it (probably).")
				.setColor("DC134C")
				.setFooter("Valkyrie", client.user.avatarURL())
				.setTimestamp();
				message.channel.send(spellComplete);
				var spellCreated = new Discord.MessageEmbed()
				.setTitle("New Spell Request")
				.setDescription(`Sent from ${message.member.guild.name} by ${message.author.username}#${message.author.discriminator}.`)
				.addField("Name", requestedSpell.name)
				.addField("Type", requestedSpell.type)
				.addField("Description", requestedSpell.description)
				.addField(requestedSpell.hitType, requestedSpell.hitTypeInt)
				.addField("Mana", requestedSpell.mana)
				.addField("Dice", requestedSpell.dice)
				.addField("Range", requestedSpell.range)
				.addField("Casting Text", requestedSpell.castText)
				.addField("Origin", requestedSpell.origin)
				.addField("Difficulty", requestedSpell.difficulty)
				.addField("Other Names", requestedSpell.altNames)
				.addField("Other Stats", requestedSpell.otherStats)
				.setColor("DC134C")
				.setFooter("Valkyrie", client.user.avatarURL())
				.setTimestamp();
				client.users.cache.get("330547934951112705").send(spellCreated);
				var up18 = await message.channel.send(spellCreated)
				up18.delete({timeout: 30000})
			} catch (error) {
				message.reply("Something happened there. You probably ran out of time.\nTry using the command again?");
				console.log(error);
			}
		} else {
			return(message.channel.send(`Yeah that's wrong :(. Syntax: \`${prefix}spell <list|info|cast|create> <name>\``));
		};
		return;
    }
};