const { prefix, ownerID } = require(require.resolve("@root/config.json"));
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [1],
	name: "allchannels",
  aliases: ["ac"],
	description: "Logs information about all channels in a server",
	usage: `${prefix}allchannels`,
	perms: ["MATTHEW"],
	async execute(message, args, other) {
		var admin = other["admin"]
		var bot = other["bot"]
		var commandName = other["commandName"]
    var guild = await bot.guilds.fetch(args[0])
    var channels = await guild.channels.cache
    let sended = await message.channel.send(new Discord.MessageEmbed().setTitle("List of channels").setDescription(channels.map(g => g.name + ":  **" + g.id + "**").join("\n")))
		
	}
};	

