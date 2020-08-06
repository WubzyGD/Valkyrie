const Discord = require("discord.js");

module.exports = {
    name: "restart",
    description: "",
    execute(message, msg, args, cmd, prefix, mention, client) {
        if (message.author.id == "330547934951112705") {
            const {exec} = require("child_process");
            exec("pm2 restart bot.js", (error, stdout, stderr) => {
                if (error) {message.reply("Reload unsuccessful!"); return console.log(`Reload Error: ${error.message}`);}
                else if (stderr) {message.reply("Reload unsuccessful!"); return console.log(`Reload StdError: ${stderr}`);}
                else {return message.reply("Reload successful!");};
            });
        }
    }
};