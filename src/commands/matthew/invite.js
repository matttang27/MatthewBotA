<<<<<<< HEAD
const { prefix, ownerID } = require("../../../config.json");
const fs = require('fs');
const Discord = require('discord.js');

=======
>>>>>>> 9e79397123384be9c02f670d44438c53f18e283e
module.exports = {
    args: [0],
    name: "invite",
    description: "Matthew Bot's invite link",
    usage: `${prefix}invite <opt. perms>`,
    perms: [],
    async execute(message, args, other) {
        var admin = other[0];
        var bot = other[1];
        var commandName = other[2];
        message.channel.send(`Here's my server invite ->\nhttps://discord.com/api/oauth2/authorize?client_id=720466960118186015&permissions=536870911991&scope=bot\n\nNote: This invite gives MatthewBot all permissions (excluding admin), but you can change the permissions of the Matthew Bot role in your settings.`);
    }
};
