const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    name: "feel",
    description: "",
    execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}feel <emotion>\` To help you describe what you're feeling, you can use \`list\` as the emotion to see all the possible feelings.`);};
        if (args[0] == "r" && message.author.id == "330547934951112705") {
            if (args[1] == "t") {
                if (fs.existsSync(`./data/emotions/${args[2]}.json`)) {message.reply("I already have that emotion!");}
                else {
                    var data = JSON.stringify({});
                    fs.writeFileSync(`./data/emotions/${args[2]}.json`, data, "utf8");
                    return message.reply("Emotion added!");
                };
            } else {
                if (fs.existsSync(`./data/emotions/${args[1]}.json`)) {
                    var emotion = JSON.parse(fs.readFileSync(`./data/emotions/${args[1]}.json`));
                    emotion[args[2]] = args[3];
                    fs.writeFileSync(`./data/emotions/${args[1]}.json`, JSON.stringify(emotion), "utf8");
                    return message.reply(new Discord.MessageEmbed()
                    .setAuthor("New Emotion Image Added", message.author.avatarURL()));
                } else {return message.reply("I don't have that emotion!");};
            };
        } else if (args[0] == "list") {
            var emotions = fs.readdirSync("./data/emotions").filter(file => file.endsWith(".json"));
            var es = "";
            for (var emotion of emotions) {es += `- \`${emotion}\`\n`};
            return message.reply(new Discord.MessageEmbed()
            .setTitle("Emotions list")
            .setDescription(es)
            .setColor("DC134C"));
        };
    }
};