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
	},

	upgrade_fighters: {
		type: DataTypes.INTEGER,
		defaultValue: 0
	},
	upgrade_base: {
		type: DataTypes.INTEGER,
		defaultValue: 0
	},
	upgrade_daily: {
		type: DataTypes.INTEGER,
		defaultValue: 0
	},
	upgrade_remnants: {
		type: DataTypes.INTEGER,
		defaultValue: 0
	},

	commands_executed: {
		type: DataTypes.INTEGER,
		defaultValue: 0
	},

	is_vip: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
	custom_background: {
		type: DataTypes.STRING,
		defaultValue: "none"
	},
	custom_emblem: {
		type: DataTypes.STRING,
		defaultValue: "none"
	},
	custom_levelup_message: {
		type: DataTypes.STRING,
		defaultValue: "none"
	},
	user_bio: {
		type: DataTypes.STRING,
		defaultValue: "Not Set"
	}
})};