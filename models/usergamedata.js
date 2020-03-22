module.exports = (sequelize, DataTypes) => {
    return sequelize.define('usergamedata', {
	user_id: {
		type: DataTypes.STRING, 
		unique: true
	},
	username: DataTypes.STRING,

	xp: {
		type: DataTypes.INTEGER,
		defaultValue: 0
	}, 
	last_xpGain: DataTypes.STRING,
	level: {
		type: DataTypes.INTEGER,
		defaultValue: 1
	},
	prestige: {
		type: DataTypes.INTEGER,
		defaultValue: 0
	},

	fighters_count: {
		type: DataTypes.INTEGER,
		defaultValue: 0
	},
	money: {
		type: DataTypes.INTEGER,
		defaultValue: 100
	},
	lost_remnants: {
		type: DataTypes.INTEGER,
		defaultValue: 0
	},
	prestige_fighters_count: {
		type: DataTypes.INTEGER,
		defaultValue: 0
	},
	boss_damage_done: {
		type: DataTypes.INTEGER,
		defaultValue: 0
	},
	ancient_boss_damage_done: {
		type: DataTypes.INTEGER,
		defaultValue: 0
	}
})};