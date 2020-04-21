module.exports = (sequelize, DataTypes) => {
    return sequelize.define('server_settings', {
        guid_name: Sequelize.STRING,
        guild_id: {
            type: Sequelize.STRING,
            unique: true
        },
        server_edit_admin_requirement: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        valk_update_channel: {
            type: Sequelize.STRING,
            defaultValue: "none"
        },
        welcome_message_channel: {
            type: Sequelize.STRING,
            defaultValue: "none"
        },
        leave_message_channel: {
            type: Sequelize.STRING,
            defaultValue: "none"
        },
        join_role: {
            type: Sequelize.STRING,
            defaultValue: "none"
        }
})};