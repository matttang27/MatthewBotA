const { prefix, ownerID } = require(require.resolve("@root/config.json"));
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [-1],
	name: "embedtemplate",
	description: "Template for sending an embed",
	usage: `${prefix}embedtemplate`,
	perms: ["MATTHEW"],
	async execute(message, args, other) {
		var admin = other["admin"]
		var bot = other["bot"]
		var commandName = other["commandName"]

		var embed = new Discord.MessageEmbed()
		.setTitle("Example")
		.setDescription("Example here")
		.setImage("")
		
	}
};	

