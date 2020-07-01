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

            const clean = text => {
                if (typeof(text) === "string")
                    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
                else
                    return text;
            };
            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);
                message.channel.send(clean(evaled), {code:"xl"});
            } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }
};