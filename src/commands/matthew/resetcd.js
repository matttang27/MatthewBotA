<<<<<<< HEAD
const { prefix, token } = require("../../../config.json");
const fs = require('fs');
const Discord = require('discord.js');

=======
>>>>>>> 9e79397123384be9c02f670d44438c53f18e283e
module.exports = {
    args: [-1],
    name: "resetcd",
    description: "Resets Matthew's Cooldowns",
    usage: `${prefix}resetcd`,
    perms: ["MATTHEW"],
    async execute(message, args, other) {
        var p = JSON.parse(fs.readFileSync('players.json').toString());
        var index = p.players.findIndex(p => p.playerid == message.author.id);
        var player = p.players[index];
        p.players[index] = {
            "playerid": message.author.id,
            "lastwork": 0,
            "lastdaily": 0,
            "lastweekly": 0
        };
        fs.writeFileSync('players.json', JSON.stringify(p, null, 2));
        message.channel.send("Reset your cooldowns!");
    }
};
