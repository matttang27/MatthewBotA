const { prefix, token } = require("../../config.json");
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [0],
	name: "deleteallroles",
	description: "deletes all roles",
	usage: `${prefix}template`,
	perms: 1,
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
		var roles = await message.guild.roles.cache
		roles.each(r => {
			r.delete()
		})

		
	}
};	
