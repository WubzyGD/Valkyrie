const mongoose = require('mongoose');

const botDataSchema = new mongoose.Schema({
    finder: String,
    commands: Number,
    servers: Number,
    servers_all: Number,
    restarts: Number,
    lastRestart: Date,
    errors_all: Number,
    totalErrors: Number,
    simp: Number,
    lastWaifuRage: String
});

module.exports = mongoose.model("bot", botDataSchema);