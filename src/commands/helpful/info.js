const { prefix, token } = require(require.resolve("@root/config.json"));
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [-1],
	name: "info",
	description: "Gets info about a person",
	usage: `${prefix}info <ID or mention>`,
	perms: ["MATTHEW"],
	async execute(message, args, other) {
		var admin = other["admin"]
		var bot = other["bot"]
		var commandName = other["commandName"]
		var alias = []
		var guilds = []
		var guildlist = Array.from(bot.guilds.cache)
		console.log(Array.from(bot.users.cache))
		console.log()
		var author = message.mentions.users.first() ? message.mentions.users.first() : await bot.users.fetch(args[0])
		console.log("part 1")
		for (i=0;i<guildlist.length;i++) {
			var g = guildlist[i]
			var m = await g.members.fetch(author.id)
			console.log(m);
			if (m != undefined){
				alias.push(m.nickname)
				guilds.push(g.name)
			}
		}

		var embed = new Discord.MessageEmbed()
		.setColor("#00FF00")
		.setTitle(author.username)
		.setDescription(author.tag)
		.addField("a.k.a", alias.length > 0 ? alias.join(",") : "None.")
		.addField("In Guilds: ", guilds.length > 0 ? guilds.join(", ") : "None.")
		.setImage(author.avatarURL)
		var sended = await message.channel.send({ embeds: [embed]})
		sended.pin();
	}
}