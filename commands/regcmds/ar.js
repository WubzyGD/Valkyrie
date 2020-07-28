const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    name: "ar",
    description: "",
    async execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}ar <add|edit|delete|list>\``);};
        async function getName() {
            try {
                var filter = m => m.author.id == message.author.id;
                await message.channel.send("What is the AR's trigger? This is case-sensitive (except for capitals) and will trigger in any channel in this server only!");
                var trigger = await message.channel.awaitMessages(filter, {time: 200000, max: 1});
                trigger = trigger.first().content.toLowerCase();
                return trigger;
            } catch (e) {message.reply("Looks like you took too long. Try again?"); return null;};
        };
        async function getResp() {
            try {
                var filter = m => m.author.id == message.author.id;
                await message.channel.send("How should I reply? Let's keep things relatively nice, please!");
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
            if (!message.member.permissions.has("ADMINISTRATOR")) {return message.reply("You must be a server administrator in order to add responses!");};
            args.shift();
            if (args.length) {var trigger = args.join(" ");}
            else {var trigger = await getName(); if (trigger == null) {return;};};
            if (Object.keys(ars).includes(trigger)) {return message.reply("I seem to already have that AR! Try using `edit` instead.");};
            var response = await getResp(); if (response == null) {return;};
            ars[trigger] = response;
            var data = JSON.stringify(ars);
            fs.writeFileSync(`./data/ar/${message.guild.id}.json`, data, 'utf8');
            return message.reply("AR added! Responses refresh every two minutes, so it may take a moment before your response starts working. Also, triggers cannot be changed. If you want to change the trigger for this AR, simply delete this one and re-add it under the new name!");
        } else if (args[0] == "list") {
            if (Object.keys(ars).length == 0) {return message.reply("This server has no auto-responses!");};
            arls = "";
            for (ar of Object.keys(ars)) {arls += `${Object.keys(ars).indexOf(ar) + 1}. Trigger: \`${ar}\`\nResponse: \`${ars[ar]}\`\n\n`;};
            return message.channel.send(new Discord.MessageEmbed()
            .setTitle("Server ARs")
            .setThumbnail(message.guild.iconURL({size: 2048}))
            .setDescription(arls)
            .setColor("DC134C"));
        } else if (args[0] == "delete") {
            if (!message.member.permissions.has("ADMINISTRATOR")) {return message.reply("You must be a server administrator in order to delete responses!");};
            args.shift();
            if (args.length) {var trigger = args.join(" ");}
            else {var trigger = await getName(); if (trigger == null) {return;};};
            if (!Object.keys(ars).includes(trigger)) {return message.reply("I don't seem to have that AR! Try using `add` instead.");};
            delete ars[trigger];
            var data = JSON.stringify(ars);
            fs.writeFileSync(`./data/ar/${message.guild.id}.json`, data, 'utf8');
            return message.reply("That AR is gone now! Responses refresh every two minutes, which means it could still activate up until then.");
        } else if (args[0] == "edit") {
            args.shift();
            if (!message.member.permissions.has("ADMINISTRATOR")) {return message.reply("You must be a server administrator in order to delete responses!");};
            if (args.length) {var trigger = args.join(" ");}
            else {var trigger = await getName(); if (trigger == null) {return;};};
            if (!Object.keys(ars).includes(trigger)) {return message.reply("I don't seem to have that AR! Try using `add` instead.");};
            var response = await getResp(); if (response == null) {return;};
            ars[trigger] = response;
            var data = JSON.stringify(ars);
            fs.writeFileSync(`./data/ar/${message.guild.id}.json`, data, 'utf8');
            message.reply("I've edited your AR! You'll see the changes next time the responses refresh.");
        } else {message.reply("Bad arg! Use `<add|list|delete|edit>`");};
    }
};