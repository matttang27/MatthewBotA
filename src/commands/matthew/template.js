const { prefix, ownerID } = require("@config");
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [-1],
	name: "template",
	description: "Template for commands. Literally does nothing",
	usage: `${prefix}template`,
	perms: ["MATTHEW"],
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
		

		
	}
};	

