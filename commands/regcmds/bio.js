const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    name: "bio",
    description: "",
    async execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}bio <set|clear|view>\``);};
        if (args[0] == "set") {
            if (args.length < 2) {return message.reply("You have to provide a bio, silly.");};
            if (args.shift().join(" ").length > 100) {return message.channel.send("Your bio should be less than 100 characters, please. This is a bio, not a bio*graphy*.");};
            if (fs.exists(`./data/bios/${message.author.id}.json`)) {
                fs.readFile(`./data/bios/${message.author.id}.json`, 'utf8', function readFileCallback(err, data){
                    if (err) {
                        console.log(err);
                    } else {
                    bio = JSON.parse(data);
                    bio.bio = args.shift().join(" ");
                    json = JSON.stringify(bio);
                    fs.writeFile(`./data/bios/${message.author.id}.json`, json, 'utf8', callback);
                    return message.reply("Bio set!");
                }});
            } else {
                var bio = {
                    bio: args.shift().join(" ")
                };
                var json = JSON.stringify(bio);
                fs.writeFile(`./data/bios/${message.author.id}.json`, json, 'utf8', callback);
                return message.reply("Bio set!");
            };
        } else if (args[0] == "clear") {
            if (fs.exists(`./data/bios/${message.author.id}.json`)) {
                fs.readFile(`./data/bios/${message.author.id}.json`, 'utf8', function readFileCallback(err, data){
                    if (err) {
                        console.log(err);
                    } else {
                    bio = JSON.parse(data);
                    bio.bio = "Not Set";
                    json = JSON.stringify(bio);
                    fs.writeFile(`./data/bios/${message.author.id}.json`, json, 'utf8', callback);
                    return message.reply("Bio cleared!");
                }});
            } else {return message.reply("You have no bio to clear!")};
        } else if (args[0] == "view") {
            if (!mention) {
                if (fs.exists(`./data/bios/${message.author.id}.json`)) {
                    fs.readFile(`./data/bios/${message.author.id}.json`, 'utf8', function readFileCallback(err, data){
                    if (err) {
                        console.log(err);
                    } else {
                    bio = JSON.parse(data);
                    return message.reply(new Discord.MessageEmbed().setTitle("User Bio").setThumbnail(message.author.avatarURL()).setDescription(bio.bio).setColor("DC134C"));
                }});
                } else {return message.reply("You have no bio for me to show you!")};
            } else {
                if (fs.exists(`./data/bios/${mention.id}.json`)) {
                    fs.readFile(`./data/bios/${mention.id}.json`, 'utf8', function readFileCallback(err, data){
                    if (err) {
                        console.log(err);
                    } else {
                    bio = JSON.parse(data);
                    return message.reply(new Discord.MessageEmbed().setTitle("User Bio").setThumbnail(mention.avatarURL()).setDescription(bio.bio).setColor("DC134C"));
                }});
                } else {return message.reply("That user has no bio for me to show you!")};
            };
        }
    }
};