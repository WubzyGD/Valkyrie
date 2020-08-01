const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    name: "char",
    description: "",
    async execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}char <create|view|edit|delete>\``);};
        var td = args[0];
        if (td == "create") {
            try {
                if (message.channel.type !== "dm") {return message.reply("You must create a character in a DM with me first, and then you can use your character anywhere!");};
                
                await message.channel.send("You will be asked a series of questions about your character. At any time, you can type \"skip\" to omit an option. You can always come back to it later.");
                //await message.channel.send("And, please keep in mind that inappropriate/sexual characters aren't allowed. Let's just try and keep things civil and SFW, as I am an SFW bot :) A Valkyrie admin can remove your character at any time if they feel that it is offensive or overly lewd.")

                var filter = m => m.author.id === message.author.id;
                await message.channel.send("What format would you like to use? this can be \"rp\" (roleplay) for characters with more detailed descriptions, but less DnD-esque stuff, or \"DnD\" for a standard basic 5e sheet. ~~Wubzy is hella lazy and isn't gonna put it on a real digital sheet *yet*~~");
                var format = await message.channel.awaitMessages(filter, {time: 2000000, max: 1, errors: ["time"]});
                format = format.first().content;

                async function query(prompt, charLim) {
                    await message.channel.send(`${prompt} Lim: ${charLim}`);
                    var temp = await message.channel.awaitMessages(filter, {time: 2000000, max: 1, errors: ["time"]});
                    temp = temp.first().content;
                    if (typeof(charLim) == "number") {if (temp.length > charLim) {temp = temp.slice(0, charLim);};};
                    if (temp.toLowerCase().trim() == "skip") {temp = "Omitted";};
                    return temp;
                };

                if (format.toLowerCase().trim().includes("rp")) {
                    await message.channel.send("What is your __rp__ character's name? Chars limit: 40. Any characters over 40 will be sliced off, and this will be the case for all questions.");
                    var cname = await message.channel.awaitMessages(filter, {time: 1000000, max: 1, errors: ["time"]});
                    cname = cname.first().content; if (cname.length > 40) {cname = cname.slice(0, 40);};
                    if (cname.toLowerCase() == "skip") {return message.reply("Remember what I said about being able to skip anything? That was kinda a lie, you have to name your character, silly. ~~I may be a dumb bot but~~ I'm not that stupid.");};
                    var cid = await query("And one more thing: Give them an ID. This should have no spaces, and must be alphanumeric, with only underscores. This ID is not editable. If you make a character with an already-existing ID, the old one will be overwritten.", 50);
                    cid = cid.replace(/\s/g, '').trim().toLowerCase();
                    if (!/^[a-z0-9_]+$/.test(cid.trim().toLowerCase())) {return message.reply("You must use alphanumeric characters and underscores only!");};
                    if (cid.toLowerCase() == "skip") {return message.reply("Oh yeah, and you have to have an ID, too.");};
                    var cspecies = await query(`What is ${cname}'s species?`, 50);
                    var cheight = await query("What is their height?", 10);
                    var cweight = await query("What is their weight?", 10);
                    var cdesc = await query(`Give a very brief appearance description of ${cname}. E.g. body type, facials, etc.`, "None");
                    var cgender = await query(`What is their gender?`, 30);
                    var cage = await query("How old are they?", 75);
                    var cnicks = await query("What are their nicknames?", 200);
                    var cpersonality = await query("Describe your character's personality. Consider their strengths and weaknesses, too.", 1000);
                    var cskills = await query("What are some things you character is skilled at?", 500);
                    var chobbies = await query("What are their hobbies?", "None");
                    var cflaws = await query("Describe some of your character's personality flaws.", 500);
                    var cvirtues = await query("Describe some of their virtues - the things that make them great.", 500);
                    var capparel = await query("Describe you character's apparel and appearance.", 1500);
                    var cocquery = await query("Is your character an OC (Original Character?) If it was not created by you, or it is very closely based on someone else's character, then it is not an OC. Respond with `yes` or `no`.", 3);
                    if (cocquery.toLowerCase().includes("y")) {cocquery = true;} else if (cocquery.toLowerCase().includes("n")) {cocquery = false;} else {return message.reply("You must use yes or no.");};
                    var cimage = await query("If you have an image to use for your character, send **a link to it. Sending it here will not work. Send it elsewhere and copy the link**.", 350);
                    var creference = await query("If you have a blog or post or other link that contains more information on your character, send the link to it here. **Post an NSFW link and you will suffer my wrath!**", 350);
                    var cpowers = await query("Do they have any powers or magical abilities?", "None");
                    if (cpowers !== "Omitted") {var cpowersclass = await query("What elemental or class of powers/magic does your character have?", 300);} else {cpowersclass = "N/A";};
                    var cbirth = await query("Where and when was your character born?", 250);
                    var cnotes = await query(`Any extra notes about ${cname}?`, "None");

                    const thisChar = {
                        name: cname,
                        id: cid,
                        species: cspecies,
                        height: cheight,
                        weight: cweight,
                        description: cdesc,
                        gender: cgender,
                        age: cage,
                        nicknames: cnicks,
                        personality: cpersonality,
                        skills: cskills,
                        hobbies: chobbies,
                        flaws: cflaws,
                        virtues: cvirtues,
                        apparel: capparel,
                        is_oc: cocquery,
                        ref_image: cimage,
                        ref_link: creference,
                        powers: cpowers,
                        elemental: cpowersclass,
                        birth_info: cbirth,
                        other_notes: cnotes
                    };

                    if (fs.existsSync(`./data/chars/${message.author.id}.json`)) {
                        fs.readFile(`./data/chars/${message.author.id}.json`, 'utf8', function readFileCallback(err, data){
                            if (err) {
                                console.log(err);
                            } else {
                            chars = JSON.parse(data);
                            chars.chars.rp[cid] = thisChar;
                            json = JSON.stringify(chars);
                            fs.writeFileSync(`./data/chars/${message.author.id}.json`, json, 'utf8');
                        }});
                    } else {
                        var chars = {
                            chars: {
                                rp: {},
                                dnd: {}
                            }
                        };
                        chars.chars.rp[cid] = thisChar;
                        var json = JSON.stringify(chars);
                        fs.writeFileSync(`./data/chars/${message.author.id}.json`, json, 'utf8');
                    };
                    return message.channel.send(`**Your character, ${cname}, was successfully created! To view it, use \`${prefix}char view ${cid}\`. To see a list of your characters' IDs, use \`${prefix}char view list}\`**. Your character can now be accessed in any server that I am in, and updated anywhere. Using \`${prefix}char view text ${cid}\` will have me give you a text file of your character's info.`);
                } else if (format.toLowerase().trim().includes("dnd")) {
                    await message.channel.send("What is your __DnD__ character's name? Chars limit: 40. Any characters over 30 will be sliced off, and this will be the case for all questions.");
                    var name = await message.channel.awaitMessages(filter, {time: 1000000, max: 1, errors: ["time"]});
                    name = name.first.content().slice(0, 40);
                    var cid = await query("And one more thing: Give them an ID. This should have no spaces, and must be alphanumeric, with only underscores. This ID is not editable. If you make a character with an already-existing ID, the old one will be overwritten.", 50);
                    cid = cid.replace(/\s/g, '').trim().toLowerCase();
                    if (!/^[a-z0-9_]+$/.test(cid.trim().toLowerCase())) {return message.reply("You must use alphanumeric characters and underscores only!");};
                    if (cid.toLowerCase() == "skip") {return message.reply("Oh yeah, and you have to have an ID, too.");};
                    var cspecies = await query(`What is ${cname}'s species?`, 50);
                    var cheight = await query("What is their height?", 10);
                    var cweight = await query("What is their weight?", 10);
                    var cdesc = await query(`Give a very brief appearance description of ${cname}. E.g. body type, facials, etc.`, "None");
                    var cgender = await query(`What is their gender?`, 30);
                } else {return message.reply("You didn't specify a valid format. Try again!");};
            } catch (e) {
                message.reply("Looks like you ran out of time. --If you're certain that you didn't take more than about 100 seconds, contact my creator.");
            };
        } else if (td == "edit") {

        } else if (td == "view") {
            args.shift();
            if (!args.length) {return message.channel.send(`You must provide first the character's type (\`rp\` or \`DnD\`), then an ID of the character you wish to view. If you do not know the character's ID, use \`list\` as the ID to see all of you characters' IDs.`);};
            if (fs.existsSync(`./data/chars/${message.author.id}.json`)) {
                var chars = JSON.parse(fs.readFileSync(`./data/chars/${message.author.id}.json`));
                chars = chars.chars;
            } else {return message.reply("You don't have any characters made!");};
            function viewChar(type, char) {
                try {
                    var charEmbed = new Discord.MessageEmbed().setAuthor(char.name, message.author.avatarURL())
                    .setDescription(`${type} Character made by ${message.author.username}`)
                    .addField("Base Info", `**Name**: ${char.name}\n\n**Age**: ${char.age}\n**Gender**: ${char.gender}\n**Species**: ${char.species}\n**Aliases/Nicknames**: ${char.nicknames}`)
                    .addField("Physical", `**Height**: ${char.height}\n**Weight**: ${char.weight}`)
                    .addField("Physical Description", char.description)
                    .addField("Personality", `**Personality**: ${char.personality}\n\n**Virtues**: ${char.virtues}\n\n**Flaws**: ${char.flaws}`)
                    .addField("Apparel", char.apparel)
                    .addField("Attributes", `**Skills**: ${char.skills}\n**Hobbies**: ${char.hobbies}\n**Powers**: ${char.powers}\n**Class/Elemental**: ${char.elemental}`)
                    .addField("Other Info", `**Birth Info**: ${char.birth_info}\n**Other Notes**: ${char.other_notes}`)
                    .setColor("DC134C").setFooter("Valkyrie", client.user.avatarURL()).setTimestamp();
                    if (char.ref_image != "Omitted") {try {
                        charEmbed.addField("Image Source", `[${char.name} Ref Img](${char.ref_image})`, true);
                        charEmbed.setImage(char.ref_image); } catch {message.author.send("It seems like the link you provided for the image for your character is invalid. Please edit your character and fix this!");};
                    };
                    if (char.ref_link != "Omitted") {charEmbed.addField("Reference Link", `Go [here](${char.ref_link}) to learn more.`, true);};
                    return message.channel.send(charEmbed);
                } catch (e) {console.log(`Error while displaying character: ${e}`); return message.reply("There was an error in displaying your character. Most likely, if you had an image for your character, you gave a bad link. It's possible that you had too many letters in your character's bio fields, in which case, yell at Wubzy for me and he'll make a fix.");};
            };
            if (args[0] == "list") {
                var lsr = "";
                var lsd = "";
                if (Object.keys(chars.rp).length > 0) {for (var charid of Object.keys(chars.rp)) {lsr += `**${Object.keys(chars.rp).indexOf(charid) + 1}.** \`${charid}\`\nName: ${chars.rp[charid].name}\n\n`;};}
                else {lsr = "No RP Characters made yet!";};
                if (Object.keys(chars.dnd).length > 0) {for (var charid of Object.keys(chars.dnd)) {lsd += `**${Object.keys(chars.dnd).indexOf(charid) + 1}.** \`${charid}\`\nName: ${chars.dnd[charid].name}\n\n`;};}
                else {lsd = "No DnD Characters made yet!";};
                return message.channel.send(new Discord.MessageEmbed()
                .setAuthor("Character List", message.author.avatarURL())
                .setDescription(`For ${message.author.username}`)
                .addField("RP Characters", lsr)
                .addField("DnD Characters", lsd)
                .setColor("DC134C")
                .setFooter("Valkyrie")
                .setTimestamp());
            } else if (args[0] == "rp") {
                if (args[1] == "list") {
                    var lsr = "";
                    if (Object.keys(chars.rp).length > 0) {for (var charid of Object.keys(chars.rp)) {lsr += `**${Object.keys(chars.rp).indexOf(charid) + 1}.** \`${charid}\`\nName: ${chars.rp[charid].name}\n\n`;};}
                    else {lsr = "No RP Characters made yet!";};
                    return message.channel.send(new Discord.MessageEmbed()
                    .setAuthor("Character List", message.author.avatarURL())
                    .setDescription(`For ${message.author.username}`)
                    .addField("RP Characters", lsr)
                    .setColor("DC134C")
                    .setFooter("Valkyrie")
                    .setTimestamp());
                } else {if (Object.keys(chars.rp).includes(args[1])) {viewChar("RP", chars.rp[args[1]]);} else {return message.reply("I don't seem to have the character you're looking for.");};};
            } else if (args[0] == "dnd") {
                if (args[1] == "list") {
                    var lsd = "";
                    if (Object.keys(chars.dnd).length > 0) {for (var charid of Object.keys(chars.dnd)) {lsd += `**${Object.keys(chars.dnd).indexOf(charid) + 1}.** \`${charid}\`\nName: ${chars.dnd[charid].name}\n\n`;};}
                    else {lsd = "No DnD Characters made yet!";};
                    return message.channel.send(new Discord.MessageEmbed()
                    .setAuthor("Character List", message.author.avatarURL())
                    .setDescription(`For ${message.author.username}`)
                    .addField("DnD Characters", lsd)
                    .setColor("DC134C")
                    .setFooter("Valkyrie")
                    .setTimestamp());
                } else {if (Object.keys(chars.dnd).includes(args[1])) {viewChar("DnD", chars.dnd[args[1]]);} else {return message.reply("I don't seem to have the character you're looking for.");};};
            } else {return message.reply("Please specify either `list`, or the character's type, `rp` or `dnd`");};
        } else if (args[0] == "delete") {
            args.shift();
            if (!args.length) {return message.channel.send(`You must provide first the character's type (\`rp\` or \`DnD\`), then an an ID of the character you wish to delete. If you do not know the character's ID, use \`list\` as the ID to see all of you characters' IDs.`);};
            if (fs.existsSync(`./data/chars/${message.author.id}.json`)) {
                var chars = JSON.parse(fs.readFileSync(`./data/chars/${message.author.id}.json`));
                chars = chars.chars;
            } else {return message.reply("You don't have any characters made!");};
            async function delChar(type, char) {
                await message.channel.send(`Are you absolutely positive you want to delete ${char.name}? It cannot be undone!`);
                var filter = m => m.author.id == message.author.id;
                var temp = await message.channel.awaitMessages(filter, {time: 2000000, max: 1, errors: ["time"]});
                temp = temp.first().content;
                if (temp.toLowerCase() == "yes") {
                    delete chars[type][char.id];
                    var data = JSON.stringify({"chars": chars});
                    fs.writeFileSync(`./data/chars/${message.author.id}.json`, data, 'utf8');
                    return message.reply("Okay, I deleted that character.");
                } else {return message.reply("Okay, I won't delete anything.");};
            };
            if (args[0] == "rp") {
                if (Object.keys(chars.rp).includes(args[1])) {delChar("rp", chars.rp[args[1]]);} else {return message.reply("I don't seem to have the character you're looking for.");};
            } else if (args[0] == "dnd") {
                if (Object.keys(chars.dnd).includes(args[1])) {delChar("dnd", chars.dnd[args[1]]);} else {return message.reply("I don't seem to have the character you're looking for.");};
            } else {return message.reply("You must specify the type, `rp` or `dnd`!");};
        } else {return message.reply(`Invalid syntax. Syntax: \`${prefix}char <create|view|edit|delete>\``);};
    }
};