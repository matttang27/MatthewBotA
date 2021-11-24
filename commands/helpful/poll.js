const { prefix, token } = require("../../config.json");
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
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
		

		
	}
};	