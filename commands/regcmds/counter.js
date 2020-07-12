const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    name: "counter",
    description: "",
    async execute(message, msg, args, cmd, prefix, mention, client) {
        await message.delete();
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}counter <counterName|up>\``);};
        if (message.author.id == "386604180963459102") {var person = "Eternal"} else if (message.author.id == "330547934951112705") {var person = "Wubzy"} else {return message.reply("Only a specific plebian can use this command ;)");};
        var data = fs.readFileSync("./data/misc/count.json", "utf-8");
        const write = () => {var json = JSON.stringify(counter); fs.writeFileSync(`./data/misc/count.json`, json, 'utf8');}
        var counter = JSON.parse(data);
        if (args[0] == "up") {
            args.shift();
            if (!args.length) {return message.reply("Counters: `badbot`, `brokenbot`, `shitonwubzy`, `bullets`");};
            if (args[0] == "badbot") {
                counter.badbot += 1;
                write();
                return message.reply(`${person} thinks I suck at being the maiden of the dice, just like the other ${counter.badbot - 1} times.`);
            } else if (args[0] == "brokenbot") {
                counter.brokenbot += 1;
                write();
                return message.reply(`Welcome back to everyone's favorite gameshow: Valkyrie doesn't fucking work, and it's __all Wubzy's fault__ :). This is **Episode #${counter.brokenbot}**!`);
            } else if (args[0] == "shitonwubzy") {
                counter.shitonwubzy += 1;
                write();
                return message.reply(`Got it, make that ${counter.shitonwubzy} times I've made Wubzy wish he never made me :) ~~even though he thinks that every day anyways~~`);
            } else if (args[0] == "bullets") {
                counter.bullets += 1;
                write();
                return message.reply(`Wubzy just purchased another **Golden Bullet** to kill me with! I love making him angery, just like the other ${counter.bullets} times :))))`);
            } else {return message.reply("Counters: `badbot`, `brokenbot`, `shitonwubzy`, `bullets`");};
        } else {
            args.shift();
            if (args[0] == "badbot") {
                return message.reply(`${person} thinks I've been a garbage bot ${counter.badbot} times :)`);
            } else if (args[0] == "brokenbot") {
                return message.reply(`I've been a completely broken bot about ${counter.brokenbot} times. This makes ${person} very upsetti spaghetti. It just makes me laugh ;)`);
            } else if (args[0] == "shitonwubzy") {
                return message.reply(`Bullying my creator is my favorite hobby. I've done it ${counter.shitonwubzy} times, actually.`);
            } else if (args[0] == "bullets") {
                return message.reply(`One of the best moments in life for an old dungeon dragon like me is when I make Wubzy so mad, that he purchases another **gold bullet** (which *supposedly* can kill me). I think he has ${counter.bullets} of them, actually. Yikes.`);
            } else {return message.reply("Counters: `badbot`, `brokenbot`, `shitonwubzy`, `bullets`");};
        }
    }
};