const Discord = require("discord.js");

module.exports = {
	name: "8ball",
	aliases: ["eb", "8b"],
    description: "",
    execute(message, msg, args, cmd, prefix, mention) {
        if (!args.length) { return message.channel.send(`You didn't do something right there. \`Usage: ${prefix}8ball <question>\``)};
		var responses = new Array("Yes", "No", "Yeah", "Nope", "Flip a coin on it, I dunno.", "I mean, if that's what *you* think...", 
		"Sure", "Not really.", "You know, I talked to the bard, and he doesn't think so.", "The dragonborn says yes.",
		"Well, it doesn't really matter. We're in the middle of a fight here you know...", "I'd say yeah.", 
		"Roll some dice on it. After all, the dice are never wrong.", "The dice said... uh... it's best we don't talk about it.",
		"The dice say so, so yes.", "Absofrickinlutely not.", "For sure", "Definitely.", "We flipped a dead skeleton's bone, it said no.",
		"Go wake up that hellhound over there. If you live, it's a yes, if you die, it's a no.");
		var result = Math.floor(Math.random() * responses.length);
		var embedtosend = new Discord.MessageEmbed()
		.setAuthor("8ball Question", message.author.avatarURL())
		.addField("Question: \"*" + message.content.slice(prefix.length + 6) + "*\"", `\n\nAnswer: ${responses[result]}`)
		.setFooter(`Asked by ${message.member.displayName}`)
		.setColor("DC134C")
		.setTimestamp();
		return(message.channel.send(embedtosend).catch(console.error));
    }
};