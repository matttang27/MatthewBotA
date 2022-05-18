

module.exports = {
	args: [0,1],
	name: "servertop",
	aliases: ["serverleaderboard","serverlb","sl","lb"],
	description: "Shows the server leaderboard in money",
	usage: `${prefix}template`,
	perms: [],
	status: 'closed',
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
		
		var serverusers = allusers.filter(user => guild.member(user[0]))
		serverusers.sort((a,b) => (a[1].money < b[1].money) ? 1 : -1)
		for (let i=0;i<serverusers.length;i++) {
			var user = await bot.users.fetch(serverusers[i][0])
			serverusers[i].push(user.username)
		}
		
		const filter = (reaction, user) => {
			return message.author.id == user.id && (reaction.emoji.name == "⬅️" || reaction.emoji.name == "➡️")
		};


		var place = 0

		for(var k = 0; k < serverusers.length; k++){
			if(serverusers[k][0] == message.author.id){
				place = k
			}
		}

		async function makeLeaderboard(page) {
			var leaderboard = ""
			
			for (let i=0+(10*(page-1));(i<10+(10*(page-1))) && (i<serverusers.length);i++) {
				leaderboard += `\n**${i+1}.** ${serverusers[i][2]} --- $${serverusers[i][1].money}`
			}
			

			var champ = await bot.users.fetch(serverusers[0][0])
			var champ = champ.avatarURL()
			
			var embed = new Discord.MessageEmbed()
			.setColor('#00ff04')
			.setTitle(`Leaderboard of ${message.guild.name}!`)
		
			if (champ) {
				embed.setThumbnail(champ)
			}
			embed.addField("Money",leaderboard)
			
			embed.setFooter(`Page ${page}/${Math.ceil((serverusers.length-1)/10)}`);
			if (place == 0 && Math.ceil((place+1)/10) != page) {
				embed.addField("Rank",`\nYou are the richest in this server!`)
			}
			else if(place && Math.ceil((place+1)/10) != page)  {
				embed.addField("Rank",`\nYou are ranked **#${place+1}** in this server!`)
			}

			await sended.edit(embed)

			if (page != 1) {
				await sended.react('⬅️')
			}
			if (serverusers.length - (page*10) > 0) {
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