const { prefix, token } = require(require.resolve("@root/config.json"));
const fs = require('fs');
const Discord = require('discord.js');
const natural = require('natural');
const wordnet = new natural.WordNet();

module.exports = {
	args: [-1],
	name: "test4",
	description: "4th test",
	usage: `${prefix}test4`,
	perms: ["MATTHEW"],
	async execute(message, args, other) {
		var admin = other["admin"]
		var bot = other["bot"]
		var commandName = other["commandName"]
		var disbut = other[3]
		var user = await bot.users.resolve(args[0].slice(3,21))
		console.log(user)

		
		
		
	}
};	