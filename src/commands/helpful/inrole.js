const { prefix, token } = require(require.resolve("@root/config.json"));
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [-1],
	name: "inrole",
	description: "Lists members in role",
	usage: `${prefix}inrole`,
	perms: [],
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
		

		
	}
};	

