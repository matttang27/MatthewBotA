const { prefix, token } = require(require.resolve("@root/config.json"));
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [-1],
	name: "poll",
	description: "Create a poll.",
	usage: `${prefix}poll`,
	perms: [],
  wip: true,
	async execute(message, args, other) {
		var admin = other["admin"]
		var bot = other["bot"]
		var commandName = other["commandName"]
		

		
	}
};	