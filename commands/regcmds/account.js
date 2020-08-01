const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    name: "account",
    description: "",
    async execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}account <register|view|info>\``);};
        if (fs.existsSync(`./data/accounts/${message.author.id}.json`)) {
            var account = JSON.parse(fs.readFileSync(`./data/accounts/${message.author.id}.json`));
            var hasAccount = true;
        } else {
            var account = {
                name: "",
                faction: "",
                flairs: [],
                inventory: {}
            };
        };
        var namespace = JSON.parse(fs.readFileSync(`./data/misc/namespace.json`));
        async function joinFaction(fn) {
            const factions = {
                "1": {name: "Solakia", msg: "Welcome, young Master, to the Exalted Solakians. We accept you into our Order with honor and open arms. May your Light one day outshine the Sun."},
                "2": {name: "Lundasia", msg: "We accept you, brave Scholar, into the Order of the Cosmos as one of the Lundasians. May your knowledge extend to the reaches of the cosmos, and may your Tomes attest to your skill."},
                "3": {name: "Crimsakia", msg: "You've reached Crimsakia. There is no warm welcome. Survive; don't die. If you live longer than a week, I might actually consider you a real member."},
                "4": {name: "Havashia", msg: "Wandering Traveler, you are now a part of the Faction of Ruin. You should learn to live among this desert wasteland the way the rest of us do: alone or in small groups, and like a vulture, picking up whatever you can find in the darkest of nooks."},
                "5": {name: "Valkaria", msg: "Hey there newbie! This is Valkyrie speaking! I wanted you to personally welcome you to my own Faction, Valkaria! We're an Adventurer's faction; we seek new land, new dangers, and new glory. You'll want to find yourself a Guild right away. There's plenty of loot in your future!"},
                "6": {name: "Nataria", msg: "I always knew you'd come, new Light. We seek to bring health and good fortunes to the world around us, and to fight for the oppressed and weak while caring for this planet and its natural beauty. May your Lifeblood run strong."}
            };
            await message.channel.send(factions[fn.toString()].msg);
            account.faction = factions[fn.toString()].name;
        }
        if (args[0] == "register") { try {
            if (hasAccount) {return message.reply("You already have an account!");};
            if (message.channel.type == "text") {return message.reply("Let's do that in a DM");};
            var filter = m => m.author.id == message.author.id;
            await message.channel.send("What would your account username to be?\n\nPlease be aware that this cannot be changed, and you can only have one account!");
            var name = await message.channel.awaitMessages(filter, {time: 60000, max: 1});
            name = name.first().content;
            if (name.length > 30) {return message.reply("Please keep your name under 30 characters");};
            if (namespace.account_usernames.includes(name)) {return message.reply("That name has already been taken!");};
            await message.channel.send(`Are you positive you want your username to be \`${name}\`?`);
            var conf = await message.channel.awaitMessages(filter, {time: 60000, max: 1});
            conf = conf.first().content;
            if (conf.toLowerCase() != "yes") {return message.reply("Okay, I won't make that your username. Try the command again when you come up with a better one!");};
            account.name = name;
            await message.channel.send("There are 6 factions:\n1. The Holy Faction of the Sun - *Solakia*\n2. The Omniscient Faction of the Cosmos - *Lundasia*\n3. The Fiery Faction of the Crimson - *Crimsakia*\n4. The Wandering Faction of the Ruin - *Havashia*\n5. The Adventuring Faction of the Dragon - *Valkaria*\n6. The Graceful Faction of the Life - *Nataria*\n\nPlease select a Faction to join by providing a number.");
            var factionToJoin = await message.channel.awaitMessages(filter, {time: 60000, max: 1});
            factionToJoin = factionToJoin.first().content.toLowerCase().trim();
            if (isNaN(Number(factionToJoin))) {return message.reply("You must provide a number! Please try again");}
            else {await joinFaction(factionToJoin);};
            namespace.account_usernames.push(name);
            fs.writeFileSync("./data/misc/namespace.json", JSON.stringify(namespace), 'utf8');
            fs.writeFileSync(`./data/accounts/${message.author.id}.json`, JSON.stringify(account), 'utf8');
            return message.reply("Your account has been created.");
        } catch {return message.reply("Hmm, it seems you took too long. Try again?");};} else if (args[0] == "view") {
            if (mention) {
                if (!fs.existsSync(`./data/accounts/${mention.id}.json`)) {return message.reply("That user doesn't have an account yet!");};
                var account = JSON.parse(fs.readFileSync(`./data/accounts/${mention.id}.json`));
                var person = mention;
            } else {if (!hasAccount) {return message.reply("You don't seem to have an account.");}; var person = message.author;};
            return message.channel.send(new Discord.MessageEmbed()
            .setTitle(`${account.name}'s Account Info`)
            .setDescription(`Owner: ${person.username}`)
            .addField("Faction", account.faction)
            .setColor("DC134C")
            .setFooter("Valkyrie", client.user.avatarURL())
            .setTimestamp());
        } else if (args[0] == "info") {
            return message.author.send("Ah, I see you're curious about this whole thing. What could this possibly be? Well, not even *I* know that answer. Seriously, Wubzy just threw some crown on me and then skipped away before I could ask anything. You get used to it after a while. Bottom line: he'll reveal more as time goes.");
        } else {return message.reply("Use `<register|view|info>`");};
    }
};