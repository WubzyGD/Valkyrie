const Discord = require("discord.js");

module.exports = {
    name: "say",
    description: "",
    execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) { message.delete(); return message.channel.send(`Come on, now. Usage: \`${prefix}say <text>\` *or* \`${prefix}say <"text"> <person>\``)};
		if ((msg.includes("<@&") && msg.includes(">")) || msg.includes("@everyone") || msg.includes("@here")) {return message.reply("Hmm, it looks like you're trying to mention a role. I don't want to ping any roles ~~for fear I may be slain by the angry ping lords~~ so let's just not, capiche?");};
		if (msg.includes(`"`)) {
			var annargs = message.content.split(`"`);
			if (annargs.length != 3) {
				return(message.channel.send("You'll need two quotation marks there fren, no more, no less."))
			};
			var text = annargs[1];
			var person = annargs[2].slice(1);
			message.delete();
			message.channel.send(`* ${person} says:\n> ${text}`);
		} else {
			var text = args.join(' ');
			message.delete();
			if (message.author.username != message.member.displayName) {
				message.channel.send(`* <@!${message.author.id}> says\n> ` + text);
			} else {
				message.channel.send(`* <@${message.author.id}> says\n> ` + text);
			}; 
		};
    }
};