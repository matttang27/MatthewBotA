const { prefix, token } = require("../../../config.json");
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [-1],
	name: "crash",
	description: "Crashes Matthew Bot",
	usage: `${prefix}crash`,
	perms: ["MATTHEW"],
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
		
		message.channel.send('Lol bye')
		process.exit(1);
	}
};	