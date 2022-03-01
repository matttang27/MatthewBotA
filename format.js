message.channel.send("TESTING")
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
		return message.channel.send({embeds: [embed]})
	}
	var embed = new Discord.MessageEmbed()
		.setColor('#26abFF')
		.setTitle("<a:loading:745769231295184959> Loading Leaderboard... Please be patient.")
	var sended = await message.channel.send({embeds: [embed]})
	var userRef = chesslist.doc('users')
	let chessusers = await userRef.get()
	chessusers = chessusers.data()


	var serverIds = await message.guild.members.cache.map((m) => m.id)
	Object.filter = (obj, predicate) =>
		Object.fromEntries(Object.entries(obj).filter(predicate));

	var players = chessusers.users.filter(chessusers.users, r => serverIds.indexOf(r) != -1)
	var lb = {}
	console.log(players)
	results = players.map(p => updatePlayer(p, false))
	records = []
	Promise.allSettled(results).then((result) => {
		console.log(result)
		for (i = 0; i < result.length; i++) {
			var p = {
				userid: players[i],
				username: result[i].value.user.data.user.username,
				tr: result[i].value.user.data.user.league.rating,
				rapid: result[i].value.records.data.records["40l"].record ? result[i].value.records.data.records["40l"].record.endcontext.finalTime : null,
				blitz: result[i].value.records.data.records["blitz"].record ? result[i].value.records.data.records["blitz"].record.endcontext.score : null,
				rank: result[i].value.user.data.user.league.rank,
			}
			records.push(p)
		}
		var title = ""
		if (args[1] == "bullet" || !args[1]) {
			title = "BULLET"
			var bulletlb = records.filter(r => r.tr >= 0)
			bulletlb = bulletlb.sort((a, b) => b.tr - a.tr)
			var text = ""

			var serveremotes = JSON.parse(fs.readFileSync('serveremotes.json').toString())

			for (i = 0; i < bulletlb.length; i++) {
				var rank = bulletlb[i].rank
				if (rank.charAt(1) == "-") {
					rank = rank.charAt(0) + "minus"
				}
				if (rank.charAt(1) == "+") {
					rank = rank.charAt(0) + "plus"
				}
				rank = rank + "rank"
				emojiid = serveremotes[rank]

				text += `**${i + 1}.** <@${bulletlb[i].userid}> - **${bulletlb[i].username}** - **${Math.round(bulletlb[i].tr * 100) / 100}** - <:${rank}:${emojiid}>\n `
			}

		}
		else if (args[1] == "rapid") {
			title = "RAPID"
			var rapidlb = records.filter(r => r.rapid)
			rapidlb = rapidlb.sort((a, b) => a.rapid - b.rapid)

			var text = ""
			for (i = 0; i < rapidlb.length; i++) {
				text += `${i + 1}. <@${rapidlb[i].userid}> - **${rapidlb[i].username}** - **${String(Math.floor(rapidlb[i].rapid / 60000))}:${String(Math.floor((rapidlb[i].rapid % 60000) / 1000)).padStart(2, "0")}:${String(Math.floor(rapidlb[i].rapid % 60000 - Math.floor((rapidlb[i].rapid % 60000) / 1000) * 1000)).padStart(3, "0")}**\n`
			}
		}
		else if (args[1] == "blitz") {
			title = "BLITZ"
			var blitzlb = records.filter(r => r.blitz)
			blitzlb = blitzlb.sort((a, b) => b.blitz - a.blitz)

			var text = ""
			for (i = 0; i < blitzlb.length; i++) {
				text += `${i + 1}. <@${blitzlb[i].userid}> **${blitzlb[i].username}** - **${blitzlb[i].blitz}**\n`
			}
		}



		var embed = new Discord.MessageEmbed()
			.setTitle(`${title} Leaderboard of ${message.guild.name}`)
			.setDescription(text)
			.setFooter("Leaderboards: tr, rapid, blitz")
		sended.edit(embed)





	});

}
else if (args[0] == "add") {
	var userRef = chesslist.doc('users')
	let chessusers = await userRef.get()
	chessusers = chessusers.data()


	if (args[1].length == 21) {
		var user = await message.guild.members.resolve(args[1].slice(3, 21))
	}
	if (user == undefined) {
		return message.channel.send("User not found")
	}
	let chessuser = await chessAPI.getPlayerStats(args[2])
	console.log(chessuser)

}
else if (args[0] == "view") {
	if (message.mentions.members.first()) {
		var user = message.mentions.members.first().user
	}
	else if (args[1].length == 18 && !isNaN(args[1])) {
		try {
			var user = await message.guild.members.resolve(args[1])
		} catch (e) {
			console.error(e)
		}
	}
	else {

		var search = args.slice(1).join(" ")
		var guildm = await message.guild.members.cache.filter(u => ((u.nickname ? u.nickname.toLowerCase() : null) == search.toLowerCase()) || (u.user.username.toLowerCase() == search.toLowerCase()))
		var arraym = guildm.array()
		console.log(arraym)
		if (guildm.size > 1) {
			var text = ""
			for (i = 0; i < arraym.length; i++) {

				text = text + chars[i + 1] + " - <@" + arraym[i] + ">\n"
			}
			var embed = new Discord.MessageEmbed()
				.setTitle("Select member or cancel command")
				.setDescription(text)
				.setTimestamp()
			var sended = await message.channel.send({embeds: [embed]})
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
	var sended = await message.channel.send({embeds: [embed]})
	var userData = await updatePlayer(user.id, false)
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
	var sended = await message.channel.send({embeds: [embed]})
	var docRefs = await chesslist.listDocuments()
	var documentIds = docRefs.map(it => it.id)

	var serverIds = await message.guild.members.cache.map((m) => m.id)

	var players = documentIds.filter(r => serverIds.indexOf(r) != -1)
	var lb = {}
	console.log(players)
	results = players.map(p => updatePlayer(p, true))

	Promise.allSettled(results).then((result) => {
		sended.edit(new Discord.MessageEmbed()
			.setTitle("Reload finished")
			.setColor("#00FF00")
			.setDescription("All player information in this server has been updated.")
			.setTimestamp()
			.setFooter("m!chesscom refresh success"))
	})
}
else {
	var embed = new Discord.MessageEmbed()
		.setTitle("Error: Not a Tetra Command")
		.setColor("#FF0000")
		.setDescription("Available subcommands:\n**view** - view the tetra profile of a guildmember.\n**lb** - view the server leaderboard for various modes.\n**add** - link a username and guildmember to the database.\n**refresh** - refreshes info of all players in this server.")
		.setFooter("Example: m!chesscom view <usermention or id>")

	message.channel.send({embeds: [embed]})
}
function updatePlayer(id, force) {
	return new Promise(async resolve => {
		var userRef = chesslist.doc(id)
		var userData = await userRef.get()
		var userData = userData.data()


		var username = userData.user.data.user.username

		userData.user = await chessApi.getPlayerStats()
		if (userData.records.cache.cached_until < Date.now() || force) {
			userData.records = await httpsGet("https://ch.tetr.io/api/users/" + username + "/records", https)
		}
		userRef.set(userData)
		resolve(userData)
	});

}