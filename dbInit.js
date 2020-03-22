const Sequelize = require("sequelize");
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

sequelize.import("./models/dicerolled");
sequelize.import("./models/usergamedata");

var force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({force}).then(async () => {
	console.log('Database synced');
	sequelize.close();
}).catch(console.error);