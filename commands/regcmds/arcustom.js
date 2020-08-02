const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    name: "arcustom",
    description: "",
    execute(message, msg, args, cmd, prefix, mention, client, ars) {
        //what would asher do
	    //what would asher say
	    //set the scene
	    //roll __die__
        if (msg.includes("dice said so")) {
            return message.channel.send("And the dice are never wrong.");
        };
        if (msg.startsWith(`<@${client.user.id}>`) || msg.startsWith(`<@!${client.user.id}`)) {
            var resps = ["You found me!", "whaddya want I'm in the middle of an existential crisis.", "What is this, a game of peekaboo?", "Pff that's not me.", "Valkyrie isn't here right now, please leave a message.", "Yup, that's definitely me!", "Hey uh I'm kinda in the middle of ~~enjoying watching the party die~~ trying to fend off a dragon.", "Can't you see I'm busy??", "Can I help you?", "\\*sigh* I'm trying to relax for a second. Go ask someone else to roll your stupid dice."];
            var prefixEmbed = new Discord.RichEmbed().setTitle("My Prefix").setDescription(`${resps[Math.floor(Math.random() * resps.length)]}\nMy prefix is currently \`${prefix}\` Use \`${prefix}help\` for a list of commands.`);
            return message.channel.send(prefixEmbed);
        };
        /*if (msg.startsWith("goodnight") || msg.startsWith("gn ") || msg.startsWith("night ")) {
            var leavingUser = message.author.id;
            return message.channel.send("Goodnight <@"+leavingUser+">!");
        };*/
        /*if (msg.startsWith("hi ") || msg.startsWith("hello") || msg.startsWith("hoi ") || msg.content == "hi" || msg.content == "hoi") {
            var userSaying = message.author.id;
            return message.channel.send("Hello <@"+userSaying+">");
        };*/
        if (msg.startsWith("whats up valk") || msg.startsWith("what's up valk") || msg.startsWith("what’s up valk")) {
            return message.channel.send("Not too much. But quit asking how I'm doing, ask it to the goblin behind you. Party member down...");
        };
        if ((msg.startsWith("i am ") || msg.startsWith("im ") || msg.startsWith("i'm ") || msg.startsWith("i’m ")) && message.content.length <= 30 && (message.author.id == "497598953206841375" || message.author.id == "417877804672352256" || message.author.id == "468903364533420074" || message.author.id == "335792072638595083" || message.author.id == "378014504211972106" || message.author.id == "386604180963459102" || message.author.id == "330547934951112705" || message.author.id == "599873116914581504" || message.author.id == "378773868896059394")) {
            return message.channel.send(`Hi **${message.content.slice((message.content.search("m ") + 2))}**, I'm Mom!`);
        };
        if ((msg.includes("want") && msg.includes("to fuck") && msg.inclues("valk")) || (msg.includes("mommy valk")) || (msg.includes("dominate valk")) || (msg.includes("dom") && msg.includes("by valk") || (msg.includes("dom") && msg.includes("me valk")) || (msg.includes("master valkyrie")) || (msg.includes("valk") && msg.includes("lookin") && (msg.includes("thicc") || msg.includes("fuckable") || msg.includes("hot")))) && (message.author.id == "497598953206841375" || message.author.id == "417877804672352256" || message.author.id == "468903364533420074" || message.author.id == "335792072638595083" || message.author.id == "378014504211972106" || message.author.id == "386604180963459102" || message.author.id == "330547934951112705" || message.author.id == "599873116914581504" || message.author.id == "378773868896059394")) {
            var data = fs.readFileSync("./data/misc/count.json", "utf-8");
            const write = () => {var json = JSON.stringify(counter); fs.writeFileSync(`./data/misc/count.json`, json, 'utf8');}
            var counter = JSON.parse(data);
            counter.simpforvalk += 1;
            write();
            return message.reply(`Sure thing, you horny fuck! So what's that, like, ${counter.simpforvalk} times you've tried to hit on me?`);
        };
        if (message.channel.type == "text") {
            if (ars == null) {return;};
            for (var arr of Object.keys(ars)) {if (msg == arr) {return message.channel.send(ars[arr]);};};
        };
    }
};