function wait(time) {
	return new Promise(function (resolve) {
		setTimeout(function () {
		  	resolve("anything");
		}, time);
	});
};

const Sequelize = require("sequelize");
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
})
wait(100).then(async () => {
    const diceRolled = await sequelize.import("./models/dicerolled");
    const userGameData = await sequelize.import("./models/usergamedata");

    var e = process.argv.includes('--force') || process.argv.includes('-f');

    sequelize.sync({force: false}).then(async () => {
        console.log('Database synced');
        //sequelize.close();
    }).catch(console.error);

    module.exports = {diceRolled, userGameData};
});