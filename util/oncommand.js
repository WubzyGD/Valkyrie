const Discord = require('discord.js');
const UserData = require('../models/user');

module.exports = async (message, msg, args, cmd, prefix, mention, client) => {
    let botData = await require('../models/bot').findOne({finder: 'lel'});
    botData.commands = botData.commands + 1;
    botData.save();
    let tu = await UserData.findOne({uid: message.author.id}) || new UserData({uid: message.author.id});
    tu.commands++;

    if (tu.commands > 50 && !tu.msg) {
        await message.author.send({embeds: [new Discord.MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL({size: 2048}))
            .setDescription(`Hey there **${message.author.username}**! Looks like you've used my commands over **50 times**${tu.commands > 51 ? ` (${tu.commands} to be exact)` : ''}!\nThis is good ol' dragon lady coming to you with some :star:news:star:: I need attention! Give me attention! Seriously, I hope you're enjoying my help ^^`)
            .addField("What next?", "If you're enjoying what I do, you can [join my support server](https://discord.gg/T2JZtuf) to leave feedback and say hi to my developers. You can also consider [giving the repository a star](https://github.com/WubzyGD/Valkyrie) to show your support! I look forward to my time with you in the future <:NC_hearty:841489530413383712>")
            .setFooter({text: "Valkyrie"})
            .setTimestamp()
            .setColor('dc134c')
        ]}).catch(() => {});
        tu.msg = true;
    }

    await tu.save();
};