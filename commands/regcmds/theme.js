const Discord = require("discord.js");
const fs = require("fs");
const path = require("path")
const Canvas = require("canvas");

function changeBase(number, fromBase, toBase) {
    if (fromBase == 10)
        return (parseInt(number)).toString(toBase);
    else if (toBase == 10)
        return parseInt(number, fromBase);
    else {
        var numberInDecimal = parseInt(number, fromBase);
        return (parseInt(numberInDecimal)).toString(toBase);
    };
};

function checkVal(collected) {
    if (collected.toLowerCase().includes("skip")) {return "skip"};
    var arggs = collected.split(/ +/g);
    for (i of arggs) {if (isNaN(i.trim())) {return false};};
    return arggs;
};

module.exports = {
    name: "theme",
    description: "",
    async execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}theme <create|help|get>\``);};
        if (args[0] == "help") {
            var helpEmbed = new Discord.RichEmbed()
            .setTitle("Themes")
            .setDescription("This requires Better Discord.")
            .addField("Creation", `Use \`${prefix}theme create\` to make a theme.`)
            .addField("See other themes", `Use \`${prefix}theme get names\`.`)
            .addField("Credit", "puckzxz on Discord for allowing me to use a CSS template. Support the original theme here: https://github.com/puckzxz/NotAnotherAnimeTheme")
            .setColor("DC134C")
            .setFooter("Valkyre", client.user.avatarURL)
            .setTimestamp();
            return message.channel.send(helpEmbed);
        };
        if (args[0] == "get") {
            args.shift();
            if (!args.length) {return message.reply(`You must specify a theme name. View available themes using \`${prefix}theme get names\``);};
            if (args[0] == "names") {
                var avaThemes = "`original`";
                message.reply(`Available themes are: ${avaThemes}`);
            };
        };
        if (args[0] == "create") {
            try {
            message.channel.send("I'm going to ask you a series of questions, all you have to do is reply! You may choose to use \"skip\" on **__any__** option to use the original theme's settings.");
            message.channel.send("To start, paste a link to a background image for the theme. This must end in .png or .jpg. The easiest way to do this is to send it to a channel in discord (don't do it here) and right click > copy link.");
            var filter = m => m.author.id === message.author.id;
            var bgimg = await message.channel.awaitMessages(filter, {time: 1000000, max: 1, errors: ["time"]});
            bgimg = bgimg.first().content;
            if (bgimg.toLowerCase() == "skip") {bgimg = "https://i.imgur.com/j1Z6HVc.jpg";};
            
            message.channel.send("Send a color to apply a mask over the background image with. As a recommendation, use \"0 0 0\" to get a black dimmer on the image. You can use any RGB value, if you like, just space each value apart, and send only the numbers. Ex: 255 255 255");
            var bgmask = await message.channel.awaitMessages(filter, {time: 1000000, max: 1, errors: ["time"]});
            bgmask = checkVal(bgmask.first().content);
            if (!bgmask) {return message.reply("You must use only numbers.");};
            if (bgmask == "skip") {bgmask = ["0", "0", "0"];};
            if (bgmask.length !== 3) {return message.reply("You must provide eactly 3 values.");};
            
            message.channel.send("Send a number between 1 and 9, one being clear and 9 being almost opaque; this is how strong the color you just chose will layer over your bg image.");
            var bgmaskt = await message.channel.awaitMessages(filter, {time: 1000000, max: 1, errors: ["time"]});
            bgmaskt = checkVal(bgmaskt.first().content);
            if (!bgmaskt) {return message.reply("You must use only numbers.");};
            if (bgmaskt == "skip") {bgmaskt = ["7"]};
            if (bgmaskt.length !== 1) {return message.reply("You must provide eactly 1 value.");};
            if (Number(bgmaskt) > 9 || Number(bgmaskt) < 1) {return message.reply("Your number must be between 1 and 9, inclusive.");};
            
            message.channel.send("What do you want the theme color to be? (This mostly just applies to category names, oddly.) Use the three-number RGB method from before");
            var maincol = await message.channel.awaitMessages(filter, {time: 1000000, max: 1, errors: ["time"]});
            maincol = checkVal(maincol.first().content);
            if (maincol == "skip") {maincol = ["67", "181", "129"];};
            if (!maincol) {return message.reply("You must use only numbers.");};
            if (maincol.length !== 3) {return message.reply("You must provide eactly 3 values.");};

            var rvh = changeBase(maincol[0], 10, 16); if (rvh.length == 1) {rvh = `${rvh}0`;};
            var gvh = changeBase(maincol[1], 10, 16); if (gvh.length == 1) {gvh = `${gvh}0`;};
            var bvh = changeBase(maincol[2], 10, 16); if (bvh.length == 1) {bvh = `${bvh}0`;};
            var hex = `${rvh}${gvh}${bvh}`;
            const canvas = Canvas.createCanvas(500, 500);
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = `#${hex}`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            var colorIm = new Discord.Attachment(canvas.toBuffer(), "color.png");
            await message.channel.send("Your color:", colorIm);
            
            message.channel.send("Send a link for an image to use for the friends icon, or type \"pfp\" to use your profile picture as the friends icon.");
            var fricon = await message.channel.awaitMessages(filter, {time: 1000000, max: 1, errors: ["time"]});
            fricon = fricon.first().content;
            if (fricon.toLowerCase() == "skip") {fricon = "https://cdn.discordapp.com/attachments/619375459737534474/675414009524125696/received_179372666720019.gif";};
            if (fricon.toLowerCase() == "pfp") {fricon = message.author.avatarURL;};
            
            message.channel.send("Give your theme a name. Must not exceed 25 characters.");
            var themename = await message.channel.awaitMessages(filter, {time: 1000000, max: 1, errors: ["time"]});
            themename = themename.first().content;
            if (themename.toLowerCase() == "skip") {themename = `${message.author.username}'s Theme`;};
            if (themename.length > 25) {return message.reply("Your theme name must not exceed 25 characters.");};
            
            var txtfile = fs.readFileSync(path.resolve("./emptyTheme.txt"), "utf-8");
            var themetxt = txtfile.toString();
            
            themetxt = themetxt.replace(/{{themeName}}/g, themename);
            themetxt = themetxt.replace(/{{themeDescription}}/g, `Theme generated using Valkyrie, by ${message.author.username}#${message.author.discriminator}, with puckzxz's theme at https://github.com/puckzxz/NotAnotherAnimeTheme.`)
            themetxt = themetxt.replace(/{{themeAuthor}}/g, `${message.author.username}#${message.author.discriminator}, puckzxz#2080`);
            themetxt = themetxt.replace(/{{main-color}}/g, `rgb(${maincol[0]}, ${maincol[1]}, ${maincol[2]})`);
            themetxt = themetxt.replace(/{{main-transparency}}/g, `rgba(${bgmask[0]}, ${bgmask[1]}, ${bgmask[2]}, 0.${bgmaskt[0]})`);
            themetxt = themetxt.replace(/{{background-image}}/g, `url(${bgimg})`);
            themetxt = themetxt.replace(/{{friends-icon}}/g, `url(${fricon})`);
            
            var buffer = Buffer.from(themetxt, "utf-8"); 
            message.reply("Here's your completed theme!", new Discord.Attachment(buffer, `${themename}.theme.css`));
            txtfile = 0; buffer = 0; return themetxt = 0;
            } catch (e) {
                message.reply("Looks like you ran out of time. --If you're certain that you didn't take more than about 100 seconds, contact my creator.");
            };
        };
    }
};