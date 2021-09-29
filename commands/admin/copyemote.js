const { prefix, token } = require("../../config.json");
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [1,2],
	name: "copyemote",
	aliases: ["ce","cemote"],
	description: "Copies emote from another server matthewbot is in.",
	usage: `${prefix}copyemote <emojiid> <opt custom name>`,
	perms: 2,
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
		

		var emoji = await bot.emojis.resolve(args[0])
		message.guild.emojis.create(emoji.url,args.length == 2 ? args[1] : emoji.name)

		
	}
};	
