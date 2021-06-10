const { prefix, token } = require("../../config.json");
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [-1],
	name: "kidnap",
	description: "Kidnaps everyone to one voice channel",
	usage: `${prefix}kidnap <channelID> or <channelName>`,
	perms: 1,
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
		
		var name = args.join(" ");
		var channel = await message.guild.channels.cache.find(c => c.id == args[0])
		if (!channel) {
			var channel = await message.guild.channels.cache.find(c => c.name == name && c.type == "voice");
		}
		
		
		
		message.guild.members.cache.each(user => {
			if (user.voice.channel) {
				user.voice.setChannel(channel);
			}
		})



		
	}
};	