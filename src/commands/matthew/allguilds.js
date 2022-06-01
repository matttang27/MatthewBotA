const { prefix, ownerID } = require(require.resolve("@root/config.json"));
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
		var admin = other["admin"]
		var bot = other["bot"]
		var commandName = other["commandName"]
    var guilds = await bot.guilds.cache
    let sended = await message.channel.send(new Discord.MessageEmbed().setTitle("List of Guilds").setDescription(guilds.map(g => g.name + ":  **" + g.id + "**").join("\n")))
		
	}
};	

