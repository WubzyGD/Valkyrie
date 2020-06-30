const Discord = require("discord.js");

module.exports = {
    name: "serverinfo",
    description: "",
    execute(message, msg, args, cmd, prefix, mention, client) {
        var serverInfoEmbed = new Discord.MessageEmbed()
		.setTitle(message.member.guild.name)
		.setDescription("Server info card")
		.setThumbnail(message.member.guild.iconURL)
		.addField("Members", `**${message.guild.memberCount}**\n-${message.member.guild.members.filter(member => !member.user.bot).size} Humans\n-${message.member.guild.members.filter(member => member.user.bot).size} Bots`)
		.addField("Members Online", `${message.member.guild.members.filter(m => m.presence.status == "online" && !m.user.bot).size + message.member.guild.members.filter(m => m.presence.status == "dnd" && !m.user.bot).size} Members currently online.`)
		.addField("Channels", `${message.member.guild.channels.size}`)
		.addField("Created", `Created: __${message.member.guild.createdAt}__`)
		.addField("Region", message.member.guild.region)
		.addField("Owner", `${client.users.get(message.member.guild.ownerID).username}#${client.users.find(u => u.id == message.member.guild.ownerID).discriminator}\nServer Username: ${message.member.guild.members.get(message.member.guild.ownerID).displayName}`)
		.addField("Role Count", message.member.guild.roles.size)
		.setColor("DC134C")
		.setTimestamp();

		return(message.channel.send(serverInfoEmbed));
    }
};