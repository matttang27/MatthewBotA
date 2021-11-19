const { prefix, token } = require("../../config.json");
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [1,2,3],
	name: "avatar",
	description: "Sends avatar",
	usage: `${prefix}avatar <user id> (format) (size)`,
	perms: [],
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
		if (args.length > 1) {
				if (["webp", "png", "jpg", "jpeg", "gif"].indexOf(args[1])== -1) {
				var embed = new Discord.MessageEmbed()
				.setColor("#FF0000")
				.setTitle("Avatar Image Format Fail")
				.setDescription(`"${args[1]}" is not one of the available image formats: webp, png, jpg, jpeg, gif`)
				return message.channel.send(embed)
			}
		}
		if (args.length > 2) {
			if (['16', '32', '64', '128', '256', '512', '1024', '2048', '4096'].indexOf(args[2]) == -1) {
				var embed = new Discord.MessageEmbed()
				.setColor("#FF0000")
				.setTitle("Avatar Image Size Fail")
				.setDescription(`"${args[2]} is not one of the available image sizes: 16, 32, 64, 128, 256, 512, 1024, 2048, 4096`)
				return message.channel.send(embed)
			}
		}
		
		var user = await bot.users.fetch(args[0],true,true)
		
		message.channel.send(user.displayAvatarURL({format: args.length > 1 ? args[1] : "jpg",size: args.length == 2 ? args[2] : 1024}))

		
	}
};	

