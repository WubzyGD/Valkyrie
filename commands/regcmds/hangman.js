const Discord = require("discord.js");

var words = ["rainbow", "goblin", "skeleton", "despair", "turtle", "chocolate", "silver",
"crescent", "crimson", "watermelon", "banana", "strawberry", "campfire", "evergreen",
"valkyrie", "adventure", "journey", "werewolf", "vampire", "hangman", "piano", "colors",
"sword art online", "the trash man", "danny dorito", "cauliflower pizza", "snowman", "peppermint",
"cocoa", "dragon", "the quick brown fox jumps over the lazy dog", "pizza", "waterfall", "jewel",
"applesauce", "xylophone", "stonks", "raindrops", "snowmen", "squirrel", "nacho chips",
"help ive fallen and i cant get up", "fitness gram pacer test", "snowball", "ice cream",
"what is love", "vulture", "ice cube", "freddy fazbear", "herobrine", "regeneration",
"i sawed this boat in half", "damage", "kitty", "hamburger", "jellybean", "lolipop",
"its free real estate", "crayon", "hot n crispy", "eggses", "pepperoni", "indeed a word",
"its raining tacos", "a  g r e a t  w a l l", "snake in my boot", "creeper aw man",
"teddy bear", "blanket", "vanilla", "sugar", "bright", "starry night", "olives",
"salmon", "gandalf the gray", "gold into straw", "tuesday", "dungeon", "search and destroy",
"battle royale", "breakfast", "happy and you know it", "survive the night", "pressure",
"mr stark i dont feel so good", "i am inevitable", "meme lord", "wherefore art thou romeo",
"grandfather clock", "wyvern", "mjolnir", "viking", "phoenix", "rotten eggs", "swallow your soul",
"kangaroo", "man of the hour", "sweater", "hot and spicy chicken wings", "jacket",
"dinosaur shaped chicken nuggets", "mac n cheese", "pancakes", "hydrate or diedrate",
"fogged glass", "freightening", "superpower", "technokinetic", "rocket science",
"pringle", "beach", "sky light", "poignant", "osteoperosis", "tower", "chalk board",
"square one", "maple syrup", "sometimes", "blade dance", "sword flay", "extra moist",
"easter egg", "the snack that smiles back", "eggcellent news", "pneumonoultramicroscopicsilicavolcanoconiosis"];

module.exports = {
    name: "hangman",
    description: "",
    async execute(message, msg, args, cmd, prefix, mention, client) {
        var up1 = await message.reply("You've initiated Hangman!");
        up1.delete({timeout: 10000});

        var secret = words[Math.floor(Math.random() * words.length)];
        var disp = "";
        var wlen = 0;
        for (i = 0; i < secret.length; i++) {
            if (secret.charAt(i) == " ") {
                disp += " ";
            } else {
                disp += "_";
                wlen += 1;
            };
        };

        var att = 8;
        var corrG = 0;
        var bottT = "Send one letter to make a guess!";
        var filter = m => m.author.id === message.author.id;

        var hangmanEmbed = new Discord.MessageEmbed()
        .setAuthor("Hangman", message.author.avatarURL())
        .addField(`${corrG} correct of ${wlen}`, `\`${disp}\``)
        .addField("Status", `Player: ${message.member.displayName}\nIncorrect Guesses Left: ${att}/8\n\n${bottT}`)
        .setColor("DC134C")
        .setFooter("Valkyre", client.user.avatarURL())
        .setTimestamp();

        var he = await message.channel.send(hangmanEmbed);
        var done = false;
        var letters = [];
       
        async function make_guess() {
            try {
                if (disp == secret) {
                    bottT = `You won! Yay! The word was ${secret}.`; 
                    done = true; 
                    var hangmanEmbed = new Discord.MessageEmbed()
                    .setAuthor("Hangman", message.author.avatarURL())
                    .addField(`${corrG} correct of ${wlen}`, `\`${disp}\``)
                    .addField("Status", `Player: ${message.member.displayName}\nIncorrect Guesses Left: ${att}/8\n\n${bottT}`)
                    .setColor("DC134C")
                    .setFooter("Valkyre", client.user.avatarURL())
                    .setTimestamp();
                    return await he.edit(hangmanEmbed);
                };
                if (att > 0) {
                    var guessCollected = await message.channel.awaitMessages(filter, {time: 200000, max: 1});
                    var guess = guessCollected.first().content.toLowerCase();
                    message.channel.messages.fetch({limit: 10}).then((messages) => {
				        var filterBy = message.author ? message.author.id : Client.message.author.id;
				        messages = messages.filter(m => m.author.id === filterBy).array().slice(0, 1);
				        message.channel.bulkDelete(messages).catch(console.error);
			        });
                    if (guess.length !== 1) {
                        message.reply("You must make a guess of just one letter!");
                    } else if (guess in letters) {
                        message.reply("You have already guessed that letter!");
                    } else {
                        var temps = "";
                        for (i = 0; i < secret.length; i++) {
                            if (guess == secret.charAt(i)) {
                                temps += secret.charAt(i);
                                var cthist = true;
                                corrG += 1;
                            } else {
                                temps += disp.charAt(i);
                            };
                        };
                        disp = temps;
                        if (!cthist == true) {
                            att -= 1;
                        };
                        letters.push(guess);
                    };
                    var hangmanEmbed = new Discord.MessageEmbed()
                    .setAuthor("Hangman", message.author.avatarURL())
                    .addField(`${corrG} correct of ${wlen}`, `\`${disp}\``)
                    .addField("Status", `Player: ${message.member.displayName}\nIncorrect Guesses Left: ${att}/8\n\n${bottT}`)
                    .setColor("DC134C")
                    .setFooter("Valkyre", client.user.avatarURL())
                    .setTimestamp();
                    await he.edit(hangmanEmbed);
                } else {
                    bottT = "You ran out of gueses! Game over. The word was " + secret;
                    done = true;
                    var hangmanEmbed = new Discord.MessageEmbed()
                    .setAuthor("Hangman", message.author.avatarURL())
                    .addField(`${corrG} correct of ${wlen}`, `\`${disp}\``)
                    .addField("Status", `Player: ${message.member.displayName}\nIncorrect Guesses Left: ${att}/8\n\n${bottT}`)
                    .setColor("DC134C")
                    .setFooter("Valkyre", client.user.avatarURL())
                    .setTimestamp();
                    return await he.edit(hangmanEmbed);
                }
            } catch (err) {
                bottT = "You ran out of time!";
                done = true;
                var hangmanEmbed = new Discord.MessageEmbed()
                .setAuthor("Hangman", message.author.avatarURL())
                .addField(`${corrG} correct of ${wlen}`, `\`${disp}\``)
                .addField("Status", `Player: ${message.member.displayName}\nIncorrect Guesses Left: ${att}/8\n\n${bottT}`)
                .setColor("DC134C")
                .setFooter("Valkyre", client.user.avatarURL())
                .setTimestamp();
                return he.edit(hangmanEmbed);
            };
        };
        while (done == false) {
            await make_guess();
        };
        return;
    }
};