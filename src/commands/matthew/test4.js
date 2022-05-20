<<<<<<< HEAD
const { prefix, token } = require("../../../config.json");
const fs = require('fs');
const Discord = require('discord.js');
=======
>>>>>>> 9e79397123384be9c02f670d44438c53f18e283e
const natural = require('natural');
const wordnet = new natural.WordNet();
module.exports = {
    args: [-1],
    name: "test4",
    description: "4th test",
    usage: `${prefix}test4`,
    perms: ["MATTHEW"],
    async execute(message, args, other) {
        var admin = other[0];
        var bot = other[1];
        var commandName = other[2];
        var disbut = other[3];
        var user = await bot.users.resolve(args[0].slice(3, 21));
        console.log(user);
    }
};
