const Discord = require("discord.js");

module.exports = {
    name: "feel",
    description: "",
    execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}feel <emotion>\` To help you describe what you're feeling, you can use \`list\` as the emotion to see all the possible feelings.`);};
        if (args[0] == "r" && message.author.id == "") {}
    }
};