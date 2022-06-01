const {
    prefix,
    token
} = require(require.resolve("@root/config.json"));
const fs = require('fs');
const Discord = require('discord.js');
module.exports = {
    args: [1],
    name: "pin",
    description: "Pins a message",
    usage: `${prefix}pin messageID`,
    perms: ["MANAGE_MESSAGES"],
    async execute(message, args, other) {
        var admin = other["admin"];
        var bot = other["bot"];
        var commandName = other["commandName"];
        var pin = await message.channel.messages.fetch(args[0]);
        console.log(message.author.username + "Pinned a message with ID " + args[0]);
        pin.pin().then(console.log).catch(console.error);
    }
};