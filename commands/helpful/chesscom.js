const { prefix, ownerID } = require("../../config.json");
const fs = require('fs');
const Discord = require('discord.js');
const chars = require("../../emojiCharacters.js")
const ChessWebAPI = require('chess-web-api');


module.exports = {
	args: [-1],
	name: "chesscom",
	aliases: ["chc"],
	description: "Get chess.com results. Subcommands: leaderboard, user",
	usage: `${prefix}chesscom <command> <args>`,
	wip: false,
	perms: [],
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]

		let chessAPI = new ChessWebAPI();
		let test = await chessAPI.getPlayer('matttang_05')
		var db = admin.firestore()
		var chesslist = await db.collection('chess')

		if (args[0] == "leaderboard" || args[0] == "lb") {
			if ([undefined, "bullet", "blitz", "rapid"].indexOf(args[1]) == -1) {
				var embed = new Discord.MessageEmbed()
					.setColor("#FF0000")
					.setTitle("Chess.com Leaderboard Fail")
					.setDescription(`"${args[1]}" is not one of the available leaderboards: bullet, blitz, rapid`)
					.setFooter("Example: m!chesscom lb blitz")
				return message.channel.send(embed)
			}
			var embed = new Discord.MessageEmbed()
				.setColor('#26abFF')
				.setTitle("<a:loading:745769231295184959> Loading Leaderboard... Please be patient.")
			var sended = await message.channel.send(embed)
			var userRef = chesslist.doc('users')
			let chessusers = await userRef.get()
			chessusers = chessusers.data()
			chessusers = chessusers.users


			var serverIds = await message.guild.members.cache.map((m) => m.id)
			var players = {}
			for (i in chessusers) {
				if (serverIds.indexOf(i) >= 0) {
					players[i] = chessusers[i]
				}
			}
			var lb = {}
			console.log(players)
			for (i in players) {
				let body = await chessAPI.getPlayerStats(players[i])
				if (body.statusCode != 200) {
					delete players[i]
				}
				players[i] = [players[i], body.body]
			}
			console.log(players)
			records = []

			for (i in players) {
				let p = {
					userid: i,
					username: players[i][0],
					bullet: players[i][1].chess_bullet.last.rating,
					blitz: players[i][1].chess_blitz.last.rating,
					rapid: players[i][1].chess_rapid.last.rating,

				}
				records.push(p)
			}
			console.log(records)
			var title = ""
			let imagelink;
			if (args[1] == "bullet" || !args[1]) {
				title = "BULLET"
				var bulletlb = records.filter(r => r.bullet >= 0)
				bulletlb = bulletlb.sort((a, b) => b.bullet - a.bullet)
				var text = ""
				for (i = 0; i < bulletlb.length; i++) {
					text += `${i + 1}. <@${bulletlb[i].userid}> **${bulletlb[i].username}** - **${bulletlb[i].bullet}**\n`
				}
				imagelink = await bot.users.fetch(bulletlb[0].userid)
				imagelink = imagelink.displayAvatarURL()

			}
			else if (args[1] == "rapid") {
				title = "RAPID"
				var rapidlb = records.filter(r => r.rapid)
				rapidlb = rapidlb.sort((a, b) => a.rapid - b.rapid)

				var text = ""
				for (i = 0; i < rapidlb.length; i++) {
					text += `${i + 1}. <@${blitzlb[i].userid}> **${blitzlb[i].username}** - **${blitzlb[i].rapid}**\n`
				}
				imagelink = await bot.users.fetch(rapidlb[0].userid)
				imagelink = imagelink.displayAvatarURL()
			}
			else if (args[1] == "blitz") {
				title = "BLITZ"
				var blitzlb = records.filter(r => r.blitz)
				blitzlb = blitzlb.sort((a, b) => b.blitz - a.blitz)

				var text = ""
				for (i = 0; i < blitzlb.length; i++) {
					text += `${i + 1}. <@${blitzlb[i].userid}> **${blitzlb[i].username}** - **${blitzlb[i].blitz}**\n`
				}
				imagelink = await bot.users.fetch(blitzlb[0].userid)
				imagelink = imagelink.displayAvatarURL()
			}



			var embed = new Discord.MessageEmbed()
				.setTitle(`${title} Leaderboard of ${message.guild.name}`)
				.setDescription(text)
				.setFooter("Leaderboards: bullet, rapid, blitz")
				.setThumbnail(imagelink)
			sended.edit(embed)





		}
		else if (args[0] == "add") {
			console.log(args.length)
			console.log(args[1].length)
			if (args.length < 3 || args[1].length != 22) {
				return message.channel.send(new Discord.MessageEmbed().setTitle("Incorrect arguments").setDescription("Incorrect arguments for **m!chesscom add**\n\nUsage: \`m!chesscom add <userping> <chess username>\`").setColor("RED"))
			}
			var userRef = chesslist.doc('users')
			let chessusers = await userRef.get()
			chessusers = chessusers.data()
			chessusers = chessusers.users
			console.log(chessusers)

			var user = await message.guild.members.resolve(args[1].slice(3, 21))

			if (user == undefined) {
				return message.channel.send("User not found")
			}
			let chessuser
			try {
				chessuser = await chessAPI.getPlayerStats(args[2])
			} catch (err) {
				return message.channel.send(new Discord.MessageEmbed().setTitle("Chess User not found").setDescription(`Was not able to find user **${args[2]}** on chess.com. Please check and try again.`).setColor("RED"))
			}
			chessusers[args[1].slice(3, 21)] = args[2]
			userRef.set({
				users: chessusers
			})
      message.react("✅")

		}
		else if (args[0] == "view") {
			user = message.mentions.first()
			if (user == undefined) {
				return message.channel.send(new Discord.MessageEmbed().setTitle("User not found").setDescription(`Was not able to find user ${args[1]} in this server.`).setColor("RED"))
			}
			var userRef = chesslist.doc('users')
			let chessusers = await userRef.get()
			chessusers = chessusers.data()
			chessusers = chessusers.users

			if (chessusers[user.id] == undefined) {
				return message.channel.send(new Discord.MessageEmbed().setTitle("Chess User").setDescription(`${args[1]} does not have an associated chess.com account (add it with m!chc add <user> <Username>)`).setColor("RED"))
			}
			var embed = new Discord.MessageEmbed()
				.setColor('#26abFF')
				.setTitle("<a:loading:745769231295184959> Loading Player... Please be patient.")
			var sended = await message.channel.send(embed)
			try {
				var userData = await chessAPI.getPlayerStats(chessusers[user.id])
			}
			catch {
				return message.channel.send(new Discord.MessageEmbed().setTitle("Chess User not found.").setDescription(`....not sure how this happened, but **${chessusers[user.id]} cannot be found.`).setColor("RED"))
			}
			
			
			var userImage = await chessAPI.getPlayer(chessusers[user.id])
			userImage = userImage.body.avatar

			let p = {
				userid: user.id,
				username: chessusers[user.id],
				bullet: userData.body.chess_bullet.last.rating,
				blitz: userData.body.chess_blitz.last.rating,
				rapid: userData.body.chess_rapid.last.rating,

			}
			var embed = new Discord.MessageEmbed()
				.setTitle(`Chess.com Profile of ${p.username}`)
				.setThumbnail(userImage)
				.setDescription("Will finish one day.... Click on the link for now sorry :D")
				.setURL(`https://www.chess.com/member/${username}`)
			var sended = await sended.edit(embed)
		}
		
		else {
			var embed = new Discord.MessageEmbed()
				.setTitle("Error: Not a ChessCom Command")
				.setColor("#FF0000")
				.setDescription("Available subcommands:\n**view** - view the chess profile of a guildmember.\n**lb** - view the server leaderboard for various game times.\n**add** - link a username and guildmember to the database.")
				.setFooter("Example: m!chesscom add <usermention> <chess username>")

			message.channel.send(embed)
		}

	}
}

