const Discord = require("discord.js");

var rarityColors = {
    "Scrap": "7B3C3C",
    "Common": "A0A0A0",
    "Uncommon": "1AB21F",
    "Rare": "2F8FD1",
    "Legendary": "8E14D9",
    "Exotic": "EDBE20",
    "Exalted": "F6FF69",
};

var itemIndex = require("../../itemIndex.json");

module.exports = {
    name: "fish",
    description: "",
    async execute(message, msg, args, cmd, prefix, mention, client) {
        //if (!args.length) {return message.channel.send(`Syntax: ${prefix}fish `);};
        var topCatNum = Math.ceil(Math.random() * 7);
            topCatNum = 1;
        if (topCatNum == 1) {
            var topCat = itemIndex.armor;
        } else if (topCatNum == 2) {
            var topCat = itemIndex.chests;
        } else if (topCatNum == 3) {
            var topCat = itemIndex.fish;
        } else if (topCatNum == 4) {
            var topCat = itemIndex.junk;
        } else if (topCatNum == 5) {
            var topCat = itemIndex.relics;
        } else if (topCatNum == 6) {
            var topCat = itemIndex.weapons;
        } else if (topCatNum == 7) {
            var topCat = itemIndex.money;
        };
        if (topCat.name == "weapons" || topCat.name == "chests" || topCat.name == "armor") {
            var bRand = Math.ceil(Math.random() * 100);
            if (bRand < 26) {
                var rarity = topCat.Scrap;
            } else if (bRand > 25 && bRand < 46) {
                var rarity = topCat.Common;
            } else if (bRand > 45 && bRand < 65) {
                var rarity = topCat.Uncommon;
            } else if (bRand > 64 && bRand < 80) {
                var rarity = topCat.Rare;
            } else if (bRand > 79 && bRand < 89) {
                var rarity = topCat.Legendary;
            } else if (bRand > 88 && bRand < 97) {
                var rarity = topCat.Exotic;
            } else if (bRand > 96) {
                var rarity = topCat.Exalted;
            };
        }
        if (topCat.name == "junk") {
            
        } else if (topCat.name == "fish") {
            var fishes = itemIndex.fish.fish;
            var fish = fishes[Math.floor(Math.random() * fishes.length)];
            var fishEmbed = new Discord.MessageEmbed()
            .setTitle(`${message.member.displayName} fished a fish!`)
            .setDescription(`Using \`${prefix}fish\``)
            .addField(`${fish.size} ${fish.name}`, `__Stats:__\n\n-Name: ${fish.name}\n-Size: ${fish.size}\n-Hunger Regeneration: ${fish.hunger}`)
            .setColor("3387B7")
            .setFooter("Valkyrie", client.user.avatarURL)
            .setTimestamp();
        } else if (topCat.name == "relics") {

        } else if (topCat.name == "weapons") {
            var weapon = rarity[Math.floor(Math.random() * rarity.length)];
            var hitDice = "";
            var hitDiceMod = 0;
            for (i of weapon.hitDice) {if (i.startsWith("d")) {var hasDice = true;};};
            if (hasDice) {
                for (i = 0; i < weapon.hitDice.length; i++) {
                    t = weapon.hitDice[i];
                    if (t.startsWith("d")) {hitDice += `${t}, `;}
                    else {hitDiceMod += Number(t);};
                };
            } else {hitDice = "None  ";};
            hitDice = hitDice.slice(0, (hitDice.length - 2));
            if (hitDiceMod >= 0) {hitDiceMod = `+${hitDiceMod}`;} else {hitDiceMod = `-${hitDiceMod}`;};
            hitDice += `\n-Modifier: ${hitDiceMod}`;
            var fishEmbed = new Discord.MessageEmbed()
            .setTitle(`${message.member.displayName} fished a weapon!`)
            .setDescription(`Using \`${prefix}fish\``)
            .addField(`${weapon.name}`, `__Stats:__\n\n-Name: ${weapon.name}\n-Rarity: ${weapon.rarity}\n\n-Hit Dice: ${hitDice}`)
            .setColor(rarityColors[weapon.rarity])
            .setFooter("Valkyrie", client.user.avatarURL)
            .setTimestamp();
        } else if (topCat.name == "armor") {
            var armorSet = rarity[Math.floor(Math.random() * rarity.length)];
            var armorSetPieces = "";
            for (i = 0; i < armorSet.pieces.length; i++) {
                armorSetPieces += `-**${armorSet.pieces[i].name}**: ${armorSet.pieces[i].defense} defense\n`;
            };
            var armor = armorSet.pieces[Math.floor(Math.random() * armorSet.pieces.length)];
            if (typeof(armor.defense) == "float") {
                throw new Error("itemIndex JSON Error: Armor type \"defense\" must not be float. Allowed str and int\nArmor piece: " + armor.name + ", Armor Set: " + armorSet.name);
            };
            var fishEmbed = new Discord.MessageEmbed()
            .setTitle(`${message.member.displayName} fished an armor piece!`)
            .setDescription(`Using \`${prefix}fish\`.`)
            .addField(armor.name, `__Stats:__\n\n-**Name:** ${armor.name}\n-**Rarity:** ${armor.rarity}\n-**Defense:** ${armor.defense}`)
            .addField("Containing Set", `__Stats:__\n\n-**Name:** __${armorSet.name}__ set\n-**Set Type:** ${armorSet.setType}\n\n**Armor Set:** \n${armorSetPieces}`)
            .setColor(rarityColors[armor.rarity])
            .setFooter("Valkyrie", client.user.avatarURL)
            .setTimestamp();
        } else if (topCat.name == "money") {
            var coins = itemIndex.money.coins;
            var coin = coins[Math.floor(Math.random() * coins.length)];
            var fishEmbed = new Discord.MessageEmbed()
            .setTitle(`${message.member.displayName} fished a coin!`)
            .setDescription(`Using \`${prefix}fish\`.`)
            .addField(coin.name, `${coin.name} is a coin worth ${coin.belowWorth}, the coin valued below it.`)
            .setColor("DC134C")
            .setFooter("Valkyrie", client.user.avatarURL)
            .setTimestamp();
        };
        return message.channel.send(fishEmbed);
    }
};