const { prefix, token } = require("../../config.json");
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [2],
	name: "emoji",
	description: "Sends emoji",
	usage: `${prefix}emoji <guild id> <emoji name>`,
	perms: [],
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
		var guild = await bot.guilds.fetch(args[0])
		var emoji = await guild.emojis.cache.find(r => r.name == args[1])
		
		message.channel.send(emoji.url)
		
	}
};	

