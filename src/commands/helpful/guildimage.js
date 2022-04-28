const { prefix, token } = require("../../config.json");
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [-1],
	name: "guildimage",
	description: "Gets banner of guild",
	usage: `${prefix}guildimage <guildid>`,
	perms: [],
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
		
		var guild = await bot.guilds.fetch(args[0],true,true)
		message.channel.send(guild.bannerURL({format: "jpg",size: 1024}))
		
	}
};	

