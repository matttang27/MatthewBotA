const { prefix, token } = require(require.resolve("@root/config.json"));
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [-1],
	aliases: ["cs"],
	name: "channelsend",
	description: "Send to channel",
	usage: `${prefix}cs <guildID> <channelID> message here`,
	perms: ["MATTHEW"],
	async execute(message, args, other) {
		var admin = other["admin"]
		var bot = other["bot"]
		var commandName = other["commandName"]
		
		var guild = await bot.guilds.fetch(args[0])
		var channel = await guild.channels.resolve(args[1])
		channel.send(args.slice(2).join(" "))

		
	}
};	