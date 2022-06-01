const { prefix, ownerID } = require(require.resolve("@root/config.json"));
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [0],
	name: "invite",
	description: "Matthew Bot's invite link",
	usage: `${prefix}invite <opt. perms>`,
	perms: [],
	async execute(message, args, other) {
		var admin = other["admin"]
		var bot = other["bot"]
		var commandName = other["commandName"]


		message.channel.send(`Here's my server invite ->\nhttps://discord.com/api/oauth2/authorize?client_id=720466960118186015&permissions=536870911991&scope=bot\n\nNote: This invite gives MatthewBot all permissions (excluding admin), but you can change the permissions of the Matthew Bot role in your settings.`)
		
	}
};	

