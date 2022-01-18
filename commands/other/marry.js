const { prefix, ownerID } = require("../../config.json");
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [-1],
	name: "marry",
	description: "WIP (a.k.a i have nothing here)",
	usage: `${prefix}marry <user>`,
	perms: [],
	
	status: 'closed',
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
		

		
	}
};	

