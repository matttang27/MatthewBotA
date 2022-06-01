const { prefix, ownerID } = require(require.resolve("@root/config.json"));
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [-1],
	name: "print",
	description: "Returns your next message / image / embed whatever",
	usage: `${prefix}print`,
	perms: [],
	async execute(message, args, other) {
		var admin = other["admin"]
		var bot = other["bot"]
		var commandName = other["commandName"]

		var sended = await message.channel.send(new Discord.MessageEmbed())
		
	}
};	

