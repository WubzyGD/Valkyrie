const Discord = require("discord.js");

module.exports = {
    name: "randnum",
    aliases: ["rand", "rn"],
    description: "",
    execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) { return message.channel.send(`That's not right. Usage: \`${prefix}randnum <min number> <max number>\``);}

		var min = Number(args[0]);
		var max = Number(args[1]);

		if (min > max || max < min) {return message.channel.send("You must specify your __smallest__ number first then specify your __biggest__ number.")}

		var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
		message.channel.send(`Your randomly generated number is ${randomNum}`);
    }
};