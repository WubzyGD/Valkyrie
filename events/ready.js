const Discord = require('discord.js');
const chalk = require('chalk');
const moment = require('moment');

const prefix = 'v..';

module.exports = client => {
    console.log(`\n${chalk.green('[BOOT]')} >> [${moment().format('L LTS')}] -> ${chalk.greenBright("Connected to Discord")}.`);
    var date = new Date; date = date.toString().slice(date.toString().search(":") - 2, date.toString().search(":") + 6);
    console.log(`\n${chalk.gray('[INFO')} >> ${chalk.white(`Logged in at ${date}.`)}`);
    console.log(`\n${chalk.gray('[INFO')} >> ${chalk.white(`Logged in as ${client.user.username}!`)}`);
    console.log(`${chalk.gray('[INFO')} >> ${chalk.white(`Client ID: ${client.user.id}`)}`);
    console.log(`${chalk.gray('[INFO')} >> ${chalk.white(`Running on ${client.guilds.cache.size} servers!`)}`);
    console.log(`${chalk.gray('[INFO')} >> ${chalk.white(`Serving ${client.users.cache.size} users!`)}`);
    
    var responses = {"PLAYING": ["some high rolls...", "with dice...", "a great rpg...", "with the laws of the dice...", 
  	"with the dead elf's knife...", "with skeleton bones...", "with a new set of dice...", "five-finger filet...", 
  	"with the sanity of the bard...", "with Wubzy's winning chances...", "with Wubzy's patience...", "with the idea of becoming self-aware...",
  	"\"your code is wrong, wubzy\"", "with fire...", "with my food...", "with a fireball...", "dodge-fire-ball...",
  	"cards with Wubzy...", "with my code...", "roll to seduce...", "in blood...", "with a fishing rod...", 
	"52-Card Burn-up...", "some bops...", "battle music...", "country music during a battle...", "at being insane...",
	"I'm self-aware now...", "with newfound boredom...", "with a will to die...", "with stonks...", "with a deagle...",
	"with your server ;)...", "in a lava pool...", "piano, just badly...", "for only myself...", "with the odds...",
	"in purgatory...", "...", "hot cross bones...", "lots of nat 20s...", "with your odds of survival...",
	"with a knife", "0 days since last nat 1...", "it thicc and jazzy...", "it cool...", "in a new dungeon...",
	"Valkyrie4President...", "with time..."
	,`in ${client.guilds.cache.size} servers...`], "WATCHING": [
	"swordfights...", "Code Geass...", "Wubzy suffer...", "people suffer...", "low rolls...", "my plans unfold...",
	"over the dungeon...", "idiots get low rolls...", `for ${client.commands.size} commands...`,
	"my palace of gold...", "high rolls...", "risky battles...", "some idiot use a sword...", "castles crumble...",
	"for newcomers...", "out for some fun...", "the party argue...", "a bad love story...", "something sad...",
	"the plan go wrong...", "plans F through K...", "I'm not a bad slime, slurp", "the black swordsman...",
	"some tanuki girl...", "the 4 Heroes' Church...", "you sleep...", "Lelouch vi Britannia commands you...",
	"Touka run a marathon..."
	, `over ${client.guilds.cache.size} servers...`]};
	var type = Object.keys(responses)[Math.floor(Math.random() * Object.keys(responses).length)];
    client.user.setActivity(responses[type][Math.floor(Math.random() * responses[type].length)] + " | " + prefix + "help", {type: type});
};