const { prefix, token } = require("../../config.json");
const fs = require('fs');
const Discord = require('discord.js');
const {findMember} = require('../../functions.js')
module.exports = {
	args: [-1],
	aliases: ["ems","em"],
	name: "emoters",
	description: "2 modes: leaderboard and profile",
	usage: `${prefix}emoters lb <opt. page> or ${prefix}emoters <ping, username or id>`,
	perms: [],
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
		var r = JSON.parse(fs.readFileSync('reactions.json').toString());

		var embed = new Discord.MessageEmbed()
		if (args[0] == "lb" || args[0] == "leaderboard") {
			var embed = new Discord.MessageEmbed()
			.setColor('#26abFF')
			.setDescription("<a:loading:745769231295184959> Getting leaderboard...")
			
			var sended = await message.channel.send({embeds: [embed]})

			var e = []

			for (person in r.users) {
				e.push([person,r.users[person].count])
			}
			e.sort((a,b) => b[1] - a[1])
			console.log(e)
			const filter = (reaction, user) => {
				return message.author.id == user.id && (reaction.emoji.name == "⬅️" || reaction.emoji.name == "➡️")
			};

			async function makeLeaderboard(page) {
				var leaderboard = ""
				
				for (i=0+(10*(page-1));(i<10+(10*(page-1))) && (i<e.length);i++) {
					leaderboard += `\n**${i+1}.** ${r.users[e[i][0]].name} --- **${e[i][1]}** reactions`
					if (e[i][1] == 69) leaderboard += "   ***Nice***"
				}

				var embed = new Discord.MessageEmbed()
				.setColor('#00ff04')
				.setTitle(`Emoter Leaderboard of ${message.guild.name}!`)
				var champ = await bot.users.fetch(e[0][0])
				champ = champ.avatarURL()
				if (champ) embed.setThumbnail(champ)

				embed.setDescription(leaderboard)

				embed.setFooter(`Page ${page}/${Math.ceil((e.length-1)/10)}`);

				var place = e.map(x => x[0]).indexOf(message.author.id)
				if (place == 0 && Math.ceil((place+1)/10) != page) {
					embed.addField("Rank",`\nYou are the best emoter in this server!`)
				}
				else if(place > 0 && Math.ceil((place+1)/10) != page)  {
					embed.addField("Rank",`\nYou are ranked **#${place+1}** in this server!`)
				}

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
			var member = findMember(message,args)
			var member = await message.guild.members.fetch(member)
			if (!member) {
				message.reply("Could not find user.")
			}
			if (!r.users[member.user.id]) {
				message.reply("User has not reacted.")
			}
			else {
				var embed = new Discord.MessageEmbed()
				.setColor('#00ff04')
				.setTitle(`Emote Profile of ${member.user.username}!`)
				if (member.user.displayAvatarURL()) {
					embed.setThumbnail(`${member.user.displayAvatarURL()}`)
				}
				embed.addField("Emotes used",r.users[member.user.id].count)
				
				//sort
				var e = []

				for (emote in r.users[member.user.id].reactions) {
					e.push([emote,r.users[member.user.id].reactions[emote]])
				}
				e.sort((a,b) => b[1] - a[1])
				var string = ""
				for (i=0;i<e.length && i<10;i++) {
					string += `<:${r.reactions[e[i][0]].name}:${e[i][0]}> --- ${e[i][1]}\n`
				}
				embed.addField("Favourite Emotes: ", string)
				message.channel.send({embeds: [embed]})
			}
		}
		

		
	}
};	