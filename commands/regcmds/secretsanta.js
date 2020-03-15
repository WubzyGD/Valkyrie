const Discord = require("discord.js");

module.exports = {
    name: "secretsanta",
    description: "",
    execute(message, msg, args, cmd, prefix, mention, client) {
        if (message.author.id !== "330547934951112705") {return(message.channel.send("You can't use that command."))};
		var idList = ["497598953206841375", "421148573871112194", "417877804672352256", "330547934951112705", "378014504211972106", "512752988331442194", "386604180963459102"]
		var memberList = ["Zoros", "Kazra", "UsernameCopied707", "Creator/DM", "Kiba Frostfire", "Azra Nevorac", "Onyx Evergreen"];
		var finalMembers = [];
		function stonks(iter) {
			var r = Math.floor(Math.random() * memberList.length);
			var temp = memberList[r];
			if (temp in finalMembers || temp == memberList[iter]) {
				stonks(iter);
			} else {
				finalMembers.push(temp);
			};
		};
		stonks(0);
		stonks(1);
		stonks(2);
		stonks(3);
		stonks(4);
		stonks(5);
		stonks(6);
		var secretSantaReq = [];
		for (i = 0; i < memberList.length; i++) {
			secretSantaReq[i] = `**This is the real one!** You got __${finalMembers[i]}__ for your Secret Santa Gift! Go to the secret santa channel to see what they want. Spending limit is $30, talk to Jacob if you can't get money. Try to have it by Christmas Break, but if you need more time, no worries.`;
		};
		for (i = 0; i < memberList.length; i++) {
			client.users.get(idList[i]).send(secretSantaReq[i]);
		};
		message.channel.send("There, I gave everyone their people. Merry Christmas!");
    }
};