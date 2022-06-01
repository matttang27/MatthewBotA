const { prefix, token } = require(require.resolve("@root/config.json"));
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [-1],
	name: "coinflip",
	aliases: ["coin","flip"],
	description: "Coinflip",
	usage: `${prefix}conflip`,
	perms: [],
	async execute(message, args, other) {
		var admin = other["admin"]
		var bot = other["bot"]
		var commandName = other["commandName"]

		var embed = new Discord.MessageEmbed()
		.setColor("00FF13")
		.setImage("https://cdn.discordapp.com/attachments/720354326228500560/823905182327898112/soraflipcut.gif")

		var sended = await message.channel.send(embed)
		setTimeout(() => {
			var embed = new Discord.MessageEmbed()
			var heads = Math.random() > 0.5
			embed.setTitle(heads ? "Heads!" : "Tails!" )
			embed.setColor("00DCFF")
			embed.setImage(heads ? "https://media.discordapp.net/attachments/720354326228500560/823766847916474379/unknown.png" : "https://cdn.discordapp.com/attachments/720354326228500560/823767004589850634/unknown.png" )
			sended.edit(embed)
		},2000)
		
		


		
	}
};	