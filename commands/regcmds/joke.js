const Discord = require("discord.js");

module.exports = {
    name: "joke",
    description: "",
    execute(message, msg, args, cmd, prefix, mention, client) {
        message.delete();
        if (args[0] == "dirty") {
            var djokes = [
                "What do you get when you cross a bunny and a rottweiler?\n||Just the rottweiler.||",
                "Why can't orphans play basbeall?\n||Because they don't know where home is.||",
                "What is the hardest part of a vegetable to eat?\n||The wheelchair.||",

            ];
            var djoke = djokes[Math.floor(Math.random() * djokes.length)];
            return message.channel.send("**Dirty Joke**: " + djoke);
        };
        var jokes = [
            "What's red and bad for your teeth?\n||A brick.||",
            "If at first you don't succeed… ||Then skydiving definitely isn't for you.||",
            "It turns out a major new study recently found that humans eat more bananas than monkeys. It's true. I can't remember the last time I ate a monkey.",
            "What's a skeleton samurai's favorite weapon?\n||A __Shoulder Blade__!||"
        ];
        var joke = jokes[Math.floor(Math.random() * jokes.length)];
        return message.channel.send(joke);
    }
};