const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    name: "ar",
    description: "",
    execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}ar <add|edit|delete|list>\``);};
        function getName() {
            try {
                var filter = m => m.author.id == message.author.id;
                await message.channel.send("What text would you like to trigger the AR? This is case-sensitive (except for capitals) and will trigger in any channel in this server only!");
                var trigger = await message.channel.awaitMessages(filter, {time: 200000, max: 1});
                trigger = trigger.first().content.toLowerCase();
                return trigger;
            } catch (e) {message.reply("Looks like you took too long. Try again?"); return null;};
        };
        function getResp() {
            try {
                var filter = m => m.author.id == message.author.id;
                await message.channel.send("And how should I reply? Let's keep things relatively nice, please!");
                var response = await message.channel.awaitMessages(filter, {time: 200000, max: 1});
                response = response.first().content;
                return response;
            } catch (e) {message.reply("Looks like you took too long. Try again?"); return null;};
        };
        if (fs.existsSync(`./data/ar/${message.guild.id}.json`)) {
            var ars = fs.readFileSync(`./data/ar/${message.guild.id}.json`);
            ars = JSON.parse(ars);
        } else {var ars = {};};
        if (args[0] == "add") {
            args.shift();
            if (args.length < 1) {var trigger = args.join(" ");}
            else {var trigger = getName(); if (trigger == null) {return;};};
            if (Object.keys(ars).includes(trigger)) {return message.reply("I seem to already have that AR! Try using `edit` instead.");};
            var response = getResp(); if (response == null) {return;};
            ars[trigger] = response;
            var data = JSON.stringify(ars);
            fs.writeFileSync(`./data/ar/${message.guild.id}.json`, data, 'utf8');
            return message.reply("AR added! Responses refresh every two minutes, so it may take a moment before your response starts working.");
        } else if (args[0] == "list") {
            if (Object.keys(ars).length == 0) {return message.reply("This server has no auto-responses!");};
            arls = "";
            for (ar of Object.keys(ars)) {arls += `${Object.keys(ars).indexOf(ar) + 1}. Trigger: ${ar}\nResponse: ${ars[ar]}\n\n`;};
            return message.channel.send(new Discord.MessageEmbed()
            .setTitle("Server ARs")
            .setThumbnail(message.guild.iconURL({size: 2048}))
            .setDescription(arls)
            .setColor("DC134C"));
        };
    }
};