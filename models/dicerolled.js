module.exports = (sequelize, DataTypes) => {
    return sequelize.define('dice_rolled', {
	name: DataTypes.STRING,
	description: DataTypes.TEXT,
	username: DataTypes.STRING,
	user_id: {
		type: DataTypes.STRING,
		unique: true
	},
	dice_rolled: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
})};