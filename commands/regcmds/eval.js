const Discord = require("discord.js");
const Util = require("util");

module.exports = {
    name: "eval",
    description: "",
    execute(message, msg, args, cmd, prefix, mention, client) {
        if (!message.author.id == "330547934951112705") {return;};
        try {
            const code = args.join(" ");
            let evaled = eval(code);
       
            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);
                message.channel.send(clean(evaled), {code:"xl"});
            } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }
};