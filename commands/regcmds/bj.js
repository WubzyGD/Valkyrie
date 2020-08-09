const Discord = require("discord.js");

module.exports = {
    name: "bj",
    description: "",
    async execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}bj <quick|create>\``);};
        if (args[0] == "quick") {
            if (message.channel.type != "dm") {return message.reply("You have to do that in a DM so you don't spam everyone :)");};
            message.reply("Starting a match of blackjack against me...");

            var p1 = message.author; var p1n = p1.username;
            var p2 = client.user; var p2n = "Valkyrie";

            var startEmbed = new Discord.MessageEmbed()
            .setTitle("Blackjack Started")
            .setDescription(`__${p1.username}__ vs __${p2.username}__`)
            .setColor("DC134C")
            .setFooter("Valkyrie", client.user.avatarURL())
            .setTimestamp();

            var game = await message.channel.send(startEmbed);
            var lastTurn = "There have been no turns yet!";
            var usedCards = [];
            
            function deal() {
                var tempHand = [];
                var values = ["Ace", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
                var suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
                var card;
                while (tempHand.length < 2) {
                    while (true) {
                        var card = `${values[Math.floor(Math.random() * values.length)]} of ${suits[Math.floor(Math.random() * suits.length)]}`;
                        if (card in usedCards) {continue;} else {break;};
                    };
                    tempHand.push(card);
                };
                return tempHand;
            };

            function findHandValue(hand, currentHandValue) {
                var handValue = 0;
                for (let card of hand) {
                    card = card.split(" ")[0];
                    if (card == "A") {if (currentHandValue > 11) {handValue += 1;} else {handValue += 11;};}
                    else if (card == "Jack" || card == "Queen" || card == "King") {handValue += 10;}
                    else {handValue += Number(card);};
                };
                return handValue;
            };

            var hands = {};
            hands[p1n] = deal();
            hands[p2n] = deal();
            var handsValue = {};
            handsValue[p1n] = findHandValue(hands[p1n], 0);
            handsValue[p2n] = findHandValue(hands[p2n], 0);

            async function turn(p) {
                if (p == p1) {
                    let mhs = pp => {let ls = `Value - \`${handsValue[pp]}\`\n\n`; for (let card of hands[pp]) {ls += `${hands[pp].indexOf(card) + 1}. **${card.split(" ")[0]}** of **${card.split(" ")[2]}**\n`;}; return ls;};
                    var updateEmbed = new Discord.MessageEmbed()
                    .setTitle("Blackjack Game")
                    .setDescription(`__${p1.username}__ vs __${p2.username}__`)
                    .addField("Info", `- It is currently ${p.username}'s turn.\n- Your hand value is ${handsValue[p1n]}.\n\nWould you like to "hit" or "stand"?\n\nLast turn: ${lastTurn}`)
                    .addField(`__${p1.username}__`, `Hand: ${mhs(p1n)}`)
                    .addField(`__${p2.username}__`, `Hand: ${mhs(p2n)}`)
                    .setColor("DC134C")
                    .setFooter("Valkyrie", client.user.avatarURL())
                    .setTimestamp();

                    game.edit(updateEmbed);

                    try {
                        var filter = m => m.content.includes("hit") || m.content.includes("stand");
                        message.channel.awaitMessages(filter, {time: 200000, max: 1, errors: ["time"]});
                    } catch (e) {console.log(e); return "timeout"};
                };

                if (findHandValue(hands[p.username], handsValue[p.username]) > 21) {if (p == p1) {return p2;} else {return p1;};};
                if (findHandValue(hands[p.username], handsValue[p.username]) == 21) {return p;};

                game.edit(updateEmbed);
            };
            if (turn(p1) == "timeout") {return message.channel.send("The game ended because you took too long on your turn... try again?");};

        };
    }
};