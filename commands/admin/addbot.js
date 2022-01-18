const { prefix, ownerID } = require("../../config.json");
const fs = require('fs');
const Discord = require('discord.js');
const top = require('@top-gg/sdk')
module.exports = {
	args: [-1],
	name: "addbot",
	description: "MatthewBot provides the authorization link :D. Uses the top.gg API",
	usage: `${prefix}addbot <Bot name>`,
	perms: ["MATTHEW"],
	status: "wip",
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
		

		
	}
};	

