const Discord = require("discord.js");

module.exports = {
    name: "info",
    description: "",
    async execute(message, msg, args, cmd, prefix, mention, client) {
        var infoEmbed = new Discord.RichEmbed()
		.setTitle("Valkyrie's Info")
		.setDescription("I'm a bot made for RPG-oriented Discord servers. Although you can have me roll dice for you in any server :)")
		.addField("Author:", "WubzyGD#8766, with special thanks to Hellcat007 for providing technical support.")
		.addField("Programming Language:", "JavaScript/Discord.js")
		.addField("Servers", `I'm in ${client.guilds.size} servers!`)
		.addField("Prefix", `My prefix is \`${prefix}\``)
		.addField("Help", `If you need help, use ${prefix}help.`)
		.addField("Problems?", "If you're having issues, please contact WubzyGD#8766 via DM.")
		.setColor("DC134C")
		.setFooter("Valkyrie", client.user.avatarURL)
		.setTimestamp();
		return(message.channel.send(infoEmbed));
    }
};