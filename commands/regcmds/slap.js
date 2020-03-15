const Discord = require("discord.js");

module.exports = {
    name: "slap",
    description: "",
    execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return(message.channel.send(`You've gotta slap someone, dingus! Syntax: \`${prefix}slap <person>\``))}
		var slaps = ["https://cdn.discordapp.com/attachments/563578266984775681/655517570924806154/giphy-2.gif",
		"https://cdn.discordapp.com/attachments/563578266984775681/655517570421751821/source-3.gif",
		"https://cdn.discordapp.com/attachments/563578266984775681/655517569939275822/source-4.gif",
		"https://cdn.discordapp.com/attachments/563578266984775681/655517454369423370/source-5.gif",
		"https://cdn.discordapp.com/attachments/563578266984775681/655517453756923907/source-7.gif",
		"https://cdn.discordapp.com/attachments/563578266984775681/655517434748338206/ac91cef2e5ae98f598665193f37bba223301d75c_hq.gif",
		"https://cdn.discordapp.com/attachments/563578266984775681/655517434320781313/source-2.gif",
		"https://cdn.discordapp.com/attachments/563578266984775681/655517433817333780/giphy-1.gif",
		"https://cdn.discordapp.com/attachments/563578266984775681/655517432643059755/giphy.gif",
		"https://cdn.discordapp.com/attachments/563578266984775681/655517432643059753/o2SJYUS.gif",
		"https://cdn.discordapp.com/attachments/563578266984775681/655517431766319124/tenor.gif",
		"https://cdn.discordapp.com/attachments/563578266984775681/655517430847635456/source.gif",
		"https://cdn.discordapp.com/attachments/609888728155947021/668625715318751253/source_2.gif",
		"https://cdn.discordapp.com/attachments/609888728155947021/668625886626447363/source_3.gif",
		"https://cdn.discordapp.com/attachments/609888728155947021/668626056261009408/Agwwaj6.gif",
		"https://cdn.discordapp.com/attachments/609888728155947021/668626330325221416/ABE1arT.gif",
		"https://cdn.discordapp.com/attachments/609888728155947021/668626329113198602/source_4.gif",
		"https://cdn.discordapp.com/attachments/609888728155947021/668627166983880726/giphy_2.gif",
		"https://cdn.discordapp.com/attachments/609888728155947021/668627176790294535/iFwdi4l06yUfakZDVoMBb8vtT-nSCBnddM-yee959XqOFiyXomKydVwy7vVhNX20xMF9nW-maaq_ZIVri75aZft3i5W47v9qEzqL.gif"];
		var slap = slaps[Math.floor(Math.random() * slaps.length)];
		if (mention == null) {
			var person = message.content.slice(prefix.length + cmd.length + 1);
		} else {
			var person = message.guild.member(mention);
			var person = person.displayName;
		};
		var slapSend = new Discord.RichEmbed()
		.setTitle(`${message.member.displayName} slaps ${person}`)
		.setImage(slap)
		.setColor("DC134C")
		.setTimestamp();

		return message.channel.send(slapSend);
    }
};