module.exports = (sequelize, DataTypes) => {
    return sequelize.define("users", {
        user_id: {
            type: DataTypes.STRING,
            primaryKey = true,
        },
        balance: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        rolledDice: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        diceDuelsWon: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        experience: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        level: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false,
        },
    }, {
        timestamps: false,
    });
};