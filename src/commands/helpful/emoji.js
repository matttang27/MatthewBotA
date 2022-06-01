const { prefix, token } = require(require.resolve("@root/config.json"));
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [2],
	name: "emoji",
	description: "Sends emoji",
	usage: `${prefix}emoji <guild id> <emoji name>`,
	perms: [],
	async execute(message, args, other) {
		var admin = other["admin"]
		var bot = other["bot"]
		var commandName = other["commandName"]
		var guild = await bot.guilds.fetch(args[0])
		var emoji = await guild.emojis.cache.find(r => r.name == args[1])
		
		message.channel.send(emoji.url)
		
	}
};	

