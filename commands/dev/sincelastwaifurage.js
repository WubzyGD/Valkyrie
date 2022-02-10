const Discord = require('discord.js');
const moment = require('moment');
require('moment-precise-range-plugin');

const BotData = require("../../models/bot");

module.exports = {
    name: "sincelastwaifurage",
    aliases: [],
    meta: {
        category: 'Developer',
        description: "nothing to see here",
        syntax: '`sincelastwaifurage`',
        extra: null
    },
    help: new Discord.MessageEmbed()
        .setTitle("Help -> ")
        .setDescription("")
        .addField("Syntax", "`sincelastwaifurage`"),
    async execute(message, msg, args, cmd, prefix, mention, client) {
        if (!client.developers.includes(message.author.id)) {return message.channel.send("Forbidden");}
        const bot = await BotData.findOne({finder: 'lel'});
        if (!args.length) {
            message.channel.send(`${moment.preciseDiff(Date.now(), bot.lastWaifuRage)} since last waifugami rage incident.`);
        } else {
            bot.lastWaifuRage = new Date().getTime();
            bot.save();
            return message.channel.send("Make that 0 days since Wubzy's last waifu rage incident.");
        }
    }
};