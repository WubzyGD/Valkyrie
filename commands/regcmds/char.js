const Discord = require("discord.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});
const CharIndex = sequelize.define('charindex', {
    user_id: {
        type: Sequelize.STRING,
        unique: true
    },
    char_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    combo_key_int_index: {
        type: Sequelize.STRING,
        defaultValue: ""
    },
    char_names: {
        type: Sequelize.STRING,
        defaultValue: ""
    }
});
const RpChars = sequelize.define('rpchars', {
    user_id: Sequelize.STRING,
    owner_name: Sequelize.STRING,
    char_num: Sequelize.INTEGER,
    combo_key: {
        type: Sequelize.STRING,
        unique: true
    },
    combo_key_int: {
        type: Sequelize.STRING,
        unique: true
    },

    name: Sequelize.STRING,
    species: Sequelize.STRING,
    height: Sequelize.STRING,
    weight: Sequelize.STRING,
    description: Sequelize.STRING,
    gender: Sequelize.STRING,
    personality: Sequelize.STRING,
    skills: Sequelize.STRING,
    apparel: Sequelize.STRING,
    age: Sequelize.STRING,
    oc_query: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    image_link: {
        type: Sequelize.STRING,
        defaultValue: "Omitted"
    },
    reference_source: Sequelize.STRING,
    powers: {
        type: Sequelize.STRING,
        defaultValue: "Omitted"
    },
    powers_class: {
        type: Sequelize.STRING,
        defaultValue: "Omitted"
    },
    birth_place: Sequelize.STRING,
    extra_notes: Sequelize.STRING
});
CharIndex.sync();
RpChars.sync();

module.exports = {
    name: "char",
    description: "",
    async execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}char <create|view|edit|delete>\``);};
        var td = args[0];
        if (td == "create") {
            try {
                if (message.channel.type !== "dm") {return message.reply("You must create a character in a DM with me first, and then you can use your character anywhere!");};
                
                var userindex = await CharIndex.findOne({where: {user_id: message.author.id}});
                if (userindex && (userindex.char_count >= 5)) {return message.reply("It looks like you have reached your limit of 5 characters. You can remove old ones to make room for this one! In the future, the 5 character limit may be increased.");};

                await message.channel.send("You will be asked a series of questions about your character. At any time, you can type \"skip\" to omit an option. You can always come back to it later.");
                
                var filter = m => m.author.id === message.author.id;
                await message.channel.send("What format would you like to use? this can be \"rp\" (roleplay) for characters with more detailed descriptions, but less DnD-esque stuff, or \"DnD\" for a standard basic 5e sheet. ~~Wubzy is hella lazy and isn't gonna put it on a real digital sheet *yet*~~");
                var format = await message.channel.awaitMessages(filter, {time: 2000000, max: 1, errors: ["time"]});
                format = format.first().content;

                async function query(prompt, charLim) {
                    await message.channel.send(`${prompt} Lim: ${charLim}`);
                    var temp = await message.channel.awaitMessages(filter, {time: 100000, max: 1, errors: ["time"]});
                    temp = temp.first().content;
                    if (temp.length > charLim) {temp = temp.slice(0, charLim);};
                    if (temp.toLowerCase().trim() == "skip") {temp = "Omitted";};
                    return temp;
                };

                if (format.toLowerCase().trim().includes("rp")) {
                    await message.channel.send("What is your __rp__ character's name? Chars limit: 30. Any characters over 30 will be sliced off, and this will be the case for all questions.");
                    var cname = await message.channel.awaitMessages(filter, {time: 1000000, max: 1, errors: ["time"]});
                    cname = cname.first().content; if (cname.length > 30) {cname = cname.slice(0, 30);};
                    if (cname.toLowerCase() == "skip") {return message.reply("Remember what I said about being able to skip anything? That was kinda a lie, you have to name your character, silly. ~~I may be a dumb bot but~~ I'm not that stupid.");};

                    var cspecies = await query(`What is ${cname}'s species?`, 30);
                    var cheight = await query("What is their height?", 7);
                    var cweight = await query("What is their weight?", 7);
                    var cdesc = await query(`Give a very brief description of ${cname}.`, 200);
                    var cgender = await query(`What is their gender?`, 10);
                    var cpersonality = await query("Describe your character's personality. Consider their strengths and weaknesses, too.", 1000);
                    var cskills = await query("What are some things you character is skilled at?", 250);
                    var capparel = await query("Describe you character's apparel and appearance.", 1000);
                    var cage = await query("How old are they?", 15);
                    var cocquery = await query("Is your character an OC (Original Character?) Respond with `yes` or `no`.");
                    if (cocquery.toLowerCase().includes("y")) {cocquery = true;} else if (cocquery.toLowerCase().includes("n")) {cocquery = false;} else {return message.reply("You must use yes or no.");};
                    var cimage = await query("If you have an image to use for your character, send it.", 150);
                    var creference = await query("If you have a blog or post or other link that contains more information on your character, send the link to it here.", 150);
                    var cpowers = await query("Do they have any powers or magical abilities?", 500);
                    if (cpowers !== "Omitted") {var cpowersclass = await query("What elemental or class of powers/magic does your character have?", 150);} else {cpowersclass = "Omitted";};
                    var cbirth = await query("Where and when was your character born?", 50);
                    var cnotes = await query(`Any extra notes about ${cname}?`, 1000);

                    if (!userindex) {await CharIndex.create({user_id: message.author.id});};
                    
                    if (!userindex) {var ccharnum = 1;} else {
                        var combo_key_ints = [`${message.author.id}.1`, `${message.author.id}.2`, `${message.author.id}.3`, `${message.author.id}.4`, `${message.author.id}.5`];
                        for (i of combo_key_ints) {
                            var t = await RpChars.findOne({where: {combo_key_int: i}});
                            if (!t) {
                                var ckeyint = `${message.author.id}.${combo_key_ints.indexOf(t) + 1};`;
                                ccharnum = combo_key_ints.indexOf(t) + 1;
                                break;
                            } else {};
                        };
                    };

                    await RpChars.create({
                        user_id: message.author.id,
                        owner_name: message.author.name,
                        char_num: ccharnum,
                        combo_key: `${message.author.id}.${cname}`,
                        combo_key_int: `${message.author.id}.${ccharnum}`,
                        name: cname,
                        species: cspecies,
                        height: cheight,
                        weight: cweight,
                        description: cdesc,
                        gender: cgender,
                        personality: cpersonality,
                        skills: cskills,
                        apparel: capparel,
                        age: cage,
                        oc_query: cocquery,
                        image_link: cimage,
                        reference_source: creference,
                        powers: cpowers,
                        powers_class: cpowersclass,
                        birth_place: cbirth,
                        extra_notes: cnotes
                    });
                    var userindex = await CharIndex.findOne({where: {user_id: message.author.id}});
                    var ccharnames = "";
                    for (i of userindex.char_names.split(";")) {
                        if (i == "empty" && userindex.char_names.split(";").indexOf(i) == ccharnum - 1) {ccharnames += cname;}
                        else {ccharnames += i;};
                    };
                    await CharIndex.update({combo_key_int_index: combo_key_ints, char_names: ccharnames});
                    await userindex.increment

                    return message.channel.send(`**Your character, ${cname}, was successfully created! To view it, use \`${prefix}char view ${ccharnum}\`. To see a list of your characters and which number they are, use \`${prefix}char view list}\`**. Your character can now be accessed in any server that I am in and updated anywhere. Using \`${prefix}char view text ${ccharnum}\` will have me give you a text file of your character's info.`);
                } else if (format.toLowerase().trim().includes("dnd")) {
                    await message.channel.send("What is your __DnD__ character's name? Chars limit: 30. Any characters over 30 will be sliced off, and this will be the case for all questions.");
                    var name = await message.channel.awaitMessages(filter, {time: 1000000, max: 1, errors: ["time"]});
                    name = name.first.content().slice(0, 30);
                } else {return message.reply("You didn't specify a valid format. Try again!");};
            } catch (e) {
                message.reply("Looks like you ran out of time. --If you're certain that you didn't take more than about 100 seconds, contact my creator.");
            };
        } else if (td == "edit") {

        } else if (td == "view") {
            args.shift();
            if (!args.length) {return message.reply(`Syntax: \`${prefix}char view <key|mention|text|list>\``);};
            var userindex = await CharIndex.findOne({where: {user_id: message.author.id}});
            if (!userindex || userindex.char_count < 1) {return message.reply("You do not have any characters made!");};
            if (!isNaN(args[0]) && Number(args[0]) <= 5 && Number(args[0]) >= 1) {
                if (userindex.char_names.split(";")[Number(args[0]) + 1] == "empty") {return message.reply("The character index you provided was an empty character. In other words, you haven't created the character with that numebr yet.");};
                var charIntKey = userindex.char_names.split(";")[Number(args[0]) + 1];
                if (charIntKey.includes(".")) {
                    try {
                        var dispChar = await RpChars.findOne({where: {combo_key_int: charIntKey}});
                        var rpcharembed = new Discord.RichEmbed()
                        .setTitle(`Character Sheet for ${dispChar.name}`)
                        .setDescription(`Created by `) 
                    } catch (e) {
                        return message.reply("Hey there! Wubzy speaking! So uh something happened there, and likely, it is completely my fault, unless you're trying to game the system. Direct message me at WubzyGD#8766 and tell me that you got this message.");
                    };
                } else if (charIntKey.includes("!")) {

                } else {return message.reply("Hey there! Wubzy speaking! So uh something happened there, and likely, it is completely my fault, unless you're trying to game the system. Direct message me at WubzyGD#8766 and tell me that you got this message.");};
            };
        } else {return message.reply(`Invalid syntax. Syntax: \`${prefix}char <create|view|edit|delete>\``);};
    }
};