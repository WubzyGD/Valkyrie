const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    name: "server",
    description: "",
    async execute(message, msg, args, cmd, prefix, mention, client) {
        if (message.channel.type != "text") {return;};
        if (fs.existsSync(`./data/guildconfig/${message.guild.id}.json`)) {
            var currentServer = fs.readFileSync(`./data/guildconfig/${message.guild.id}.json`);
            currentServer = JSON.parse(currentServer);
        } else {
            var currentServer = {
                server_edit_admin_requirement: true,
                valk_update_channel: null,
                welcome_message_channel: null,
                leave_message_channel: null,
                join_role: null,
                prefix: "v.",
                level_update: false,
                log_channel: null,
                welcome_ping_role: null,
            };
        };
        function getChannel() {
            if (message.mentions.channels.size < 1 || message.guild.channels.cache.has(args[0].trim())) {return 0;};
            if (message.mentions.channels.size) {return message.mentions.channels.first().id;}
            else {return args[0].trim();};
        }; function bc(e) {if (e == 0) {return message.reply("You must tag a channel or provide an ID!");};};
        function save() {var data = JSON.stringify(currentServer); fs.writeFileSync(`./data/guildconfig/${message.guild.id}.json`, data, 'utf8');};
        if (currentServer.server_edit_admin_requirement == true || currentServer.server_edit_admin_requirement == undefined) {if (!message.member.permissions.has("ADMINISTRATOR") && message.member.id !== "330547934951112705") {return message.reply("This server is set to only allow admins to edit my settings.")};};
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}server <edit|view>\``)};
        if (args[0] == "edit") {
            args.shift();
            if (!args.length) {return message.channel.send(`Syntax: \`${prefix}server edit <adminedit|updatechannel|welcomechannel|leavechannel|defaultrole|welcomerole|levelmessage>\`.`)};
            if (args[0] == "adminedit") {
                args.shift();
                if (!args.length) {return message.channel.send(`Syntax: \`${prefix}server edit adminedit <true|false>\` Setting this to \`true\` means that any member can update my settings in this server. Otherwise, members must have administrator permissions to edit my settings.`);};
                if (args[0] == "true" || args[0] == "yes") {
                    currentServer.server_edit_admin_requirement = true; save();
                    return message.reply("This server is now set to only allow admins to update my settings.");
                } else if (args[0] == "false" || args[0] == "no") {
                    currentServer.server_edit_admin_requirement = false; save();
                    return message.reply("This server is now set only anyone to update my settings.");
                } else {return message.reply("You didn't provide a valid operator for this option. User either `true` or `false`.");};
            } else if (args[0] == "updatechannel") {
                args.shift();
                if (!args.length) {return message.channel.send(`Syntax: \`${prefix}server edit updatechannel <#channel|channelID|none>\` This will enable update logs in a channel for when Valkyrie is updated - if you mention a channel, or disable them if you type "none".`);};
                if (args[0] == "none") {
                    currentServer.valk_update_channel = null; save();
                    return message.reply("This server will no longer receive update messages. This can be re-enabled at any time.");
                } else if ((args[0].startsWith("<#") && args[0].endsWith(">")) || args[0].length == 18) {
                    currentServer.valk_update_channel = args[0]; getChannel(); bc(getChannel()); save();
                    return message.reply(`This server will now receive updates in the ${args[0]} channel.`);
                } else {return message.reply(`You didn't provide a valid operator. Syntax: \`${prefix}server edit updatechannel <#channel|channelID|none>\``);};
            } else if (args[0] == "welcomechannel") {
                args.shift();
                if (!args.length) {return message.channel.send(`Syntax: \`${prefix}server edit updatechannel <#channel|channelID|none>\` This will enable welcome messages in a channel for when a user joins - if you mention a channel, or disable them if you type "none".`)};
                if (args[0] == "none") {
                    currentServer.welcome_message_channel = null; save();
                    return message.reply("This server will no longer receive welcome messages. This can be re-enabled at any time.");
                } else if ((args[0].startsWith("<#") && args[0].endsWith(">")) || args[0].length == 18) {
                    currentServer.welcome_message_channel = args[0]; getChannel(); bc(getChannel()); save();
                    return message.reply(`This server will now receive welcome messages in the ${args[0]} channel.`);
                } else {return message.reply(`You didn't provide a valid operator. Syntax: \`${prefix}server edit welcomechannel <#channel|channelID|none>\``);};
            } else if (args[0] == "leavechannel") {
                args.shift();
                if (!args.length) {return message.channel.send(`Syntax: \`${prefix}server edit leavechannel <#channel|channelID|none>\` This will enable leave messages in a channel for when a user leaves - if you mention a channel, or disable them if you type "none".`)};
                if (args[0] == "none") {
                    currentServer.leave_message_channel = null; save();
                    return message.reply("This server will no longer receive leaving messages. This can be re-enabled at any time.");
                } else if ((args[0].startsWith("<#") && args[0].endsWith(">")) || args[0].length == 18) {
                    currentServer.leave_message_channel = args[0]; getChannel(); bc(getChannel()); save();
                    return message.reply(`This server will now receive leaving messages in the ${args[0]} channel.`);
                } else {return message.reply(`You didn't provide a valid operator. Syntax: \`${prefix}server edit leavechannel <#channel|channelID|none>\``);};
            } else if (args[0] == "defaultrole") {
                args.shift();
                if (!args.length) {return message.channel.send(`Syntax: \`${prefix}server edit defaultrole <@role|none>\` This will add the role to users who join - if you mention a role, or disable it if you type "none".`)};
                if (args[0] == "none") {
                    currentServer.join_role = null; save();
                    return message.reply("This server now has no default role - I won't add a role to users when they join. This can be re-enabled at any time.");
                } else if (args[0].startsWith("<@&") && args[0].endsWith(">")) {
                    currentServer.join_role = args[0]; save();
                    return message.reply(`I'll add that role to new members.`);
                } else {return message.reply(`You didn't provide a valid operator. Syntax: \`${prefix}server edit defaultrole <@role|none>\``);};
            } else if (args[0] == "welcomerole") {
                args.shift();
                if (!args.length) {return message.channel.send(`Syntax: \`${prefix}server edit welcomerole <@role|none>\` This will add ping a role when new users join - if you mention a role, or disable it if you type "none".`)};
                if (args[0] == "none") {
                    currentServer.welcome_ping_role = null; save();
                    return message.reply("This server now has no welcome role ping - I won't add ping a role when users join. This can be re-enabled at any time.");
                } else if (args[0].startsWith("<@&") && args[0].endsWith(">")) {
                    currentServer.welcome_ping_role = args[0]; save();
                    return message.reply(`I'll ping that role when new members join.`);
                } else {return message.reply(`You didn't provide a valid operator. Syntax: \`${prefix}server edit welcomerole <@role|none>\``);};
            } else if (args[0] == "levelmessage") {
                args.shift();
                if (!args.length) {return message.channel.send(`Syntax: \`${prefix}server edit levelmessage <true|false>\` Setting this to \`true\` means that when a user levels up, a message will be sent. Otherwise, they'll just level up... er... *incognito*.`);};
                if (args[0] == "true" || args[0] == "yes") {
                    currentServer.level_update = true; save();
                    return message.reply("This server is now set to send level up messages.");
                } else if (args[0] == "false" || args[0] == "no") {
                    currentServer.level_update = false; save();
                    return message.reply("Level up messages have been disabled.");
                } else {return message.reply("You didn't provide a valid operator for this option. User either `true` or `false`.");};
            } else {return message.reply(`Invalid syntax/option provided. Syntax: \`${prefix}server edit <adminedit|updatechannel|welcomechannel|leavechannel|defaultrole|welcomerole|levelmessage>\``);};
        } else if (args[0] == "view") {
            for (i of Object.keys(currentServer)) {if (currentServer[i] == null) {currentServer[i] = "None"};};
            var serverSettingsEmbed = new Discord.MessageEmbed()
            .setAuthor("Server Settings", message.member.guild.iconURL())
            .setDescription(`Server: ${message.member.guild.name}`)
            .addField("Admin-only Settings-Changing", currentServer.server_edit_admin_requirement)
            .addField("Update Logging", currentServer.valk_update_channel)
            .addField("Welcome Message Channel", currentServer.welcome_message_channel)
            .addField("Leave Message Channel", currentServer.leave_message_channel)
            .addField("Join Role", currentServer.join_role)
            .addField("Welcome Committee Role", currentServer.welcome_ping_role)
            .addField("Level Up Messages", currentServer.level_update)
            .setColor("DC134C")
            .setFooter("Valkyrie")
            .setTimestamp();
            return message.channel.send(serverSettingsEmbed);
        } else if (args[0] == "newupdate" && message.author.id == "330547934951112705") {
            var upText = message.content.slice();
        } else {return message.reply(`Invalid syntax/option. Syntax: \`${prefix}server <edit|view>\``);};
    }
};