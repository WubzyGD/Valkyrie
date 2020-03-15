const Discord = require("discord.js");

module.exports = {
    name: "rolldice",
    description: "",
    execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) { return message.channel.send(`You made an oopsie there. Syntax: \`${prefix}rolldice ["reason"] d<die>\`. The reason is optional, but must be placed in quotation marks if used. You may include an infinite number of dice, but each one must start with d and then the number, and you must use valid dice numbers (4, 6, 8, 10, 12, 20, 100)`)};
		if (msg.includes(`"`)) {
			var reason = message.content.slice((message.content.search(`"`) + 1));
			if (reason.search(`"`) == -1) {
				return(message.channel.send("You must include two quotation marks in your reason."));
			} else {
				var half = reason.split(`"`);
				if (half.length > 2) {
					return(message.channel.send("You also may only have quotes around the reason. Can't put any more than 2 quote marks :("));
				} else {
					var reason = half[0];
					var reasonIncluded = true;
					var dice = half[1];
					var dice = dice.toLowerCase();
					var dice = dice.split(" d");
					dice.shift();
				};
			};
		} else {
			var dice = [];
			for (i = 0; i < args.length; i++) {
				dice.push(args[i].toLowerCase().slice((args[i].search("d") + 1)));
			};
			var reasonIncluded = false;
		};
		var dicerolls = [];
		for (t = 0; t < dice.length; t++) {
			var i = Number(dice[t]);
			if (i == 4 || i == 6 || i == 8 || i == 10 || i == 12 || i == 20 || i == 100) {
				dicerolls.push(Math.ceil(Math.random() * i));
			} else {
				return(message.channel.send(`One of your dice wasn't actually a die. Syntax: \`${prefix}rolldice ["reason"] d<die>\`. The reason is optional, but must be placed in quotation marks if used. You may include an infinite number of dice, but each one must start with d and then the number, and you must use valid dice numbers (4, 6, 8, 10, 12, 20, 100)`));
			};
		};
		rollresultsstring = "";
		for (i = 0; i <= (dicerolls.length - 1); i++) {
			rollresultsstring += `${i + 1}. Roll d${dice[i]}: ${dicerolls[i]}\n`;
		};
		if (reasonIncluded == false) {
			var finaldice = new Discord.RichEmbed()
			.setTitle("Standard Dice Roll")
			.setDescription(`Reason ommited; ${dicerolls.length} rolls.`)
			.addField("Roller", `${message.member.displayName}`)
			.addField("Results", `${rollresultsstring}`)
			.setColor("DC134C")
			.setFooter("Valkyrie", client.user.avatarURL)
			.setTimestamp();

			return(message.channel.send(finaldice));
		} else {
			var finaldice = new Discord.RichEmbed()
			.setTitle("Dice Roll with Reason")
			.setDescription(`Reason included; ${dicerolls.length} rolls.`)
			.addField("Roller", `${message.member.displayName}`)
			.addField("Reason", `${reason}`)
			.addField("Results", `${rollresultsstring}`)
			.setColor("DC134C")
			.setFooter("Valkyrie", client.user.avatarURL)
			.setTimestamp();

			return(message.channel.send(finaldice));
		};
    }
};