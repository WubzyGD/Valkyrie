const Discord = require("discord.js");
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

module.exports = {
    name: "color",
    description: "",
    async execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`Syntax \`${prefix}color <hex|rgb|random>\` <color>`);};
        if (args[0] == "hex") {
            args.shift();
            var hex = args[0].trim();
            if (hex.startsWith("#")) {hex = hex.slice(1);};
            if (hex.includes(" ")) {hex = hex.replace(/ /g, "");};
            if (!hex.match(/^[a-z0-9]+$/ig) || hex.length !== 6) {return message.reply("You must use only letters and numbers, and only six of them.");};
            var rv = changeBase(hex.slice(0, 2), 16, 10);
            var gv = changeBase(hex.slice(2, 4), 16, 10);
            var bv = changeBase(hex.slice(3, 5), 16, 10);
        } else if (args[0] == "rgb") {
            args.shift();
            if (!args.length == 3) {return message.reply("You must have three digits separated by spaces for an RGB input.");};
            var rv = args[0];
            var gv = args[1];
            var bv = args[2];
            for (i of args) {
                if (isNaN(i)) {return message.reply("You must provide three numbers.");};
                if (i > 255 || i < 0) {return message.reply("You must use three numbers between 0 and 255, inclusive");};
            };
            var rvh = changeBase(rv, 10, 16); if (rvh.length == 1) {rvh = `${rvh}0`;};
            var gvh = changeBase(gv, 10, 16); if (gvh.length == 1) {gvh = `${gvh}0`;};
            var bvh = changeBase(bv, 10, 16); if (bvh.length == 1) {bvh = `${bvh}0`;};
            var hex = `${rvh}${gvh}${bvh}`;
        } else {return message.reply("You must specify either hex or rgb first.");};

        const canvas = Canvas.createCanvas(500, 500);
		const ctx = canvas.getContext('2d');

        ctx.fillStyle = `#${hex}`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        var colorIm = new Discord.MessageAttachment(canvas.toBuffer(), "color.png");

        var colorEmbed = new Discord.MessageEmbed()
        .setAuthor("Generated Color", message.author.avatarURL())
        .setDescription(`Hex Value: #${hex}`)
        .addField("Red", rv, true)
        .addField("Green", gv, true)
        .addField("Blue", bv, true)
        .setColor(hex)
        .attachFiles(colorIm)
        .setImage("attachment://color.png");
        if (hex.toLowerCase() == "dc134c") {colorEmbed.addField("Hey there!", "That's my normal embed color!");};
        return message.reply(colorEmbed);
    }
};