<<<<<<< HEAD
const { prefix, ownerID } = require("../../../config.json");
const fs = require('fs');
const Discord = require('discord.js');

=======
>>>>>>> 9e79397123384be9c02f670d44438c53f18e283e
module.exports = {
    args: [-1],
    name: "react",
    description: "React to Message",
    usage: `${prefix}react <channelid> <messageid> <reactions (spaced)>`,
    perms: ["MATTHEW"],
    async execute(message, args, other) {
        var admin = other[0];
        var bot = other[1];
        var commandName = other[2];
        var type = message.channel.type;
        if (message.author.id != ownerID) {
            if (type == "text") {
                if (!message.member.roles.cache.find(r => r.name == "Puppeteer")) {
                    return;
                }
            }
        }
        if (args.length == 0) {
            return message.reply("You need a message!");
        }
        message.delete();
        if (type == "text") {
            var channel = await bot.channels.fetch(args[0]);
            var message = await channel.messages.fetch(args[1]);
            for (let i = 0; i < args.length - 2; i++) {
                await message.react(args[i + 2]);
            }
        }
    }
};
