const { prefix, token } = require("@config");
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [1,2],
	name: "copyemote",
	aliases: ["ce","cemote"],
	description: "Copies emote from another server matthewbot is in.",
	usage: `${prefix}copyemote <emojiid / emote name> <opt custom name>`,
	perms: [0x0040000000],
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
		if (message.guild.emojis)
		var emotes = JSON.parse(fs.readFileSync('serveremotes.json').toString());
		var emoji = await bot.emojis.resolve(args[0])
		if (emoji) {
			message.guild.emojis.create(emoji.url,args.length == 2 ? args[1] : emoji.name).catch((err) => {
					return message.react('❌')
				}).then(() => {
					return message.react('✅')
				})
			
		}
		else {
			if (emotes[args[0]]) {
				emoji = await bot.emojis.resolve(emotes[args[0]])
				message.guild.emojis.create(emoji.url,args.length == 2 ? args[1] : emoji.name).catch((err) => {
					return message.react('❌')
				}).then(() => {
					return message.react('✅')
				})
			}
			else {
				return message.reply("Could not find emote with the name: " + args[0])
			}
		}
		

		
	}
};	
