const Discord = require("discord.js");

module.exports = {
    name: "role",
    description: "",
    execute(message, msg, args, cmd, prefix, mention, client) {
        if (!args.length) {return message.channel.send(`Syntax: \`${prefix}role <add|remove|create|delete|edit>\``);};
        var td = args[0]; //td stands for toDo
        if (message.member.guild.members.get(client.user.id).hasPermission("MANAGE_ROLES")) {return message.reply("I don't seem to have permissions to manage roles in your server. Ask an admin to edit my permissions!");};
        if (td == "take" || td == "revoke") {td = "remove";} 
        else if (td == "give" || td == "grant") {td = "add";}
        else if (td == "guildremove") {td = "edit"};
        if (td == "add" || td == "remove") {
            if (!message.member.hasPermission("MANAGE_ROLES")) {return message.reply("You must have the permissions to manage roles!");};
            if (!mention) {return message.reply("You must mention the person you want to add/remove a role to/from." + ` Syntax: \`${prefix}role add/remove @<member> <roleName or mention>\``);};
            try {
                var rolename = msg.slice(msg.search("<@") + 2);
                if (rolename.startsWith("!")) {rolename = rolename.slice(1);};
                rolename = rolename.slice(19).trim();
                if (rolename.startsWith(">")) {rolename = rolename.slice(1).trim();};
                if (rolename.startsWith("<@&")) {
                    rolename = rolename.slice(3, rolename.length - 1).trim();
                    var role = message.member.guild.roles.get(rolename);
                } else {var role = message.member.guild.roles.filter(r => r.name.toLowerCase() == rolename).first();};
                if (role == undefined) {console.log(rolename); return message.channel.send("Something didn't work there. You most likely didn't provide a valid role name or mention, or no role at all.");};
            } catch (e) {
                return message.channel.send("Something didn't work there. You most likely didn't provide a valid role name or mention, or no role at all.");
            }; try {
                if (message.member.highestRole.position <= role.position) {return message.channel.send("You don't have the permissions to add/take that role because your highest role is lower than the role you're trying to add/take.");};
                if (message.member.highestRole.position <= message.member.guild.members.get(mention.id).highestRole.position) {return message.channel.send("You don't have the permissions to add/take that role because you don't have the permissions to edit the roles of the mentioned member.");};
                if (message.member.guild.members.get(client.user.id).highestRole.position <= role.position) {return message.channel.send("I don't have the permissions to add/take that role because it is higher than my highest role.");};
                if (message.member.guild.members.get(client.user.id).highestRole.position <= message.member.guild.members.get(mention.id).highestRole.position) {return message.channel.send("I can't add/take that role because their highest role is higher than my highest role.");};
                if (td == "add") {
                    if (message.member.roles.has(role.id)) {return message.channel.send(`${message.member.guild.members.get(mention.id).displayName} already has that role!`);};
                    message.member.guild.members.get(mention.id).addRole(role.id);
                    return message.reply(`Successfully gave ${message.member.guild.members.get(mention.id).displayName} the role \`${role.name}\`.`);
                } else {
                    if (!message.member.roles.has(role.id)) {return message.channel.send(`${message.member.guild.members.get(mention.id).displayName} doesn't have that role!`);};
                    message.member.guild.members.get(mention.id).removeRole(role.id);
                    return message.reply(`Successfully removed ${message.member.guild.members.get(mention.id).displayName}'s role, \`${role.name}\`.`);
                };
            } catch (e) {
                return message.channel.send("Hmm, something went wrong there. This is likely a permissions issue. If you're certain that all permissions are straight, contact WubzyGD#8766 for being an idiot.");
            };
        } else if (td == "delete") {
            if (!message.member.hasPermission("MANAGE_ROLES")) {return message.reply("You must have the permissions to manage roles!");};
            try {
                var rolename = msg.slice(msg.search("<@") + 2);
                if (rolename.startsWith("!")) {rolename = rolename.slice(1);};
                rolename = rolename.slice(19).trim();
                if (rolename.startsWith(">")) {rolename = rolename.slice(1).trim();};
                if (rolename.startsWith("<@&")) {
                    rolename = rolename.slice(3, rolename.length - 1).trim();
                    var role = message.member.guild.roles.get(rolename);
                } else {var role = message.member.guild.roles.filter(r => r.name.toLowerCase() == rolename).first();};
                if (role == undefined) {console.log(rolename); return message.channel.send("Something didn't work there. You most likely didn't provide a valid role name or mention, or no role at all.");};
            } catch (e) {
                return message.channel.send("Something didn't work there. You most likely didn't provide a valid role name or mention, or no role at all.");
            };
            try {
                if (message.member.highestRole.position <= role.position) {return message.channel.send("You don't have the permissions to delete that role because your highest role is lower than the role you're trying to add/take.");};
                if (message.member.guild.members.get(client.user.id).highestRole.position <= role.position) {return message.channel.send("I don't have the permissions to delete that role because it is higher than my highest role.");};
                try {role.delete()} catch {return message.reply("That's odd; I couldn't remove the role. Try again later?")};
                return message.reply(`Successfully deleted ${message.member.guild.name}'s role, \`${role.name}\`.`);
            } catch (e) {
                return message.channel.send("Hmm, something went wrong there. This is likely a permissions issue. If you're certain that all permissions are straight, contact WubzyGD#8766 for being an idiot.");
            };
        } else {return message.reply(`"${td}" isn't a valid action. Valid actions are: \`<add|remove|create|delete|edit>\``);};;
    }
};