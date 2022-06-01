const { prefix, token } = require(require.resolve("@root/config.json"));
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
		var admin = other["admin"]
		var bot = other["bot"]
		var commandName = other["commandName"]
		fs.writeFileSync('suggestions.json', JSON.stringify({suggestions:[]},null,2));
		
	}
};	