const { prefix, token } = require(require.resolve("@root/config.json"));
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [-1],
	name: "crash",
	description: "Crashes Matthew Bot",
	usage: `${prefix}crash`,
	perms: ["MATTHEW"],
	async execute(message, args, other) {
		var admin = other["admin"]
		var bot = other["bot"]
		var commandName = other["commandName"]
		
		message.channel.send('Lol bye')
		process.exit(1);
	}
};	