const Discord = require("discord.js");

module.exports = {
    name: "pickrandom",
    description: "",
    execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}pickrandom $option <stuff> $option <otherStuff> $option <moreStuff> <etc...>\``);};
        title = "";
        text = "";
        tempoption = "";
        options = [];
        for (t = 0; t < args.length; t++) {
			i = args[t];
			if ((!reading == false) && (!i.startsWith("$"))) {
				if (reading == "title") {
					title += `${i} `;
				} else if (reading == "text") {
					text += `${i} `;
				} else if (reading == "option" || reading == "o" || reading == "op") {
                    tempoption += `${i} `;
                } else {
					var warn = await message.reply(`\`${i}\` is not a valid option. Use \`${adminPrefix}announce options\` to see a list of valid options.`);
					warn.delete(10000);
				};
			} else if (i.startsWith("$")) {
				i = i.toLowerCase().slice(1);
				reading = i;
				if (reading == "servericonimage") {thumbnail = i;};
                if (reading == "servericonthumbnail") {thumbnail = message.member.guild.iconURL;};
                if (reading == "option" && tempoption !== "") {options.push(tempoption); tempoption = "";};
			};
        };
        return message.channel.send(new Discord.RichEmbed().setAuthor("Random Item", message.author.avatarURL).setDescription(options[Math.floor(Math.random() * options.length)]).setColor("DC134C"));
    }
};