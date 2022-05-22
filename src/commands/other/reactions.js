const { prefix, token } = require("@root/config.json");
const fs = require('fs');
const Discord = require('discord.js');
const {findMember} = require('@functions')
module.exports = {
	args: [1,2],
	aliases: ["res","re"],
	name: "reactions",
	description: "2 modes: leaderboard and profile",
	usage: `${prefix}reactions lb <opt. page> or ${prefix}reactions <emote>`,
	perms: [],
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
		var db = admin.firestore()
		let guildRef = db.collection("reactions").doc(message.guild.id)
		let r = await guildRef.get()
		if (r.exists) {
			r = r.data()
		}
		else {
			return message.channel.send("Send an emoji in your server first!")
		}

		var embed = new Discord.MessageEmbed()
		if (args[0] == "lb" || args[0] == "leaderboard") {
			var embed = new Discord.MessageEmbed()
			.setColor('#26abFF')
			.setDescription("<a:loading:745769231295184959> Getting leaderboard...")
			
			var sended = await message.channel.send(embed)

			var e = []

			for (react in r.reactions) {
				e.push([react,r.reactions[react].count])
			}
			e.sort((a,b) => b[1] - a[1])
			console.log(e)
			const filter = (reaction, user) => {
				return message.author.id == user.id && (reaction.emoji.name == "⬅️" || reaction.emoji.name == "➡️")
			};

			async function makeLeaderboard(page) {
				var leaderboard = ""
				
				for (i=0+(10*(page-1));(i<10+(10*(page-1))) && (i<e.length);i++) {
					leaderboard += `\n**${i+1}.** <:${r.reactions[e[i][0]].name}:${e[i][0]}> --- **${e[i][1]}** reacts`
					if (e[i][1] == 69) leaderboard += "   ***Nice***"
				}

				var embed = new Discord.MessageEmbed()
				.setColor('#00ff04')
				.setTitle(`Reaction Leaderboard of ${message.guild.name}!`)
				var champ = await message.guild.emojis.cache.get(e[0][0])
				champ = champ.url
				if (champ) embed.setThumbnail(champ.url)

				embed.setDescription(leaderboard)

				embed.setFooter(`Page ${page}/${Math.ceil((e.length-1)/10)}`);

				

				await sended.edit(embed)

				if (page != 1) {
					await sended.react('⬅️')
				}
				if (e.length - (page*10) > 0) {
					await sended.react('➡️')
				}
				
				
				const collector = sended.createReactionCollector(filter, { time: 15000, max: 1 });

				

				collector.on('end', async collected => {
					if (!collected.first()) {
						return
					}
					else if (collected.first().emoji.name == '⬅️') {
						await sended.reactions.cache.each(reaction => reaction.remove())
						makeLeaderboard(page-1)
					}
					else if (collected.first().emoji.name == '➡️') {
						await sended.reactions.cache.each(reaction => reaction.remove())
						makeLeaderboard(page+1)
					}
				});
			}
			makeLeaderboard(args[1] ? args[1] : 1)
		}

		else {

			
			
			var reaction = args[0].slice(-19,-1)
			var temp = reaction
			var emoji = await message.guild.emojis.cache.get(reaction)
			if (!emoji) {
				return message.reply("Could not find reaction.")
			}
			if (!r.reactions[reaction]) {
				return message.reply("Has not been reacted.")
			}
			reaction = r.reactions[reaction]
			var embed = new Discord.MessageEmbed()
			.setColor('#00ff04')
			.setTitle(`Reaction Profile of `)
			.setThumbnail(`${emoji.url}`)
			embed.addField("Times used",reaction.count)
			
			//sort
			var e = []

			for (user in reaction.users) {
				e.push([user,reaction.users[user]])
			}
			e.sort((a,b) => b[1] - a[1])
			var string = ""
			for (i=0;i<e.length && i<10;i++) {
				string += `${r.users[e[i][0]].name} --- ${e[i][1]}\n`
			}
			embed.addField("Favourite Users: ", string)
			message.channel.send(embed)
		}
		

		
	}
};	