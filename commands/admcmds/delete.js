const Discord = require("discord.js");

module.exports = {
	name: "delete",
	aliases: ["purge", "clean"],
    description: "",
    execute(message, msg, args, cmd, adminPrefix, mention, client) {
		if (!message.member.hasPermission("MANAGE_MESSAGES")) {return message.channel.send("You must be able to manage messages to do that.");};
        if (!args.length) { message.delete(); return message.channel.send(`You haven't specified how many messages to delete, or anything actually. Usage: \`${adminPrefix}delete <number> [@member]\``)};
        if (Number(args[0]) > 101) { message.delete(); return message.channel.send("That's a bit too many messages. The maximum number of messages to delete is 100")};
		if (Number(args[0]) < 5) { message.delete(); return message.channel.send("The least amount of messages you can specify is 5.")};
		if (isNaN(args[0])) {message.delete(); return(message.channel.send(`You didn't give me a number of messages to delete. Usage: \`${adminPrefix}delete <number> [@member]\``))};
		if (args.length == 1) {
			message.channel.bulkDelete(Number(args[0]));
		} else {
			if (!mention) {if (client.users.cache.has(args[1].trim())) {mention = client.users.cache.get(args[1].trim());} else {return(message.channel.send("You have to mention someone, silly."));}}
			message.channel.messages.fetch({limit: 100}).then((messages) => {
				var filterBy = mention.id;
				messages = messages.filter(m => m.author.id === filterBy).array().slice(0, Number(args[0]));
				message.channel.bulkDelete(messages).catch(console.error);
			});
		};
		return message.delete();
    }
};