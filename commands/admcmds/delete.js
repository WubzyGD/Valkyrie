const Discord = require("discord.js");

module.exports = {
    name: "delete",
    description: "",
    execute(message, msg, args, cmd, adminPrefix, mention, client) {
		if (!message.member.hasPermission("MANAGE_MESSAGES")) {return message.channel.send("You must be able to manage messages to do that.");};
        if (!args.length) { message.delete(); return message.channel.send(`You haven't specified how many messages to delete, or anything actually. Usage: \`${adminPrefix}delete <number> [@member]\``)};
        if (Number(args[0]) > 101) { message.delete(); return message.channel.send("That's a bit too many messages. The maximum number of messages to delete is 100")};
		if (Number(args[0]) < 5) { message.delete(); return message.channel.send("The least amount of messages you can specify is 5.")};
		if (isNaN(args[0])) {message.delete(); return(message.channel.send(`You didn't give me a number of messages to delete. Usage: \`${adminPrefix}delete <number> [@member]\``))};
		if (args.length == 1) {
			message.channel.bulkDelete(Number(args[0]) + 1);
		} else {
			if (!mention) {return(message.channel.send("You have to mention someone, silly."))}
			message.channel.fetchMessages({limit: 100}).then((messages) => {
				var filterBy = mention ? mention.id : Client.mention.id;
				messages = messages.filter(m => m.author.id === filterBy).array().slice(0, Number(args[0]));
				message.channel.bulkDelete(messages).catch(console.error);
			});
		};
		return message.delete();
    }
};