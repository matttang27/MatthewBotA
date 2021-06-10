const { prefix, token } = require("../../config.json");
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [0,1],
	name: "top",
	aliases: ["globalleaderboard","globallb","gl","gtop","glb"],
	description: "Shows the server leaderboard in money",
	usage: `${prefix}template`,
	perms: 4,
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
		var db = admin.firestore()
		var firestore = admin.firestore


		var embed = new Discord.MessageEmbed()
			.setColor('#26abFF')
			.setDescription("<a:loading:745769231295184959> Getting leaderboard...")
			
		var sended = await message.channel.send(embed)

		async function getMarker() {
			const snapshot = await db.collection('users').get()
			return snapshot.docs.map(doc => [doc.id,doc.data()]);
		}
		var guild = message.guild
		var allusers = await getMarker()
		
		
		allusers.sort((a,b) => (a[1].money < b[1].money) ? 1 : -1)
		for (i=0;i<allusers.length;i++) {
			var user = await bot.users.fetch(allusers[i][0])
			allusers[i].push(user.username)
		}

		var place = -1

		for(var k = 0; k < allusers.length; k++){
			if(allusers[k][0] == message.author.id){
				place = k
			}
		}
		


		const filter = (reaction, user) => {
			return message.author.id == user.id && (reaction.emoji.name == "⬅️" || reaction.emoji.name == "➡️")
		};

		async function makeLeaderboard(page) {
			var leaderboard = ""
			
			for (i=0+(10*(page-1));(i<10+(10*(page-1))) && (i<allusers.length);i++) {
				leaderboard += `\n**${i+1}.** ${allusers[i][2]} --- $${allusers[i][1].money}`
			}
			console.log(place)
			
			var champ = await bot.users.fetch(allusers[0][0])
			var champ = champ.avatarURL()

			var embed = new Discord.MessageEmbed()
			.setColor('#00ff04')
			.setTitle(`World Leaderboard!`)
			
			.addField("Money",leaderboard)
			.setFooter(`Page ${page}/${Math.floor((allusers.length-1)/10)+1}`);


			if (champ) {
				embed.setThumbnail(champ)
			}
			if (place == 0 && Math.ceil((place+1)/10) != page) {
				embed.addField("Rank",`\nYou are the richest man alive!`)
			}
			else if(place && Math.ceil((place+1)/10) != page)  {
				embed.addField("Rank",`\nYou are ranked **#${place+1}** in the world!`)
			}
			
			await sended.edit(embed)

			if (page != 1) {
				await sended.react('⬅️')
			}
			if (allusers.length - (page*10) > 0) {
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
		makeLeaderboard(args[0] || 1)
		

		
	}
};	