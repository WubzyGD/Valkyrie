const Discord = require("discord.js");

module.exports = {
    name: "announce",
    description: "",
    async execute(message, msg, args, cmd, adminPrefix, mention, client) {
		message.delete();
		if (!args.length) { message.delete(); return message.channel.send(`One of those things was not like the other. \`Usage: ${adminPrefix}announce <options>\`. Use \`announce options\` to see a list of options.`)};
		if (args[0] == "options") {var opw = await message.reply("**Valid options are:**\n\n-Title\n-Text - required\n-Color - must be hex\n-Channel - must be tagged\n-Newfield - Adds a new field\n-Fieldtext - Sets the text for the field. - Field and text tags mut be equal\n-Image - Pass a URL for an image to add\n-Thumbnail - Pass a URL for the embed thumbnail\n-Servericonimage/Servericonthumbnail - Uses the server's icon as the image/thumbnail\n\nUsage: `$option data` Example: `announce $title Ex. $text Test Text`"); {return opw.delete(60000);};};
		var title = "";
		var text = "";
		var color;
		var channel;
		var tempfn = "";
		var tempft = "";
		var fieldNames = [];
		var fieldText = [];
		var reading = false;
		var thumbnail;
		var image;
		for (t = 0; t < args.length; t++) {
			i = args[t];
			if ((!reading == false) && (!i.startsWith("$"))) {
				if (reading == "title") {
					title += `${i} `;
				} else if (reading == "text") {
					text += `${i} `;
				} else if (reading == "color") {
					if (i.length !== 6) {return message.reply("You must use a 6-digit hex value.");};
					color = i;
				} else if (reading == "channel") {
					if ((!i.startsWith("<#") && !i.endsWith(">"))) {return message.reply("You must tag a channel using #channelName.");};
					channel = i.slice(2, (i.length - 1));
				} else if (reading == "newfield") {
					tempfn += `${i} `;
				} else if (reading == "fieldtext") {
					tempft += `${i} `;
				} else if (reading == "thumbnail") {
					thumbnail = i;
				} else if (reading == "image") {
					image = i;
				} else if (reading == "servericonimage") {
					image = message.member.guild.iconURL();
				} else if (reading == "servericonthumbnail") {
					thumbnail = message.member.guild.iconURL();
				} else {
					var warn = await message.reply(`\`${i}\` is not a valid option. Use \`${adminPrefix}announce options\` to see a list of valid options.`);
					warn.delete(10000);
				};
			} else if (i.startsWith("$")) {
				i = i.toLowerCase().slice(1);
				if (i == "newfield" && tempfn !== "") {fieldNames.push(tempfn); tempfn = "";};
				if (i == "fieldtext" && tempft !== "") {fieldText.push(tempft); tempft = "";};
				reading = i;
				if (reading == "servericonimage") {thumbnail = i;};
				if (reading == "servericonthumbnail") {thumbnail = message.member.guild.iconURL();};
			};
		};
		if (fieldNames.length !== fieldText.length) {return message.reply("You must make your field titles and field content tags equal to each other, so that every field has a title and text")}
		if (tempfn !== "") {fieldNames.push(tempfn);};
		if (tempft !== "") {fieldText.push(tempft);};
		var announceEmbedNorm = new Discord.MessageEmbed()
		.setFooter("Valkyrie", client.user.avatarURL())
		.setTimestamp();
		text.trim().replace("\\\\n", "\n");
		title.trim();
		if (title.length >= 1) {announceEmbedNorm.setAuthor(title, message.author.avatarURL());} else {announceEmbedNorm.setAuthor(message.member.displayName, message.author.avatarURL());};
		if (!text.length >= 1) {return message.reply("You must include text in your announcement.");} else {announceEmbedNorm.setDescription(text);};
		if (color) {announceEmbedNorm.setColor(color);} else {announceEmbedNorm.setColor("DC134C");};
		if (!channel) {channel = message.channel.id;};
		if (fieldNames.length > 10) {return message.reply("You can't have more than 10 fields!");};
		if (text.search(`<@${message.member.guild.id}>`) !== -1 || text.search("@everyone") !== -1) {
			if (!message.member.guild.channels.cache.get(channel).permissionsFor(message.member.roles.highest).has("MENTION_EVERYONE")) {return message.reply("You included a mass mention, but don't have the permission to do that.");};
			message.channel.send("@everyone");
			var everyonesent = true;
		};
		for (i = 0; i < fieldText.length; i++) {
			var tempText = fieldText[i];
			if (tempText.search(`<@${message.member.guild.id}>`) !== -1 || tempText.search("@everyone") !== -1) {
				if (!message.member.guild.channels.cache.get(channel).permissionsFor(message.member.roles.highest).has("MENTION_EVERYONE")) {return message.reply("You included a mass mention, but don't have the permission to do that.");};
				if (!everyonesent) {message.channel.send("@everyone");};
			};
		};
		//console.log(args);
		//console.log("Title: ", title, "\nText: ", text, "\nColor: ", color, "\nChannel: ", channel, "\nField Names: ", fieldNames, "\nField Texts: ", fieldText, "\nTempfn: ", tempfn, "\nTempft: ", tempft);
		for (i = 0; i < fieldNames.length; i++) {
			announceEmbedNorm.addField(fieldNames[i].trim().replace("\\\\n", "\n"), fieldText[i].trim().replace("\\\\n", "\n"));
		};
		if (thumbnail) {announceEmbedNorm.setThumbnail(thumbnail);};
		if (image) {announceEmbedNorm.setImage(image);};
		try {
			if (!message.member.guild.channels.cache.get(channel).permissionsFor(message.member.roles.highest).has("SEND_MESSAGES")) {return message.channel.send("You don't have the right permissions for that.");};
			return message.guild.channels.cache.get(channel).send(announceEmbedNorm);
		} catch (e) {
			console.log("Announce cmd error; Likely channel find.", e);
			return message.reply("Something happened while trying to create your announcement that didn't work. You may have input too many characters somewhere.");
		};
    }
};