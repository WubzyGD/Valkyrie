const Discord = require("discord.js");

module.exports = {
    name: "update",
    description: "",
    async execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}update <up|new>\``);};
        if (message.author.id != "330547934951112705") {return message.reply("Sorry, but only Wubzy can do that!");};
        var upde = new Discord.MessageEmbed();
        if (args[0] == "up") {upde.setTitle("New feature added!"); upde.setColor("00ff00");} else if (args[0] == "new" || args[0] == "p") {upde.setTitle("New planned feature/progress update!"); upde.setColor("6912a3");} else {return message.reply("Now listen here you little idiot. `up` or `new`. Not that hard.");};
        var filter = m => m.author.id == "330547934951112705";
        await message.channel.send("What would you like the update text to be?");
        var desc = await message.channel.awaitMessages(filter, {time: 200000, max: 1});
        desc = desc.first().content;
        if (desc.includes("{{n}}")) {desc.replace(/{{n}}/g, "\n\n");};
        upde.setDescription(desc);
        await message.channel.send("Would you like an image?");
        var imgyn = await message.channel.awaitMessages(filter, {time: 200000, max: 1});
        if (imgyn.first().content.toLowerCase() != "no") {upde.setImage(imgyn.first().content);};
        upde.setThumbnail(client.user.avatarURL());
        return message.channel.send(upde);
        //return client.guilds.cache.get("679127746592636949").channels.cache.get("689965400687247398").send(upde);
        /*client.guilds.cache.forEach(async g => {

        })*/
    }
};