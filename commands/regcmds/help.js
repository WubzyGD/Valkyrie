const Discord = require("discord.js");

module.exports = {
    name: "help",
    description: "Valk's command-listing",
    async execute(message, msg, args, cmd, prefix, mention, client) {
		var infoEmbed = new Discord.MessageEmbed()
		.setTitle("Valkyrie's Info")
		.setDescription("I'm a bot made for RPG-oriented Discord servers. Although you can have me roll dice for you in any server :)")
		.addField("Author:", "WubzyGD#8766, with special thanks to Hellcat007 for providing technical support.")
		.addField("Programming Language:", "JavaScript/Discord.js")
		.addField("Servers", `I'm in ${client.guilds.cache.size} servers!`)
		.addField("Prefix", `My prefix is \`${prefix}\``)
		.addField("Help", `If you need help, use ${prefix}help.`)
		.addField("Problems?", "If you're having issues, please contact WubzyGD#8766 via DM. Note that all commands are intended for servers, and may not function properly in a Direct Message.")
		.addField("Support Server", `Use \`${prefix}supportserver\` to get an invite link to my official server, which has many features, one of which is an exclusive game with money and xp and prestiging, along with direct feature suggestions and places to give feedback and bug reports that are quicker accessed by Wubzy!`)
		.setColor("DC134C")
		.setFooter("Valkyrie", client.user.avatarURL())
		.setTimestamp();

		var help1 = new Discord.MessageEmbed()
		.setTitle("RPG-Related Commands")
		.setDescription("All of my important RPG commands.")
		.addField("Valid Dice", "Valid dice inputs are:\n-d4\n-d6\n-d8\n-d10\n-d12\n-d20\n-d100\n\n**Dice commands only accept these.**")
		.addField("__Rolldice__", "Syntax: `rolldice [\"reason\"] d<die> d<die>`\n\nRolls up to an infinite number of dice and sends it in a snug little embed.\n\nTips:\n-The reason is optional\n-The reason *must* be placed in quotes\n-Start every die declaration with a space and then \"D\"\n\nExamples:\nWith reason: `rolldice \"To test\" d10 d20 d12`\nWithout reason: `rolldice d10 d20 d12`")
		.addField("__Diceduel__", "Syntax: `diceduel [\"reason\"] d<die> <vsMember>`\n\nRolls a set die twice, once for you, and once for your opponent, then declares the winner.\n\nTips\n-Use rolldice's tips\n-You don't have to duel a member or mention anyone.\n-You *can* mention someone\n\nExamples:\nWith reason: `diceduel \"To test\" d10 Dragon`\nWithout reason: `diceduel d10 Dragon`")
		.addField("__Spell__", "Syntax: `spell <list|info|cast|create> spellName`\n\n-`list`: Lists all of the available spells.\n-`info`: Displays an info card on the spell inside a fancy embed.\n-`cast`: Rolls for a spell's dice and returns the result in an embed.\n-`create`: Sends a list of questions replyable by simple message-sending, then sends the info to WubzyGD to add to the database. Note, this is very spammy. Use this in a bot commands channel.")
		.addField("__Say__", "Syntax: `say <text>` or `say \"<text>\" <person>`\n\nDisplays the given text. If the text-person method is not used, the person will be the command initiator.\n\nTips:\n-Use this to indicate a character's dialogue, especially when using multiple characters.\n\nExamples:\nSimple syntax: `say Hello everyone!`\nSecond syntax: `say \"Hello everyone\" Timmy`")
		.addField("__Dicecount__", "Syntax: `dicecount`\n\nDisplays how many dice you've rolled")
		.addField("__Stats__", "Syntax: `stats [image|l] [@mention]`\n\nDisplays your __global__ stats containing your level and XP through me, which is gained by being active in servers!\n\nTips:\n-You can get an image displaying your level stats by adding `image` to the command\n-You can get another user's stats by appending their mention to the __end of your message__.\n-By joining the support server, you gain access to more featuers of this system and faster ways to earn XP and GP!\n-You can view a server leaderboard with `stats l`.")
		.addField("__Char__", "Syntax: `char <add|view|edit|list|delete>`\n\nUse this awesome feature to create detailed character \"sheets\" that you can then globally view and edit, allowing you to quickly join RPs and DnD sessions without the hassle of explaining your characters.\n\nCurrently, only the addition of RP characters is functional. The rest is very soon to come!")
		.setColor("DC134C")
		.setFooter("Valkyrie | Page 1 of 4", client.user.avatarURL())
		.setTimestamp();

		var help2 = new Discord.MessageEmbed()
		.setTitle("Fun Commands")
		.setDescription("Commands built for entertainment purposes.")
		.addField("__8ball__", "Syntax: `8ball <question>`\n\nGives you a ~~random~~ totally accurate reply to your question.")
		.addField("__Hangman__", "Syntax: `hangman`\n\nCreates an interactive hangman game in the channel that only you can play. Please use this in a dedicated bot commands channel; it is rather spammy.")
		//.addField("__Fish__", "Syntax: `fish`\n\n")
		.addField("__Zero__", "Syntax: `zero`\n\nTests for whether or not you are Zero. -Anime reference to Code Geass.")
		.addField("__Meme__", "Syntax: `meme <use|avatar> <name> [options]` or use `meme <use|avatar> list` to see available memes/reaction images.\n\n`use` sends the meme to chat for you. Now time to be a wizard with reaction images. `avatar` creates a meme from your avatar and another user's. Use `meme avatar` to learn more.")
		.addField("__Bio__", "Syntax: `bio <set|view|clear>`\n\nCreates a short bio about you that is viewable by anyone you share a server with. Express yourself, say a thing or two!")
		.addField("__Slap__", "Syntax: `slap <@member>`\n\nGives the mentioned member a nice firm *whack* to the face")
		.addField("__AR__", "Syntax: `ar <add|list|edit|delete>`\n\nCreates, edits, deletes, or lists auto-responses, which are ways to get me to say stuff when someone else says something specific in your server. Only an admin may edit responses in your server!")
		.setColor("DC134C")
		.setFooter("Valkyrie | Page 2 of 4", client.user.avatarURL())
		.setTimestamp();

		var help3 = new Discord.MessageEmbed()
		.setTitle("Other Commands/Moderation Commands")
		.setDescription("Anything not \"fun\" or RPG. All moderative commands such as announce and delete use the prefix `adm.`")
		.addField("__Calc__", "Syntax: `calc <num> <+|-|*|/> <num>`\n\nReturns the calculated number")
		.addField("__Randnum__", "Syntax: `randnum <minNum> <maxNum>`\n\nInclusively returns a random number between the two values")
		//.addField("__Theme__", "Syntax: `theme create`\n\nCreates a customized Better Discord theme, right there in chat! This command only works in a direct message to Valkyrie, so be careful.")
		//.addField("__Role__", "")
		.addField("__Avatar__", "Syntax: `avatar [@member]`\n\nSends the user's full avatar. If nobody is mentioned, displays your avatar")
		.addField("__Coinflip__", "Syntax: `coinflip`\n\nNot really much to say here...")
		.addField("__Serverinfo__", "Syntax: `serverinfo`\n\nShows detailed statistics on the server.")
		.addField("__Pickrandom__", "Syntax: `pickrandom $option option $option option $etc...`\n\nSelects one of the given options. Movie night? I can pick a movie! Can't decide which skeleton to kill? I gotcha.\n\nCaution: This command has known bugs and may not behave properly! Yell at Wubzy please!")
		.addField("__Vote__", "Syntax: `vote [has @member|monthly|total|stats]`\n\nShows info about me on Glenn Bot List. Using `has` can check to see if you've voted in the last 12 hours, or you can mention another member to check!")
		//.addField("__Send__", "Syntax: `send <@username> <message>`\n\nSends that user a message and deletes the execution message. Glorified DMs")
		.addField("__Delete__", "Syntax: `delete <count> [@member]`\n\nPurges a given number of messages from the channel, and optionally from only a specific member.")
		.addField("__Announce__", "Syntax: `announce <options>`\n\nThis command is really just a glorified embed generator, and as long as you have permissions to send a message to that channel, the command will work!\n\nTips:\n-Use `announce options` to see a list of customizability options")
		//.addField("__Kick__", ".")
		//.addField("__Ban__", ".")
		.addField("__Poll", "Syntax: `poll <options>\n\nCreate a poll with the specified options and duration. See `announce` for help; the two commands operate similarly.")
		.addField("__Server__", "Syntax: `server <edit|view>`\n\nEdits your server settings for Valkyrie. For more help, send the command without any options to see more about it.\n\n**Please note that the functionality of these features is still in development!**")
		.addField("__Color__", "Syntax: `color <rgb|hex> <color>`\n\nSends the color you specified.\n\nTips:\n-For rgb colors, use this syntax: `color rgb 0 0 0`\n-For hex colors, use this syntax: `color hex dc134c`")
		.setColor("DC134C")
		.setFooter("Valkyrie | Page 3 of 4", client.user.avatarURL())
		.setTimestamp();
		
		message.reply("Calling in the reinforcements! Help is in your DM's.");
		await message.author.send(infoEmbed);
		await message.author.send(help1);
		await message.author.send(help2);
		await message.author.send(help3);
		return;
	}
};