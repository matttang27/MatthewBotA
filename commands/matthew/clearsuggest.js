const { prefix, token } = require("../../config.json");
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [-1],
	category: "bot",
	name: "clearsuggest",
	aliases: ["clearsuggestions","csg"],
	description: "Clears all the suggestions",
	usage: `${prefix}template`,
	perms: ["MATTHEW"],
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
		fs.writeFileSync('suggestions.json', JSON.stringify({suggestions:[]},null,2));
		
	}
};	