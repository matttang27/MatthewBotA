const { prefix, ownerID } = require("@config");
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [0],
	name: "allguilds",
  aliases: ["ag"],
	description: "Logs information about all guilds Matthew Bot is currently in",
	usage: `${prefix}allguilds`,
	perms: ["MATTHEW"],
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
    var guilds = await bot.guilds.cache
    let sended = await message.channel.send(new Discord.MessageEmbed().setTitle("List of Guilds").setDescription(guilds.map(g => g.name + ":  **" + g.id + "**").join("\n")))
		
	}
};	

