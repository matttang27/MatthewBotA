const { prefix, ownerID } = require("../../config.json");
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [0,1],
	name: "invite",
	description: "Matthew Bot's invite link",
	usage: `${prefix}invite <opt. perms>`,
	perms: 1,
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]


		message.channel.send(`https://discord.com/api/oauth2/authorize?client_id=720466960118186015&permissions=${args[0] ? args[0] : 8}&scope=bot`)
		
	}
};	

