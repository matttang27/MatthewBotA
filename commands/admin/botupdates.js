const { prefix, token } = require("../../config.json");
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [-1],
	name: "botupdates",
	description: "Creates an annoucements channel for MatthewBot",
	aliases: ["bu"],
	usage: `${prefix}botupdates`,
	perms: 2,
	async execute(message, args, other) {
		var channels = await message.guild.channels.cache
		var channel = channels.find(c => c.name == "matthew-bot-updates")
		if (channel) {
			return message.channel.send("Channel already exists!")
		}
		else {
			var channel = await message.guild.channels.create('matthew-bot-updates',{
				type: 'GUILD_TEXT',
				topic: 'Like those annoucement thingys, but worse',
				permissionOverwrites: [
					{
						id: message.guild.id,
						deny: ['SEND_MESSAGES'],
					}
				]
			})
			message.channel.send(`Your <#${channel.id}> channel has been created! Please move it to a position you like`)
		}
	}
};	


