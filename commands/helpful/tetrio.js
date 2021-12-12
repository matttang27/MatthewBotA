const { prefix, ownerID } = require("../../config.json");
const fs = require('fs');
const Discord = require('discord.js');
const https = require('https')
const {httpsGet,httpRequest} = require('../../functions.js')
const chars = require("../../emojiCharacters.js")
module.exports = {
	args: [-1],
	name: "tetrio",
	aliases: ["tr","tetra"],
	description: "Get tetr.io results. Subcommands: leaderboard, user",
	usage: `${prefix}tetrio <command> <args>`,
	wip: false,
	perms: [],
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
		
		var db = admin.firestore()
		var trlist = await db.collection('trlist')
		
		if (args[0] == "leaderboard" || args[0] == "lb") {
			if ([undefined,"tr","lines","blitz"].indexOf(args[1]) == -1) {
				var embed = new Discord.MessageEmbed()
				.setColor("#FF0000")
				.setTitle("Tetrio Leaderboard Fail")
				.setDescription(`"${args[1]}" is not one of the available leaderboards: tr, lines, blitz`)
				.setFooter("Example: m!tetrio lb blitz")
				return message.channel.send(embed)
			}
			var embed = new Discord.MessageEmbed()
			.setColor('#26abFF')
			.setTitle("<a:loading:745769231295184959> Loading Leaderboard... Please be patient.")
			var sended = await message.channel.send(embed)
			var docRefs = await trlist.listDocuments()
			var documentIds = docRefs.map(it => it.id)

			var serverIds = await message.guild.members.cache.map((m) => m.id)

			var players = documentIds.filter(r => serverIds.indexOf(r) != -1)
			var lb = {}
			console.log(players)
			results = players.map(p => updatePlayer(p,false))
			records = []
			Promise.allSettled(results).then(async (result) => {
				console.log(result)
				for (i=0;i<result.length;i++) {
					var p = {
						userid: players[i],
						username: result[i].value.user.data.user.username,
						tr: result[i].value.user.data.user.league.rating,
						lines: result[i].value.records.data.records["40l"].record ? result[i].value.records.data.records["40l"].record.endcontext.finalTime : null,
						blitz: result[i].value.records.data.records["blitz"].record ?  result[i].value.records.data.records["blitz"].record.endcontext.score : null,
						rank: result[i].value.user.data.user.league.rank,
					}
					records.push(p)
				}
				var title = ""
				let imagelink;
				if (args[1] == "tr" || !args[1]) {
					title = "TETRA LEAGUE"
					var trlb = records.filter(r => r.tr >= 0)
					trlb = trlb.sort((a,b) => b.tr - a.tr)
					var text = ""
					
					var serveremotes = JSON.parse(fs.readFileSync('serveremotes.json').toString())
					
					for (i=0;i<trlb.length;i++) {
						var rank = trlb[i].rank
						if (rank.charAt(1) == "-") {
							rank = rank.charAt(0) + "minus"
						}
						if (rank.charAt(1) == "+") {
							rank = rank.charAt(0) + "plus"
						}
						rank = rank + "rank"
						emojiid = serveremotes[rank]
						
						text += `**${i+1}.** <@${trlb[i].userid}> - **${trlb[i].username}** - **${Math.round(trlb[i].tr*100)/100}** - <:${rank}:${emojiid}>\n `
					}
					imagelink = await bot.users.fetch(trlb[0].userid)
					imagelink = imagelink.displayAvatarURL()
					
				}
				else if (args[1] == "lines") {
					title = "40 LINES"
					var lineslb = records.filter(r => r.lines)
					lineslb = lineslb.sort((a,b) => a.lines - b.lines)

					var text = ""
					for (i=0;i<lineslb.length;i++) {
						text += `${i+1}. <@${lineslb[i].userid}> - **${lineslb[i].username}** - **${String(Math.floor(lineslb[i].lines / 60000))}:${String(Math.floor((lineslb[i].lines % 60000)/1000)).padStart(2, "0")}:${String(Math.floor(lineslb[i].lines % 60000 - Math.floor((lineslb[i].lines % 60000)/1000) * 1000)).padStart(3, "0") }**\n`
					}
					imagelink = await bot.users.fetch(lineslb[0].userid)
					imagelink = imagelink.displayAvatarURL()
				}
				else if (args[1] == "blitz") {
					title = "BLITZ"
					var blitzlb = records.filter(r => r.blitz)
					blitzlb = blitzlb.sort((a,b) => b.blitz - a.blitz)

					var text = ""
					for (i=0;i<blitzlb.length;i++) {
						text += `${i+1}. <@${blitzlb[i].userid}> **${blitzlb[i].username}** - **${blitzlb[i].blitz}**\n`
					}
					imagelink = await bot.users.fetch(blitzlb[0].userid)
					imagelink = imagelink.displayAvatarURL()
				}

				
				
				var embed = new Discord.MessageEmbed()
				.setTitle(`${title} Leaderboard of ${message.guild.name}`)
				.setDescription(text)
				.setFooter("Leaderboards: tr, lines, blitz")
				.setThumbnail(imagelink)
				sended.edit(embed)




				
			});
			
		}
		else if (args[0] == "add") {
			var docRefs = await trlist.listDocuments()
			let user = undefined
			user = await message.mentions.members.first()

			if (user == undefined) {
				return message.channel.send(new Discord.MessageEmbed().setTitle("m!tetrio add failed.").setDescription("Please mention a user (Your first argument should be a ping)").setColor("RED"))
			}
			userdata = await Promise.all([httpsGet("https://ch.tetr.io/api/users/" + args[2].toLowerCase(),https)
			,httpsGet("https://ch.tetr.io/api/users/" + args[2].toLowerCase() + "/records",https)]).then((values) => {
				console.log(values)
				trlist.doc(user.id).set({
					user: values[0],
					records: values[1]
				})
				message.react("👍")
			});
				
		}
		else if (args[0] == "view") {
			if (message.mentions.members.first()) {
				var user = message.mentions.members.first().user	
			}
			else if (args[1].length == 21) {
				try {
					var user = await bot.users.resolve(args[1].slice(3,21))
				} catch (e) {
					console.error(e)
				}
			}
			else {

				var search = args.slice(1).join(" ")
				var guildm = await message.guild.members.cache.filter(u => ((u.nickname ? u.nickname.toLowerCase() : null)  == search.toLowerCase()) || (u.user.username.toLowerCase() == search.toLowerCase()))
				var arraym = guildm.array()
				console.log(arraym)
				if (guildm.size > 1) {
					var text = ""
					for (i=0;i<arraym.length;i++){

						text = text + chars[i+1] + " - <@" + arraym[i] + ">\n"
					}
					var embed = new Discord.MessageEmbed()
					.setTitle("Select member or cancel command")
					.setDescription(text)
					.setTimestamp()
					var sended = await message.channel.send(embed)
				}
				else if (guildm.size == 1) {
					var user = guildm.first().user
					console.log(user)
				}
				else {
					return message.channel.send("No user found with that username / nickname.")
				}
			}

			var embed = new Discord.MessageEmbed()
			.setColor('#26abFF')
			.setTitle("<a:loading:745769231295184959> Loading Player... Please be patient.")
			var sended = await message.channel.send(embed)
			var userData = await updatePlayer(user.id,false)
			var username = userData.user.data.user.username
			embed
			.setTitle(`TETR.IO Profile of ${username.toUpperCase()}`)
			.setThumbnail(`https://tetr.io/user-content/avatars/${userData.user.data.user._id}.jpg?rv=${userData.user.data.user.avatar_revision}`)
			.setDescription("lol I'm too lazy just click on the link")
			.setURL(`https://ch.tetr.io/u/${username}`)
			var sended = await sended.edit(embed)
		}
		else if (args[0] == "refresh") {
			var embed = new Discord.MessageEmbed()
			.setColor('#26abFF')
			.setTitle("<a:loading:745769231295184959> Refreshing player information...")
			var sended = await message.channel.send(embed)
			var docRefs = await trlist.listDocuments()
			var documentIds = docRefs.map(it => it.id)

			var serverIds = await message.guild.members.cache.map((m) => m.id)

			var players = documentIds.filter(r => serverIds.indexOf(r) != -1)
			var lb = {}
			console.log(players)
			results = players.map(p => updatePlayer(p,true))

			Promise.allSettled(results).then((result) => {
				sended.edit(new Discord.MessageEmbed()
				.setTitle("Reload finished")
				.setColor("#00FF00")
				.setDescription("All player information in this server has been updated.")
				.setTimestamp()
				.setFooter("m!tetrio refresh success"))
			})
		}
		else {
			var embed = new Discord.MessageEmbed()
			.setTitle("Error: Not a Tetra Command")
			.setColor("#FF0000")
			.setDescription("Available subcommands:\n**view** - view the tetra profile of a guildmember.\n**lb** - view the server leaderboard for various modes.\n**add** - link a username and guildmember to the database.\n**refresh** - refreshes info of all players in this server.")
			.setFooter("Example: m!tetrio view <usermention or id>")

			message.channel.send(embed)
		}
		function updatePlayer(id,force) {
			return new Promise(async resolve => {
				var userRef = trlist.doc(id)
				var userData = await userRef.get()
				var userData = userData.data()

				
				var username = userData.user.data.user.username
				if (userData.user.cache.cached_until < Date.now() || force) {
					userData.user = await httpsGet("https://ch.tetr.io/api/users/" + username,https)
				}
				if (userData.records.cache.cached_until < Date.now() || force) {
					userData.records = await httpsGet("https://ch.tetr.io/api/users/" + username + "/records",https)
				}
				userRef.set(userData)
				resolve(userData)
			});

		}
	}
}	

