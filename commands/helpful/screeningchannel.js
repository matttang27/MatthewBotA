const { prefix, token } = require("../../config.json");
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [-1],
	name: "screeningchannel",
	description: "Matthew Bot Sends Scheduled Covid Screenings",
	aliases: ["sc"],
	usage: `${prefix}screeningchannel <sub command> <sub args>`,
	perms: [],
	async execute(message, args, other) {

    if (args.length == 0) {
      return message.channel.send(new Discord.MessageEmbed().setTitle("m!sc commands").setDescription("**create** - Creates a screening channel (or else Matthew Bot can't send anything)\n\n**list** - Lists all times Matthew Bot sends a covid screen\n\n**add** - Add a time for Matthew Bot to send a covid screen.\n\n**delete** - Deletes a time"))
    }
		var channels = await message.guild.channels.cache
		var channel = channels.find(c => c.name == "matthew-bot-screening")
		if (channel) {
			return message.channel.send("Channel already exists! *Want one right now? Use **m!cvs** !*")
		}
		else {
			var channel = await message.guild.channels.create('matthew-bot-screening',{
				type: 'GUILD_TEXT',
				topic: 'Matthew Bot sends a covid screen at 8:15am & 11:45am every day :D m!cvs for a new one',
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


