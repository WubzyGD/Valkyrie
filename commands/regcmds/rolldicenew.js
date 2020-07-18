const Discord = require("discord.js");

module.exports = {
    name: "rolldicenew",
    description: "",
    async execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}rolldicenew $<option> $[option] [etc...]\`. For a list of options, use \`v.rolldicenew options\`. This command is in beta development, and will shift and change over time. The \`rolldice\` command will remain the same until this version is finalized.`);};
        for (t = 0; t < args.length; t++) {
            i = args[t];
            var reason = "";
            var modifiers = [];
			if ((!reading == false) && (!i.startsWith("$"))) {
				if (reading == "reason" || reading == "r") {
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
					warn.delete({timeout: 10000});
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
    }
};