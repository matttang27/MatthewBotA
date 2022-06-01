const { prefix, token } = require(require.resolve("@root/config.json"));
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [1],
	name: "copyemotes",
	aliases: ["ces","cemotes"],
	description: "Copies emotes from another server",
	usage: `${prefix}copyemotes <guild id>`,
	perms: [0x0040000000],
	async execute(message, args, other) {
		var admin = other["admin"]
		var bot = other["bot"]
		var commandName = other["commandName"]
		
		console.log("syncing emotes")
		var emoji = await bot.guilds.fetch(args[0])
		emoji = await emoji.emojis.cache
		var gemojis = await message.guild.emojis
		
		emoji.each(e => {
			gemojis.create(e.url,e.name)
			})

		
	}
};	

