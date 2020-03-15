const Discord = require("discord.js");
const Canvas = require("canvas");

module.exports = {
    name: "meme",
    description: "",
    async execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`Syntaxx: \`${prefix}meme <memeName>\` to create a meme OR \`${prefix}meme use <memeName>\` to have Valk send a meme/reaction image. Use \`list\` as the meme name to show available options.`);};
        message.delete();
        if (args[0] == "use") {
            var meme = args[1];
            if (meme == "list") {return message.reply("Memes/Reaction image flags are: `shut`, `yikes`, `brain`, `tompaper`, `excusewtf`" + 
            ", `considerthefollow`, `thomasbs`, `bigno`, `doot`, `chacha`, `yessir`, `shockok`, `dogseize`, "
            + "`fukusay`, `noaccidents`, `bonehurtjuice`, `f`.");};
            if (meme == "shut") {var link = "https://cdn.discordapp.com/attachments/563198656241598484/674081841778524160/IMG_20200120_012215_921.jpg"};
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
            if (meme == "f") {var link = "https://cdn.discordapp.com/attachments/646137098335682579/683908052272939032/Press-F-to-Pay-Respects-meme-Call-of-Duty.jpg"};
            if (!link) {return message.reply("I don't have the meme `" + meme + "`!");};
            return message.channel.send(`Sender: ${message.member.displayName}`, new Discord.Attachment(link));
        }
        if (args[0] == "excusewtf") {
            args.shift();
            if (!args.length) {return message.reply("Options for this meme template are `$text1` and `$text2`.");};
            var reading = false;
            var text1 = "";
            var text2 = "";
            for (t = 0; t < args.length; t++) {
                i = args[t];
                if ((!reading == false) && (!i.startsWith("$"))) {
                    if (reading == "text1") {
                        text1 += `${i} `;
                    } else if (reading == "text2") {
                        text2 += `${i} `;
                    } else {
                        var warn = await message.reply(`\`${i}\` is not a valid option. Use \`${adminPrefix}announce options\` to see a list of valid options.`);
                        warn.delete(10000);
                    };
                } else if (i.startsWith("$")) {
                    i = i.toLowerCase().slice(1);
                    reading = i;
                };
            };
            if (!text1.length > 0 && !text2.length > 0) {return message.reply("You must have some text in your meme.");};
            if (text1.length == 0) {text1 = text2; text2 = false;} else if (text2.length == 0) {text2 = false;};
            /*const applyText = (canvas, text) => {
                const ctx = canvas.getContext('2d');
                let fontSize = 70;
                do {
                    ctx.font = `${fontSize -= 10}px sans-serif`;
                } while (ctx.measureText(text).width > canvas.width - 300);
                return ctx.font;
            };*/
    
            const canvas = Canvas.createCanvas(640, 544);
            const ctx = canvas.getContext('2d');
            
            if (text1.length <= 25 && !text2) {ctx.font = "35px sans-serif"; var t1draw = 55;}
            else if (text1.length <= 25) {ctx.font = "35px sans-serif"; var t1draw = 30;}
            else if (text1.length > 25 && !text2) {ctx.font = "30px sans-serif"; var t1draw = 55;}
            else if (text1.length > 25) {ctx.font = "30px sans-serif"; var t1draw = 30;};

            var t1l1 = false; var t1l2 = false; var t2l1 = false; var t2l2 = false;
            if (text1.length > 40) {t1l1 = text1.slice(0, 39).trim(); t1l2 = text1.slice(40, text1.length).trim();};
            if (text2.length > 40) {t2l1 = text2.slice(0, 39).trim(); t2l2 = text2.slice(40, text2.length).trim();};

            const background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/563198656241598484/673735219249152023/excusewtf.jpg");
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
            ctx.fillStyle = '#000000';
            if (!t1l1) {
                ctx.fillText(text1, 20, t1draw);
            } else {
                ctx.fillText(t1l1, 20, t1draw);
                ctx.fillText(t1l2, 20, t1draw + 30);
            };

            if (text2) {
                ctx.fillText(text2, 20, 60);
                if (!t2l1) {
                    if (!t1l1) {ctx.fillText(text2, 20, t1draw + 65);}
                    else {ctx.fillText(text2, 20, t1draw + 95);};
                } else {
                    if (!t1l1) {
                        ctx.fillText(t2l1, 20, t1draw + 65);
                        ctx.fillText(t2l2, 20, t1draw + 100);
                    } else {
                        ctx.fillText(t2l1, 20, t1draw + 120);
                        ctx.fillText(t2l2, 20, t1draw + 150);
                    };
                };
            };
    
            var attachment = new Discord.Attachment(canvas.toBuffer(), 'completed-meme.png');
            return message.reply("Here you are!", attachment);
        };
    }
};