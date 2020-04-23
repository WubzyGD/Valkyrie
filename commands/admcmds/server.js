const Discord = require("discord.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const serverConfig = sequelize.import("../../models/serversettings");

var e = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({force: e}).then(async () => {}).catch(console.error);

module.exports = {
    name: "server",
    description: "",
    async execute(message, msg, args, cmd, prefix, mention, client) {
        await sequelize.sync({force: e}).then(async () => {}).catch(console.error);
        var currentServer = await serverConfig.findOne({where: {guild_id: message.member.guild.id}});
		if (!currentServer) {
			try {
				await serverConfig.create({
                    guild_name: message.member.guild.name,
                    guild_id: String(message.member.guild.id),
                });
				return message.reply(`This appears to be the first time a member has tried to access this server's server config, so I've registered your server, and you can now edit and access its settings! --Granted that you have the right permissions, of course.`);
			} catch (e) {};
        };
        if (currentServer.server_edit_admin_requirement == true) {if (!message.member.permissions.has("ADMINISTRATOR")) {return message.reply("This server is set to only allow admins to edit my settings.")};};
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}server <edit|view>\``)};
        if (args[0] == "edit") {
            args.shift();
            if (!args.length) {return message.channel.send(`Syntax: \`${prefix}server edit <adminedit|updatechannel|welcomechannel|leavechannel|defaultrole>\` More settings will be coming soon! Be patient.`)};
            if (args[0] == "adminedit") {
                args.shift();
                if (!args.length) {return message.channel.send(`Syntax: \`${prefix}server edit adminedit <true|false>\` Setting this to \`true\` means that any member can update my settings in this server. Otherwise, members must have administrator permissions to edit my settings.`);};
                if (args[0] == "true" || args[0] == "yes") {
                    await serverConfig.update({server_edit_admin_requirement: true}, {where: {guild_id: message.member.guild.id}});
                    return message.reply("This server is now set to only allow admins to update my settings.");
                } else if (args[0] == "false" || args[0] == "no") {
                    await serverConfig.update({server_edit_admin_requirement: false}, {where: {guild_id: message.member.guild.id}});
                    return message.reply("This server is now set only anyone to update my settings.");
                } else {return message.reply("You didn't provide a valid operator for this option. User either `true` or `false`.");};
            } else if (args[0] == "updatechannel") {
                args.shift();
                if (!args.length) {return message.channel.send(`Syntax: \`${prefix}server edit updatechannel <#channel|none>\` This will enable update logs in a channel for when Valkyrie is updated - if you mention a channel, or disable them if you type "none".`);};
                if (args[0] == "none") {
                    await serverConfig.update({valk_update_channel: "none"}, {where: {guild_id: message.member.guild.id}});
                    return message.reply("This server will no longer receive update messages. This can be re-enabled at any time.");
                } else if (args[0].startsWith("<#") && args[0].endsWith(">")) {
                    await serverConfig.update({valk_update_channel: args[0]}, {where: {guild_id: message.member.guild.id}});
                    return message.reply(`This server will now receive updates in the ${args[0]} channel.`);
                } else {return message.reply(`You didn't provide a valid operator. Syntax: \`${prefix}server edit updatechannel <#channel|none>\``);};
            } else if (args[0] == "welcomechannel") {
                args.shift();
                if (!args.length) {return message.channel.send(`Syntax: \`${prefix}server edit updatechannel <#channel|none>\` This will enable welcome messages in a channel for when a user joins - if you mention a channel, or disable them if you type "none".`)};
                if (args[0] == "none") {
                    await serverConfig.update({welcome_message_channel: "none"}, {where: {guild_id: message.member.guild.id}});
                    return message.reply("This server will no longer receive welcome messages. This can be re-enabled at any time.");
                } else if (args[0].startsWith("<#") && args[0].endsWith(">")) {
                    await serverConfig.update({welcome_message_channel: args[0]}, {where: {guild_id: message.member.guild.id}});
                    return message.reply(`This server will now receive welcome messages in the ${args[0]} channel.`);
                } else {return message.reply(`You didn't provide a valid operator. Syntax: \`${prefix}server edit welcomechannel <#channel|none>\``);};
            } else if (args[0] == "leavechannel") {
                args.shift();
                if (!args.length) {return message.channel.send(`Syntax: \`${prefix}server edit leavechannel <#channel|none>\` This will enable leave messages in a channel for when a user leaves - if you mention a channel, or disable them if you type "none".`)};
                if (args[0] == "none") {
                    await serverConfig.update({leave_message_channel: "none"}, {where: {guild_id: message.member.guild.id}});
                    return message.reply("This server will no longer receive leaving messages. This can be re-enabled at any time.");
                } else if (args[0].startsWith("<#") && args[0].endsWith(">")) {
                    await serverConfig.update({leave_message_channel: args[0]}, {where: {guild_id: message.member.guild.id}});
                    return message.reply(`This server will now receive leaving messages in the ${args[0]} channel.`);
                } else {return message.reply(`You didn't provide a valid operator. Syntax: \`${prefix}server edit leavechannel <#channel|none>\``);};
            } else if (args[0] == "defaultrole") {
                args.shift();
                if (!args.length) {return message.channel.send(`Syntax: \`${prefix}server edit defaultrole <@role|none>\` This will add the role to users who join - if you mention a role, or disable it if you type "none".`)};
                if (args[0] == "none") {
                    await serverConfig.update({join_role: "none"}, {where: {guild_id: message.member.guild.id}});
                    return message.reply("This server now has no default role - I won't add a role to users when they join. This can be re-enabled at any time.");
                } else if (args[0].startsWith("<@&") && args[0].endsWith(">")) {
                    await serverConfig.update({join_role: args[0]}, {where: {guild_id: message.member.guild.id}});
                    return message.reply(`I'll add the role ${args[0]} to new members.`);
                } else {return message.reply(`You didn't provide a valid operator. Syntax: \`${prefix}server edit defaultrole <@role|none>\``);};
            } else {return message.reply(`Invalid syntax/option provided. Syntax: \`${prefix}server edit <adminedit|updatechannel|welcomechannel|leavechannel|defaultrole>\``);};
        } else if (args[0] == "view") {
            var serverSettingsEmbed = new Discord.RichEmbed()
            .setAuthor("Server Settings", message.member.guild.iconURL)
            .setDescription(`Server: ${message.member.guild.name}`)
            .addField("Admin-only Settings-Changing", currentServer.server_edit_admin_requirement)
            .addField("Update Logging", currentServer.valk_update_channel)
            .addField("Welcome Message Channel", currentServer.welcome_message_channel)
            .addField("Leave Message Channel", currentServer.leave_message_channel)
            .addField("Join Role", currentServer.join_role)
            .setColor("DC134C")
            .setFooter("Valkyrie")
            .setTimestamp();
            return message.channel.send(serverSettingsEmbed);
        } else if (args[0] == "newupdate" && message.author.id == "330547934951112705") {
            var upText = message.content.slice();
        } else {return message.reply(`Invalid syntax/option. Syntax: \`${prefix}server <edit|view>\``);};
    }
};