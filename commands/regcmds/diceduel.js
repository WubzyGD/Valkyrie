const Discord = require("discord.js");

const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const diceRolled = sequelize.import("../../models/dicerolled");

module.exports = {
    name: "diceduel",
    description: "",
    async execute(message, msg, args, cmd, prefix, mention, client) {
		var e = process.argv.includes('--force') || process.argv.includes('-f');
		sequelize.sync({force: e}).then(async () => {}).catch(console.error);
        if (args.length <= 1) {return message.channel.send(`You've done a wrong. Syntax: \`${prefix}diceduel ["reason"] d<die> <duelingMember>\``)};
		if (msg.includes(`"`)) {
			var reason = message.content.slice((message.content.search(`"`) + 1));
			if (reason.search(`"`) == -1) {
				return(message.channel.send("You must include two quotation marks in your reason."));
			} else {
				var half = reason.split(`"`);
				if (half.length > 2) {
					return(message.channel.send("You also may only have quotes around the reason. Can't put any more than 2 quote marks :( This, unfortunately for now, also includes any quotation marks inside of the name of the person you duel against."));
				} else {
					var reason = half[0];
					var reasonIncluded = true;
					var half2 = half[1];
					var die = half2.toLowerCase()
					var die = die.slice((die.search(" d") + 2));
					var die = die.slice(0, die.search(" "));
					for (i = 0; i != true; i = i) {
						if (i > (args.length - 1)) {
							return(message.channel.send("It would appear you didn't type the right syntax. Try that again, you should."));
						};
						if (args[i].toLowerCase().startsWith(`d${die}`) || args[i].startsWith(`D${die}`)) {
							i = true;
						} else {
							args.shift();
						};
					};
					args.shift();
					if (args.length == 0) {
						return(message.channel.send("It would seem as though you didn't give me a person to ~~kill~~ duel your rolls against."));
					};
					person = "";
					for (i = 0; i <= (args.length - 1); i++) {
						person += args[i];
						if (args.length - i > 1) {
							person += " ";
						};
					};
				};
			};
		} else {
			var die = args[0].slice(1);
			for (i = 0; i != true; i = i) {
				if (i > (args.length - 1)) {
					return(message.channel.send("It would appear you didn't type the right syntax. Try that again, you should."));
				};
				if (args[i].startsWith(`d${die}`)) {
					i = true;
				} else {
					args.shift();
				};
			};
			args.shift();
			if (args.length == 0) {
				return(message.channel.send("It would seem as though you didn't give me a person to ~~kill~~ duel your rolls against."));
			};
			person = "";
			for (i = 0; i <= (args.length - 1); i++) {
				person += args[i];
				if (args.length - i > 1) {
					person += " ";
				};
			};
			var reasonIncluded = false;
		};
		if (isNaN(Number(die))) {return message.reply("Now listen here, I'm gonna need a real number from ya there chief.");};
		die = Number(die);
		if  (die != 4 || die != 6 || die != 8 || die != 10 || die != 12 || die != 20 || die != 100) {return message.reply("Your die is not actually a die! You have to use 4, 6, 8, 10, 12, 20, or 100!");};
		
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
		
		var roll1 = Math.ceil(Math.random() * Number(die));
		var roll2 = Math.ceil(Math.random() * Number(die));
		if (roll1 > roll2) {
			var winner = message.member.displayName;
		} else if (roll1 < roll2) {
			var winner = person;
		} else {
			var winner = "Both people";
		};
		
		if (!mention) {
			var person1 = person;
		} else {
			var person1 = message.guild.member(mention);
			var person1 = person1.displayName;
		};

		if (reasonIncluded == false) {
			var finaldie = new Discord.RichEmbed()
			.setTitle("Standard Dice Duel")
			.setAuthor("Dice Rolling Engine v2")
			.setDescription("Reason ommited")
			.addField("Roller", `${message.member.displayName}`)
			.addField("Rolled Against", `${person}`)
			.addField(`${message.member.displayName}'s Roll`, `D${die} Roll: ${roll1}`)
			.addField(`${person1}'s Roll`, `D${die} Roll: ${roll2}`)
			.addField("Winner", `${winner}`)
			.setColor("DC134C")
			.setFooter("Valkyrie", client.user.avatarURL)
			.setTimestamp();

			return(message.channel.send(finaldie));
		} else {
			var finaldie = new Discord.RichEmbed()
			.setTitle("Dice Duel with Reason")
			.setDescription("Reason included")
			.addField("Roller", `${message.member.displayName}`)
			.addField("Rolled Against", `${person}`)
			.addField("Reason", `${reason}`)
			.addField(`${message.member.displayName}'s Roll`, `D${die} Roll: ${roll1}`)
			.addField(`${person1}'s Roll`, `D${die} Roll: ${roll2}`)
			.addField("Winner", `${winner}`)
			.setColor("DC134C")
			.setFooter("Valkyrie", client.user.avatarURL)
			.setTimestamp();

			return(message.channel.send(finaldie));
		};
    }
};