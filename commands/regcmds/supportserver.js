const Discord = require("discord.js");

module.exports = {
    name: "supportserver",
    description: "",
    execute(message, msg, args, cmd, prefix, mention, client) {
        message.reply("Sure! Check your DM's!")
        return message.author.send("https://discord.gg/T2JZtuf");
    }
};