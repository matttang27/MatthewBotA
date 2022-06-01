const { prefix, token } = require(require.resolve("@root/config.json"));
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
		var admin = other["admin"]
		var bot = other["bot"]
		var commandName = other["commandName"]
		if (message.guild.emojis)
		var emotes = JSON.parse(fs.readFileSync(require.resolve('@constants/serveremotes.json')).toString());
		var emoji = await bot.emojis.resolve(args[0])
		//copy from emote id
		if (emoji) {
			try {
				await message.guild.emojis.create(emoji.url,args.length == 2 ? args[1] : emoji.name)
				return message.react('✅')
			}
			catch {
				return message.react('❌')
			}
			
			
		}
		//Copy from emote name
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
