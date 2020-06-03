const Discord = require("discord.js");

module.exports = {
    name: "pickrandom",
    description: "",
    execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}pickrandom <option> <option> <option> <etc...>\``);};
        return message.reply(new Discord.RichEmbed().setAuthor("Random Item", message.author.avatarURL).setDescription(args[Math.floor(Math.random() * args.length)]).setColor("DC134C"));
    }
};