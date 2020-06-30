const Discord = require("discord.js");

module.exports = {
    name: "coinflip",
    description: "",
    execute(message, msg, args, cmd, prefix, mention, client) {
        var coin = Math.ceil(Math.random() * 2);
		if (coin == 1) {
			var coin = "Tails";
			var thumb = "https://cdn.discordapp.com/attachments/563198656241598484/655514881293811753/SmartSelect_20191214-140131_Samsung_Internet.jpg";
		} else {
			var coin = "Heads";
			var thumb = "https://cdn.discordapp.com/attachments/563198656241598484/655514893033799700/SmartSelect_20191214-140108_Samsung_Internet.jpg";
		};
		var coinflip = new Discord.MessageEmbed()
		.setAuthor(message.member.displayName, message.author.avatarURL())
		.setThumbnail(thumb)
		.addField("Coin Flip", `Result: \`${coin}\``)
		.setFooter("Valkyrie", client.user.avatarURL())
		.setColor("DC134C")
		.setTimestamp();

		message.channel.send(coinflip);
    }
};