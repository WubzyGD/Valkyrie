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
                    var data = JSON.stringify({feels: {}, color: args[3], requires_mention: Boolean(args[4]), ask_for: Boolean(args[5]), messages: []});
                    fs.writeFileSync(`./data/emotions/${args[2]}.json`, data, "utf8");
                    return message.reply("Emotion added!");
                };
            } else {
                if (fs.existsSync(`./data/emotions/${args[1]}.json`)) {
                    var emotion = JSON.parse(fs.readFileSync(`./data/emotions/${args[1]}.json`));
                    emotion.feels[Object.keys(emotion.feels).length.toString()] = args[2];
                    fs.writeFileSync(`./data/emotions/${args[1]}.json`, JSON.stringify(emotion), "utf8");
                    return message.reply(new Discord.MessageEmbed()
                    .setAuthor("New Emotion Image Added", message.author.avatarURL())
                    .setDescription(`For \`${args[1]}\` emotion`)
                    .setImage(args[2])
                    .setColor(emotion.color));
                } else {return message.reply("I don't have that emotion!");};
            };
        } else if (args[0] == "list") {
            var emotions = fs.readdirSync("./data/emotions").filter(file => file.endsWith(".json"));
            var es = "";
            for (var emotion of emotions) {es += `- \`${emotion.slice(0, emotion.length - 5)}\`\n`};
            return message.reply(new Discord.MessageEmbed()
            .setTitle("Emotions list")
            .setDescription(es)
            .setColor("DC134C"));
        } else {
            if (message.channel.type != "text") {return;};
            message.delete();
            if (fs.existsSync(`./data/emotions/${args[0]}.json`)) {
                var emotions = JSON.parse(fs.readFileSync(`./data/emotions/${args[0]}.json`));
                return message.reply(new Discord.MessageEmbed()
                .setTitle(`${message.member.displayName} is feeling ${args[0]}`)
                .setImage(emotions.feels[Object.keys(emotions.feels)[Math.floor(Math.random() * Object.keys(emotions.feels).length)]])
                .setColor(emotions.color));
            } else {return message.reply("I can't help you show that feeling. Maybe try `list` to see if another one will work?")}
        };
    }
};