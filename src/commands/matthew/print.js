const { prefix, ownerID } = require("@config");
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [-1],
	name: "print",
	description: "Returns your next message / image / embed whatever",
	usage: `${prefix}print`,
	perms: [],
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]

		var sended = await message.channel.send(new Discord.MessageEmbed())
		
	}
};	

