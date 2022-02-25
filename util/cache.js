const gs = require('gradient-string');
const spinnies = require('dreidels');
const chalk = require('chalk');

module.exports = async (client) => {
    return new Promise(async resolve => {
        const loaders = [];
        const spin = new spinnies();

        console.log('');

        let arCache = spin.add("ar", {text: "Caching ARs..."});
        loaders.push(require('./cache/ar')(client, arCache));

        let blCache = spin.add("bl", {text: "Caching Guild Blacklists..."});
        let bluCache = spin.add("blu", {text: "Caching User Blacklists..."});
        loaders.push(require('./cache/bl')(client, blCache, bluCache));

        let rpCache = spin.add("rp", {text: "Caching RP..."});
        loaders.push(require('./cache/rp')(client, rpCache));

        await Promise.all(loaders);
        
        /*console.log(`${chalk.gray('[PROC]')} >> ${chalk.blueBright(`Cached`)} ${chalk.white(`${client.misc.cache.bl.guild.length}`)} ${chalk.blueBright(`guild blacklists`)}`);
        console.log(`${chalk.gray('[PROC]')} >> ${chalk.blueBright(`Cached`)} ${chalk.white(`${client.misc.cache.bl.user.length}`)} ${chalk.blueBright(`user blacklists`)}`);
        console.log(`${chalk.gray('[PROC]')} >> ${chalk.blueBright(`Cached`)} ${chalk.white(`${client.misc.cache.lxp.enabled.length}`)} ${chalk.blueBright(`guilds with XP enabled.`)}`);
        console.log(`${chalk.gray('[PROC]')} >> ${chalk.blueBright(`Cached`)} ${chalk.white(`${client.misc.cache.lxp.hasLevelRoles.length}`)} ${chalk.blueBright(`guilds with Level Roles enabled.`)}`);
        console.log(`${chalk.gray('[PROC]')} >> ${chalk.blueBright(`Cached`)} ${chalk.white(`${Object.keys(client.misc.cache.monit).length}`)} ${chalk.blueBright(`guilds with Monitors enabled.`)}`);
        console.log(`${chalk.gray('[PROC]')} >> ${chalk.blueBright(`Cached`)} ${chalk.white(`${client.misc.cache.animeNum}`)} ${chalk.blueBright(`animes into lookup registry.`)}`);
        console.log(`${chalk.gray('[PROC]')} >> ${chalk.blueBright(`Cached`)} ${chalk.white(`${client.misc.cache.charsNum}`)} ${chalk.blueBright(`characters into lookup registry.`)} ${chalk.gray(`(${client.misc.cache.chars.size} // NN)`)}`);
        console.log(`${chalk.gray('[PROC]')} >> ${chalk.blueBright(`Cached`)} ${chalk.white(`${client.misc.cache.chests.enabled.length}`)} ${chalk.blueBright("guilds that spawn chests.")}`);*/
        resolve(0);
    });
};