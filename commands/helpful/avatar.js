const { prefix, token } = require("../../config.json");
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [1],
	name: "avatar",
	description: "Sends avatar",
	usage: `${prefix}avatar <user id>`,
	perms: 4,
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
		var user = await bot.users.fetch(args[0],true,true)
		message.channel.send(user.displayAvatarURL({format: "jpg",size: 1024}))
		
	}
};	

