const { prefix, ownerID } = require("../../../config.json");
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [1],
	name: "guildinfo",
  aliases: ["gi"],
	description: "Logs information about all guilds Matthew Bot is currently in",
	usage: `${prefix}guildinfo <guildid>`,
	perms: ["MATTHEW"],
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
    var g = await bot.guilds.fetch(args[0])
    var m = await g.members.fetch(bot.user.id)
		message.channel.send(new Discord.MessageEmbed().setTitle(g.name).setThumbnail(g.iconURL()).setDescription(`Number of members: ${g.memberCount}\nDescription: ${g.description ? g.description : "None"}\nJoined At: ${m.joinedAt.toLocaleString("en-US", {timeZone: "America/New_York"})}`))
	}
};	

