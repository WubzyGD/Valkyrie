const Discord = require("discord.js");
const Canvas = require("canvas");
const fs = require("fs");

module.exports = {
    name: "meme",
    description: "",
    async execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}meme use <memeName>\` to have Valk send a meme/reaction image. Use \`list\` as the meme name to show available options.`);};
        message.delete();
        if (args[0] == "use") {
            var meme = args[1];
            var data = fs.readFileSync("./data/misc/meme.json", 'utf-8');
            var memes = JSON.parse(data);
            var memes = memes.memes;
            if (meme == 'list') {
                var memelist = "List of memes/reaction image flags: ";
                for (i of Object.keys(memes)) {memelist += `\`${i}\``; if (Object.keys(memes).length - Object.keys(memes).indexOf(i) > 1) {memelist += ", ";} else {memelist += ".";};};
                var rep = await message.reply(memelist);
                return rep.delete(20000);
            };
            var link = memes[meme];
            /*if (meme == "list") {return message.reply("Memes/Reaction image flags are: `shut`, `yikes`, `tompaper`, `excusewtf`" + 
            ", `thomasbs`, `bigno`, `doot`, `chacha`, `yessir`, `shockok`, `dogseize`, "
            + "`fukusay`, `noaccidents`, `bonehurtjuice`, `birb`, `f`.");};
            /*if (meme == "shut") {var link = "https://cdn.discordapp.com/attachments/563198656241598484/674081841778524160/IMG_20200120_012215_921.jpg"};
            if (meme == "yikes") {var link = "https://cdn.discordapp.com/attachments/563198656241598484/674082003137724416/received_474102026641520.jpeg"};
            if (meme == "brain") {var link = "https://tenor.com/view/big-brain-markiplier-gif-14835823"};
            if (meme == "tompaper") {var link = "https://cdn.discordapp.com/attachments/472596691263029261/677720511777603614/300px-Tom_Cat_Reading_a_Newspaper.png"};
            if (meme == "excusewtf") {var link = "https://cdn.discordapp.com/attachments/472596691263029261/677722640940531732/excusemewhatthefuck.PNG"};
            if (meme == "considerthefollow") {var link = "https://cdn.discordapp.com/attachments/563198656241598484/683472746918969366/received_715478235596053.jpeg"};
            if (meme == "thomasbs") {var link = "https://cdn.discordapp.com/attachments/563198656241598484/683471956271562752/SmartSelect_20200229-173317_Samsung_Internet.jpg"};
            if (meme == "bigno") {var link = "https://cdn.discordapp.com/attachments/563198656241598484/683472747174559769/received_487285101872462.jpeg"};
            if (meme == "doot") {var link = "https://cdn.discordapp.com/attachments/563198656241598484/683472747422416950/received_785158701904335.jpeg"};
            if (meme == "chacha") {var link = "https://cdn.discordapp.com/attachments/563198656241598484/683472747787059244/received_1141845076005698.jpeg"};
            if (meme == "yessir") {var link = "https://cdn.discordapp.com/attachments/563198656241598484/683472748051169318/received_2693882840729239.jpeg"};
            if (meme == "shockok") {var link = "https://cdn.discordapp.com/attachments/563198656241598484/683472748240044078/received_2100330400069375.jpeg"};
            if (meme == "dogseize") {var link = "https://cdn.discordapp.com/attachments/563198656241598484/683472748411879509/received_414667849433267.jpeg"};
            if (meme == "fukusay") {var link = "https://cdn.discordapp.com/attachments/563198656241598484/683472748688834654/received_1354559018035549.jpeg"};
            if (meme == "noaccidents") {var link = "https://cdn.discordapp.com/attachments/563198656241598484/683472749045481533/received_894776877589314.jpeg"};
            if (meme == "bonehurtjuice") {var link = "https://cdn.discordapp.com/attachments/563198656241598484/683472749242351616/55940bb.jpg"};
            if (meme == "birb") {var link = "https://cdn.discordapp.com/attachments/472603182824947732/731729073981620285/718572770232893470.gif"};
            if (meme == "f") {var link = "https://cdn.discordapp.com/attachments/646137098335682579/683908052272939032/Press-F-to-Pay-Respects-meme-Call-of-Duty.jpg"};*/
            if (!link) {return message.reply("I don't have the meme `" + meme + "`!");};
            return message.channel.send(`Sender: ${message.member.displayName}`, new Discord.MessageAttachment(link));
        }
        else if (args[0] == "r" || args[0] == "register") {
            if (message.author.id != "330547934951112705") {return;};
            var filter = m => m.author.id == "330547934951112705";
            await message.channel.send("What would you like the meme name to be?");
            var name = await message.channel.awaitMessages(filter, {time: 200000, max: 1});
            name = name.first().content;
            await message.channel.send("Provide the link for the image");
            var link = await message.channel.awaitMessages(filter, {time: 200000, max: 1});
            link = link.first().content;
            var data = fs.readFileSync("./data/misc/meme.json", 'utf-8');
            var memes = JSON.parse(data);
            memes.memes[name] = link;
            json = JSON.stringify(memes);
            fs.writeFileSync(`./data/misc/meme.json`, json, 'utf8');
            return message.reply("Meme added!");
        }
        else if (args[0] == "avatar") {
            if (args.length < 2) {return message.reply(`Syntax: \`${prefix}meme avatar <memeName> [flip] [@mention] [@mention]\`. For templates with two avatars, if you mention nobody, it will use your avatar and Valkyrie's avatar, If you mention one person, it will use your avatar and their avatar, and if you mention two people, it will use both of their avatars and not yours. For two-avatar templates, you can use "flip" after the meme name to swap avatar positions. To see valid template names, use \`${prefix}meme avatar list\``)};
            var pfp1; var pfp2; var fmsg;
            async function twoAv(mesg) {
                if (!mention) {
                    if (args[2] == "flip") {
                        pfp2 = await Canvas.loadImage(message.author.avatarURL({format: 'png', size: 2048}));
                        pfp1 = await Canvas.loadImage(client.user.avatarURL({format: 'png', size: 2048}));
                        fmsg = mesg.replace(/\{\{1}}/gm, message.member.guild.members.cache.get(client.user.id).displayName);
                        fmsg = fmsg.replace(/\{\{2}}/gm, message.member.displayName);
                    } else {
                        pfp1 = await Canvas.loadImage(message.author.avatarURL({format: 'png', size: 2048}));
                        pfp2 = await Canvas.loadImage(client.user.avatarURL({format: 'png', size: 2048}));
                        fmsg = mesg.replace(/\{\{2}}/gm, message.member.guild.members.cache.get(client.user.id).displayName);
                        fmsg = fmsg.replace(/\{\{1}}/gm, message.member.displayName);
                    };
                } else if (message.mentions.users.size > 1) {
                    if (args[2] == "flip") {
                        pfp2 = await Canvas.loadImage(message.mentions.users.first().avatarURL({format: 'png', size: 2048}));
                        pfp1 = await Canvas.loadImage(message.mentions.users.first(2)[1].avatarURL({format: 'png', size: 2048}));
                        fmsg = mesg.replace(/\{\{1}}/gm, message.member.guild.members.cache.get(message.mentions.users.first(2)[1].id).displayName);
                        fmsg = fmsg.replace(/\{\{2}}/gm, message.member.guild.members.cache.get(message.mentions.users.first().id).displayName);
                    } else {
                        pfp1 = await Canvas.loadImage(message.mentions.users.first().avatarURL({format: 'png', size: 2048}));
                        pfp2 = await Canvas.loadImage(message.mentions.users.first(2)[1].avatarURL({format: 'png', size: 2048}));
                        fmsg = mesg.replace(/\{\{2}}/gm, message.member.guild.members.cache.get(message.mentions.users.first(2)[1].id).displayName);
                        fmsg = fmsg.replace(/\{\{1}}/gm, message.member.guild.members.cache.get(message.mentions.users.first().id).displayName);
                    };
                } else {
                    if (args[2] == "flip") {
                        pfp2 = await Canvas.loadImage(message.author.avatarURL({format: 'png', size: 2048}));
                        pfp1 = await Canvas.loadImage(mention.avatarURL({format: 'png', size: 2048}));
                        fmsg = mesg.replace(/\{\{2}}/gm, message.member.guild.members.cache.get(mention.id).displayName);
                        fmsg = fmsg.replace(/\{\{1}}/gm, message.member.displayName);
                    } else {
                        pfp1 = await Canvas.loadImage(message.author.avatarURL({format: 'png', size: 2048}));
                        pfp2 = await Canvas.loadImage(mention.avatarURL({format: 'png', size: 2048}));
                        fmsg = mesg.replace(/\{\{2}}/gm, message.member.guild.members.cache.get(mention.id).displayName);
                        fmsg = fmsg.replace(/\{\{1}}/gm, message.member.displayName);
                    };
                };
            };
            var meme = args[1];
            if (meme == "roloshoot") {
                await twoAv("{{1}} holds {{2}} at gunpoint. It seems {{2}} is a little too smug about it though...");
                try {const canvas = Canvas.createCanvas(630, 360);
		        const ctx = canvas.getContext('2d');
		        const background = await Canvas.loadImage('./images/templates/avatar/roloshoot.png');
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                ctx.drawImage(pfp2, 30, 66, 220, 220);
                ctx.drawImage(pfp1, 470, 95, 90, 90);
                return message.channel.send(`${fmsg}\nSender: ${message.member.displayName}`, new Discord.MessageAttachment(canvas.toBuffer(), 'valk-meme-roloshoot.png'));
                } catch (e) {console.log(e); return message.reply("Huh... something went wrong there. Try again maybe?");};
            } else if (meme == "mhabattle") {
                await twoAv("{{1}} battles {{2}}! It's an intense fight...");
                try {const canvas = Canvas.createCanvas(700, 394);
                const ctx = canvas.getContext("2d");
                const background = await Canvas.loadImage("./images/templates/avatar/mhabattle.jpg");
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                ctx.drawImage(pfp1, 170, 135, 100, 100);
                ctx.drawImage(pfp2, 450, 135, 100, 100);
                return message.channel.send(`${fmsg}\nSender: ${message.member.displayName}`, new Discord.MessageAttachment(canvas.toBuffer(), 'valk-meme-roloshoot.png'));
                } catch (e) {console.log(e); return message.reply("Huh... something went wrong there. Try again maybe?");};
            } else if (meme == "list") {
                return message.reply("Two-Avatar flags: `roloshoot`, `mhabattle`")
            };

            var myObject = {
                "example": {"somestuff": "data", "otherstuff": "otherdata"},
                "blahBlah": {"bonks": "data", "stonks": "otherdata"},
                "e.exe": {"yoink": false, "not stonks": "otherdata"},
                "meme.mp4": {"shit": 420, "lololol": "otherdata"}
            };
        };
    }
};