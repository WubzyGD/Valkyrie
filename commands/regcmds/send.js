const Discord = require("discord.js");

module.exports = {
    name: "send",
    description: "",
    execute(message, msg, args, cmd, prefix, mention, client) {
		if (message.author.id !== "330547934951112705") {return;};
        if (mention == null) { message.channel.send(`No one to send your message to. \`${prefix}send <@username> <message>\``); return; }
		message.delete();
		var mentionMessage = message.content.slice(6).trim();
		var messageToSend = mentionMessage.split(" ").slice(1).join(" ");
		var privateEmbed = new Discord.MessageEmbed()
		.setTitle("Sent you a message from **"+message.member.guild.name+"**!")
		.setAuthor(message.member.displayName)
		.addField("---------------------------------------------", messageToSend+"\n --------------------------------------------")
		.setColor('DC134C')
		.setTimestamp();
		mention.send(privateEmbed);

		return message.channel.send("Message Sent!");
    }
};