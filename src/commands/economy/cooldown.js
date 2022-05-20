const { prefix, token, hourlycd, dailycd, weeklycd } = require("@config");
const fs = require('fs');
const Discord = require('discord.js');
const minutesToMessage = require('@functions')

module.exports = {
	args: [0],
	name: "cooldown",
	description: "Check your cooldowns!",
	aliases: ["cooldowns","cds","cd"],
	usage: `${prefix}cooldown`,
	perms: [],
	status: 'closed',
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
		var db = admin.firestore()
		var firestore = admin.firestore
		



		const userRef = db.collection('users').doc(message.author.id);
		user = await userRef.get();
		var userData = user.data()
		if (!userData) {
			return message.reply(`Create a profile first with ${prefix}profile !`)
		}
    var p = JSON.parse(fs.readFileSync('players.json'))
		var player = p.players.find(p => p.playerid == message.author.id)
		var diff = Date.now() - player.lasthourly

		if (diff / 1000 < hourlycd * 60) {
			var cooldown = hourlycd - Math.floor(diff/60000)
			var hourly = minutesToMessage(cooldown)
		}
		else {
			var hourly = "Ready!"
		}
		diff = Date.now() - player.lastdaily
		if (diff / 1000 < dailycd * 60) {
			var cooldown = dailycd - Math.floor(diff/60000)
			var daily = minutesToMessage(cooldown)
		}
		else {
			var daily = "Ready!"
		}
		diff = Date.now() - player.lastweekly
		if (diff / 1000 < weeklycd * 60) {
			var cooldown = weeklycd - Math.floor(diff/60000)
			var weekly = minutesToMessage(cooldown)
		}
		else {
			var weekly = "Ready!"
		}
		var user = await bot.users.fetch(message.author.id)
		var embed = new Discord.MessageEmbed()
			.setColor('#ed1c80')
			.setTitle(`Cooldowns of ${user.username}`)
			.addFields(
				{ name: 'Hourly ', value: `${hourly}` },
				{ name: 'Daily', value: `${daily}`},
				{ name: 'Weekly', value: `${weekly}`},
			)
			
			.setTimestamp()
			.setFooter(`Matthew Bot Coolodowns`);

		message.channel.send(embed)

		
	}
};	