const Discord = require("discord.js");

module.exports = {
	name: "zero",
	aliases: ["z", "amizero"],
    description: "",
    execute(message, msg, args, cmd, prefix, mention, client) {
        var zeroN = Math.ceil(Math.random() * 1000);
		var gCat = ["https://cdn.discordapp.com/attachments/563578266984775681/655540318279565332/CODE_GEASS_R2_-_05_-_Large_18.jpg",
		"https://cdn.discordapp.com/attachments/563578266984775681/655540318279565333/3000237_1.jpg",
		"https://cdn.discordapp.com/attachments/563578266984775681/655540319080808528/source-8.gif",
		"https://cdn.discordapp.com/attachments/563578266984775681/655540319080808529/The_Stolen_Mask.jpg",
		"https://cdn.discordapp.com/attachments/563578266984775681/655543432135311382/source-9.gif"];
		var gSuz = ["https://cdn.discordapp.com/attachments/563578266984775681/655544596180369408/tenor-3.gif",
		"https://cdn.discordapp.com/attachments/563578266984775681/655544596990001202/tenor-2.gif",
		"https://cdn.discordapp.com/attachments/563578266984775681/655544597555970048/tenor-1.gif",
		"https://cdn.discordapp.com/attachments/563578266984775681/655544598088777739/suzaku-kururugi-1191.jpg",
		"https://cdn.discordapp.com/attachments/563578266984775681/655544597555970049/7cee9a1b-9112-4d38-97ca-743a2ded94ad.jpg"]
		var gLel = ["https://cdn.discordapp.com/attachments/563578266984775681/655545813069463582/images.jpeg-8.jpg",
		"https://cdn.discordapp.com/attachments/563578266984775681/655545813069463583/images.jpeg-7.jpg",
		"https://cdn.discordapp.com/attachments/563578266984775681/655545813518385152/Lelouch_vi_Britannia.png",
		"https://cdn.discordapp.com/attachments/563578266984775681/655545813518385153/LelouchviBritannia.jpg",
		"https://cdn.discordapp.com/attachments/563578266984775681/655545814193799215/tenor-4.gif"]
		var gZer = ["https://cdn.discordapp.com/attachments/563578266984775681/655546411911348254/tumblr_mu0a6dDVeR1qa94xto1_500.gif",
		"https://cdn.discordapp.com/attachments/563578266984775681/655546412540624945/tenor-5.gif",
		"https://cdn.discordapp.com/attachments/563578266984775681/655546413089816586/giphy-3.gif",
		"https://cdn.discordapp.com/attachments/563578266984775681/655546413089816587/images.jpeg-9.jpg",
		"https://cdn.discordapp.com/attachments/563578266984775681/655546750458920990/tumblr_nkgurom1In1txnxl8o1_540.gif"]
		if (zeroN <= 250) {
			var image = gCat[Math.floor(Math.random() * gCat.length)];
			var text = `With a score of \`${zeroN}\`, you are definitely not Zero. You're **Arthur the Cat**, the Ashford Academy's Student Council Club Pet.`;
		} else if (zeroN > 250 && zeroN <= 500) {
			var image = gSuz[Math.floor(Math.random() * gSuz.length)];
			var text = `With a score of \`${zeroN}\`, you are not Zero, but instead his nemesis, **Suzaku Kururugi**. Your ultimate drive is to bring down your enemy, Zero, to achieve peace.`;
		} else if (zeroN > 500 && zeroN <= 750) {
			var image = gLel[Math.floor(Math.random() * gLel.length)];
			var text = `With a score of \`${zeroN}\`, you're not Zero, you're **Lelouch Lamperouge**, an ordinary student at Ashford Academy, bored out of your mind daily, sneaking out to get a worthy chess opponent.`;
		} else if (zeroN > 750 && zeroN <= 1000) {
			var image = gZer[Math.floor(Math.random() * gZer.length)];
			var text = `With a score of \`${zeroN}\`, You are indeed **Zero**. You don your mask and costume and rally the Black Knights to fight against the tyrannous Britannia, doing whatever is necessary in the process.`;
		};
		text += "\n\nSource: Code Geass - 2007 Anime...\n~~please watch it~~";
		var zeroSend = new Discord.MessageEmbed()
		.setTitle(`${message.member.displayName}'s Score: ${zeroN}`)
		.setDescription(text)
		.setImage(image)
		.setColor("7517A0")
		.setTimestamp();

		message.channel.send(zeroSend);
    }
};