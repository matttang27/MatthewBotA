const { prefix, token } = require("../../config.json");
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [1],
	name: "copyemotes",
	description: "Copies emotes from another server",
	usage: `${prefix}copyemotes`,
	perms: 2,
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
		
		console.log("syncing emotes")
		var emoji = await bot.guilds.fetch(args[0])
		emoji = await emoji.emojis.cache
		var gemojis = await message.guild.emojis
		
		emoji.each(e => {
			gemojis.create(e.url,e.name)
			})

		
	}
};	

