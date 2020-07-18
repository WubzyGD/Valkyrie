module.exports = (sequelize, DataTypes) => {
    return sequelize.define('server_settings', {
        guid_name: DataTypes.STRING,
        guild_id: {
            type: DataTypes.STRING,
            unique: true
        },
        server_edit_admin_requirement: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        valk_update_channel: {
            type: DataTypes.STRING,
            defaultValue: "none"
        },
        welcome_message_channel: {
            type: DataTypes.STRING,
            defaultValue: "none"
        },
        leave_message_channel: {
            type: DataTypes.STRING,
            defaultValue: "none"
        },
        join_role: {
            type: DataTypes.STRING,
            defaultValue: "none"
        },
        prefix: {
            type: DataTypes.STRING,
            defaultValue: "v."
        },
        adminPrefix: {
            type: DataTypes.STRING,
            defaultValue: "adm."
        },
        level_update: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        log_channel: {
            type: DataTypes.STRING,
            defaultValue: "none"
        },
        welcome_ping_role: {
            type: DataTypes.STRING,
            defaultValue: "none"
        },
})};