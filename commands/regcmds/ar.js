const Discord = require("discord.js");

module.exports = {
    name: "ar",
    description: "",
    execute(message, msg, args, cmd, prefix, mention, client) {
        //what would asher do
	    //what would asher say
	    //set the scene
	    //roll __die__
        if (msg.includes("dice said so")) {
            return message.channel.send("And the dice are never wrong.");
        };
        if (msg.startsWith("goodnight") || msg.startsWith("gn ") || msg.startsWith("night ")) {
            var leavingUser = message.author.id;
            return message.channel.send("Goodnight <@"+leavingUser+">!");
        };
        if (msg.startsWith("hi ") || msg.startsWith("hello") || msg.startsWith("hoi ") || msg.content == "hi" || msg.content == "hoi") {
            var userSaying = message.author.id;
            return message.channel.send("Hello <@"+userSaying+">");
        };
        if (msg.startsWith("whats up valk") || msg.startsWith("what's up valk") || msg.startsWith("what’s up valk")) {
            return message.channel.send("Not too much. But quit asking how I'm doing, ask it to the goblin behind you. Party member down...");
        };
        if (msg.includes("confused stonks") && (message.author.id == "497598953206841375" || message.author.id == "417877804672352256" || message.author.id == "468903364533420074" || message.author.id == "335792072638595083" || message.author.id == "378014504211972106" || message.author.id == "386604180963459102" || message.author.id == "330547934951112705")) {
            return message.channel.send({files: ["https://cdn.discordapp.com/attachments/563198656241598484/655553468865708062/5fm9ifqkgzr31.jpg"]});
        } else if (msg.includes("stonks") && (msg.includes("isn") || msg.includes("not"))) {
            return message.channel.send({files: ["https://cdn.discordapp.com/attachments/563198656241598484/655553468865708063/SmartSelect_20191214-163438_Samsung_Internet.jpg"]});
        } else if (msg.includes("stonks")) {
            return message.channel.send({files: ["https://cdn.discordapp.com/attachments/563198656241598484/655553468160933929/download.jpeg-2.jpg"]});
        };
        if ((msg.startsWith("i am ") || msg.startsWith("im ") || msg.startsWith("i'm ") || msg.startsWith("i’m ")) && message.content.length <= 30 && (message.author.id == "497598953206841375" || message.author.id == "417877804672352256" || message.author.id == "468903364533420074" || message.author.id == "335792072638595083" || message.author.id == "378014504211972106" || message.author.id == "386604180963459102" || message.author.id == "330547934951112705")) {
            message.channel.send(`Hi **${message.content.slice((message.content.search("m ") + 2))}**, I'm Dad!`);
        };
    }
};