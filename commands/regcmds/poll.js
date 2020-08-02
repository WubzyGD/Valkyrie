const Discord = require("discord.js");

function wait(time) {
	return new Promise(function (resolve) {
		setTimeout(function () {
		  	resolve("anything");
		}, time);
	});
};

module.exports = {
    name: "poll",
    description: "",
    async execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}poll <options>\`. Use \`${prefix}poll options\` to see a list of available options.`);};
        if (args[0] == "options") {return message.reply("**Valid options are:**\n\n-Title - Required\n-Text - Displays below title\n-Color - must be hex; Embed color\n-Channel - Optional; must be tagged\n-Option - Required; no more than 9\n-Image - Pass a **URL** for an image to add\n-Thumbnail - Pass a **URL** for the embed thumbnail\n-Servericonimage/Servericonthumbnail - Uses the server's icon as the image/thumbnail\n-Time - Required; ms only\n-Secret - Only DMs results\n-DM - Send results by DM\n\nUsage: `$option data` Example: `poll $title Ex. $text Test Text $option Left $option Right $time 10000`");};
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
					image = message.member.guild.iconURL({size: 2048});
				} else if (reading == "servericonthumbnail") {
					thumbnail = message.member.guild.iconURL({size: 512});
				} else if (reading == "secret") {
                    secret = true;
                } else if (reading == "dm") {
                    dm = true;
                } else if (reading == "time") {
                    time = i;
                } else {
					var warn = await message.reply(`\`${i}\` is not a valid option. Use \`${adminPrefix}announce options\` to see a list of valid options.`);
					warn.delete({time: 10000});
				};
			} else if (i.startsWith("$")) {
				i = i.toLowerCase().slice(1);
                reading = i;
                if (reading == "option" && tempoption !== "") {options.push(tempoption); tempoption = "";};
				if (reading == "servericonimage") {image = message.member.guild.iconURL({size: 2048});};
                if (reading == "servericonthumbnail") {thumbnail = message.member.guild.iconURL({size: 512});};
                if (reading == "secret") {secret = true;};
                if (reading == "dm") {dm = true;};
            };
        };
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
        if (secret == true) {pollEmbed.addField(`Secret Poll`, `This poll is **secret**, which means that the results will only be seen by the poll creator, ${message.member.displayName}.`);};
        message.delete();
        try {
			if (!message.member.guild.channels.cache.get(channel).permissionsFor(message.member.roles.highest).has("SEND_MESSAGES")) {return message.channel.send("You don't have the right permissions for that.");};
            var pollMessage = await message.guild.channels.cache.get(channel).send(pollEmbed);
		} catch (e) {return message.reply("Something happened while trying to create your poll that didn't work. You may have input too many characters somewhere, or... I dunno?.");};

		var emotes = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];
		for (var i = 0; i < options.length; i++) {await pollMessage.react(emotes[i]);};
		try {
		await wait(time);
		var reactions = Array.from(pollMessage.reactions.cache.values());
		var rs = "";
        reactions = Array.from(reactions.values());
        for (var r of reactions) {if (!emotes.includes(r.emoji.name)) {delete reactions.indexOf(r);};};
		reactions.sort(function(a, b){return emotes.indexOf(a.emoji.name) - emotes.indexOf(b.emoji.name)});
		for (var i=0; i < reactions.length; i++) {
			let r = reactions[i];
			if (r.count - 1 > 1 || r.count == 0) {rs += `${i + 1}. \`${options[i].trim()}\`\n-> **${r.count - 1} votes**\n\n`;}
			else {rs += `${i + 1}. \`${options[i].trim()}\`\n-> **${r.count - 1} vote**\n\n`;};
        };
        pollMessage.delete();
		var pre = new Discord.MessageEmbed()
		.setAuthor(`Poll Results for ${title}`, message.author.avatarURL())
		.setDescription(text)
		.addField("Results", rs)
		.setColor(pollEmbed.hexColor)
		.setFooter("Valkyrie")
		.setTimestamp();
		if (image) {pre.setImage(image);}; if (thumbnail) {pre.setThumbnail(thumbnail);};
		if (secret == true) {return message.author.send(pre);} else {if (dm == true) {message.author.send(pre);}; return message.guild.channels.cache.get(channel).send(pre);};
		} catch (e) {console.error(e);};
    }
};