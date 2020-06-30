const Discord = require("discord.js");

module.exports = {
    name: "poll",
    description: "",
    async execute(message, msg, args, cmd, prefix, mention, client) {
        message.delete();
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}poll <options>\`. Use \`${prefix}poll options\` to see a list of available options.`);};
        if (args[0] == "options") {var opw = await message.reply("**Valid options are:**\n\n-Title - Required\n-Text - Displays below title\n-Color - must be hex; Embed color\n-Channel - Optional; must be tagged\n-Option - Required; no more than 9\n-Image - Pass a URL for an image to add\n-Thumbnail - Pass a URL for the embed thumbnail\n-Servericonimage/Servericonthumbnail - Uses the server's icon as the image/thumbnail\n-Time - Required; ms only\n-Secret - Only DMs results\n-DM - Send results by DM\n\nUsage: `$option data` Example: `poll $title Ex. $text Test Text $option Left $option Right $time 10000`"); {return opw.delete(60000);};};
        var title = "";
		var text = "";
		var color = "";
		var channel;
		var tempoption = "";
		var options = [];
		var reading = false;
		var thumbnail;
        var image;
        var optionText = "";
        var secret = false;
        var dm = false;
        var time;
		for (t = 0; t < args.length; t++) {
			i = args[t];
			if ((!reading == false) && (!i.startsWith("$"))) {
				if (reading == "title") {
					title += `${i} `;
				} else if (reading == "text") {
					text += `${i} `;
				} else if (reading == "color") {
					if (i.length !== 6) {return message.reply("You must use a 6-digit hex value.");};
					color += i;
				} else if (reading == "channel") {
					if ((!i.startsWith("<#") && !i.endsWith(">"))) {return message.reply("You must tag a channel using #channelName.");};
					channel = i.slice(2, (i.length - 1));
				} else if (reading == "option") {
					tempoption += `${i} `;
				} else if (reading == "thumbnail") {
					thumbnail = i;
				} else if (reading == "image") {
					image = i;
				} else if (reading == "servericonimage") {
					image = message.member.guild.iconURL();
				} else if (reading == "servericonthumbnail") {
					thumbnail = message.member.guild.iconURL();
				} else if (reading == "secret") {
                    secret = true;
                } else if (reading == "dm") {
                    dm = true;
                } else if (reading == "time") {
                    time = i;
                } else {
					var warn = await message.reply(`\`${i}\` is not a valid option. Use \`${adminPrefix}announce options\` to see a list of valid options.`);
					warn.delete(10000);
				};
			} else if (i.startsWith("$")) {
				i = i.toLowerCase().slice(1);
                reading = i;
                if (reading == "option" && tempoption !== "") {options.push(tempoption); tempoption = "";};
				if (reading == "servericonimage") {thumbnail = i;};
                if (reading == "servericonthumbnail") {thumbnail = message.member.guild.iconURL();};
                if (reading == "secret") {secret = true;};
                if (reading == "dm") {dm = true;};
            };
        };
        if (secret) {dm = true;};
        if (!tempoption == "") {options.push(tempoption); tempoption = "";};
		var pollEmbed = new Discord.MessageEmbed()
		.setFooter("Valkyrie", client.user.avatarURL())
		.setTimestamp();
		text.trim().replace("\\\\n", "\n");
        title.trim();
        if (!options) {return message.reply("You must include options in a poll, silly ;)");};
        if (text.length > 0) {pollEmbed.setDescription(text);};
		if (title.length >= 1) {pollEmbed.setAuthor(title, message.author.avatarURL());} else {message.reply("You must have a poll title!");};
        if (color.length > 0) {pollEmbed.setColor(color);} else {pollEmbed.setColor("DC134C");};
		if (!channel) {channel = message.channel.id;};
        if (options.length > 9) {return message.reply("You can't have more than 9 options!");};
        if (time) {if (isNaN(time)) {return message.reply("Your time must be a number.");};} else {return message.reply("You must specify time in ms for the poll to last.");};
		if (text.search(`<@${message.member.guild.id}>`) !== -1 || text.search("@everyone") !== -1) {
			if (!message.member.guild.channels.cache.get(channel).permissionsFor(message.member.roles.highest).has("MENTION_EVERYONE")) {return message.reply("You included a mass mention, but don't have the permission to do that.");};
			message.member.guild.channels.cache.get(channel).send("@everyone");
        };
        if (thumbnail) {pollEmbed.setThumbnail(thumbnail);};
        if (image) {pollEmbed.setImage(image);};
        for (i of options) {
            optionText += `${options.indexOf(i) + 1}. ${i}\n`;
        };
        pollEmbed.addField("Options", optionText);
        try {
			if (!message.member.guild.channels.cache.get(channel).permissionsFor(message.member.roles.highest).has("SEND_MESSAGES")) {return message.channel.send("You don't have the right permissions for that.");};
            var pollMessage = await message.guild.channels.cache.get(channel).send(pollEmbed);
		} catch (e) {
			console.log("Announce cmd error; Likely channel find.", e);
			return message.reply("Something happened while trying to create your announcement that didn't work. You may have input too many characters somewhere, or... I dunno?.");
        };

        if (options.length >= 1) {await pollMessage.react("1️⃣");};
        if (options.length >= 2) {await pollMessage.react("2️⃣");};
        if (options.length >= 3) {await pollMessage.react("3️⃣");};
        if (options.length >= 4) {await pollMessage.react("4️⃣");};
        if (options.length >= 5) {await pollMessage.react("5️⃣");};
        if (options.length >= 6) {await pollMessage.react("6️⃣");};
        if (options.length >= 7) {await pollMessage.react("7️⃣");};
        if (options.length >= 8) {await pollMessage.react("8️⃣");};
        if (options.length >= 9) {await pollMessage.react("9️⃣");};

        var votes = {
            "1️⃣": [options[0], 0],
            "2️⃣": [options[1], 0],
            "3️⃣": [options[2], 0],
            "4️⃣": [options[3], 0],
            "5️⃣": [options[4], 0],
            "6️⃣": [options[5], 0],
            "7️⃣": [options[6], 0],
            "8️⃣": [options[7], 0],
            "9️⃣": [options[8], 0]
        };
        const filter = reaction => reaction.emoji.name.includes("1️⃣") || reaction.emoji.name.includes("2️⃣") || reaction.emoji.name.includes("3️⃣") || reaction.emoji.name.includes("4️⃣") || reaction.emoji.name.includes("5️⃣") || reaction.emoji.name.includes("6️⃣") || reaction.emoji.name.includes("7️⃣") || reaction.emoji.name.includes("8️⃣") || reaction.emoji.name.includes("9️⃣");
        const collector = await pollMessage.createReactionCollector(filter, {time: time});
        collector.on('end', collected => {
            votes["1️⃣"][1] += collected.filter(r => r.emoji.name == "1️⃣").size;
            votes["2️⃣"][1] += collected.filter(r => r.emoji.name == "2️⃣").size;
            votes["3️⃣"][1] += collected.filter(r => r.emoji.name == "3️⃣").size;
            votes["4️⃣"][1] += collected.filter(r => r.emoji.name == "4️⃣").size;
            votes["5️⃣"][1] += collected.filter(r => r.emoji.name == "5️⃣").size;
            votes["6️⃣"][1] += collected.filter(r => r.emoji.name == "6️⃣").size;
            votes["7️⃣"][1] += collected.filter(r => r.emoji.name == "7️⃣").size;
            votes["8️⃣"][1] += collected.filter(r => r.emoji.name == "8️⃣").size;
            votes["9️⃣"][1] += collected.filter(r => r.emoji.name == "9️⃣").size;
            var resultsstr = "";
            for (i = 0; i < Object.keys(votes).length; i++) {
                if (Object.values(votes)[i][0] !== undefined) {resultsstr += `${i + 1}. ${Object.values(votes)[i][0].trim()}: ${Object.values(votes)[i][1]} votes\n`};
            };
            var resultEmbed = new Discord.MessageEmbed()
            .setTitle("Poll Results")
            .setDescription(title)
            .addField("Results", resultsstr)
            .setColor(color)
            .setFooter("Valkyrie", client.user.avatarURL())
            .setTimestamp();
            if (dm) {message.author.send(resultEmbed);};
            if (!secret) {message.channel.guild.channels.cache.get(channel).send(resultEmbed);};
            pollMessage.delete();
        });
    }
};