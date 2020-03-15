const Sequelize = require("sequelize");

const sequelize = new Sequelize("database", "user", "password", {
	host: "localhost",
	dialect: "sqlite",
	logging: false,
	storage: "database.sqlite"
});

sequelize.import("models/users");

const force = process.argv.includes("--force") || process.argv.includes("-f");