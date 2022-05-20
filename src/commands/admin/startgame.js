const { prefix, token } = require("@config");

module.exports = {
	args: [2],
	name: "startgame",
	category: "TOS",
	aliases: ["startgame","finishregister","sg"],
	description: "Starts the game! (Must be Gamemaster or Admin)",
	usage: `${prefix}startgame <gameID> <channelnum>`,
	example: `${prefix}startgame 15 2`,
	perms: ["MATTHEW"],
	status: 'closed',
	async execute(message, args, other) {
		var db = other[0].firestore()
		var firestore = other[0].firestore
		var gameNum = args[0]
		
		const gameRef = db.collection('games').doc(gameNum);
		var game = await gameRef.get();
		var gameData = game.data()


		if (!game.exists) {
  		return message.reply("We got a problem here... your game is missing. Maybe it got deleted?")
		}
		if (message.guild.id != gameData.guildId) {
			return message.reply("Sorry, this isn't the correct server")
		}

		if (!gameData.gameMasters.includes(message.member.id)) {
			return message.reply("Sorry, only a gamemaster can start this game!")
		}

		var messageId = gameData.signUp

		
		var channel = message.guild.channels.cache.find(channel => channel.id == gameData.channelId)

		console.log(channel)

		var message = await channel.messages.fetch(messageId)
		console.log(message)
		//takes text channels only


		var reactions = message.reactions.cache;
		reactions = reactions.array()
		var users = []
		var j = []
		var k = []
		for (i=0;i<reactions.length;i++) {
			j.push(await reactions[i].users.fetch())
		}
		console.log("\n\n\n\n\n")
		var m = []
		for (i=0;i<j.length;i++) {
			m.push(j[i].array())
		}
		console.log(m)
		for (i=0;i<m.length;i++) {
			for (a=0;a<m[i].length;a++) {
				users.push(m[i][a].id)
			}
		}
		
		users = users.filter(function(user, pos) {
			return users.indexOf(user) == pos;
		})
		console.log(users)

		users.forEach(user => {
			gameRef.collection('players').doc(user).set({
				test: "hi"
			})
		})
		var counter = args[1]
		channel = message.guild.channels.cache.find(channel => channel.name == `town-${counter}`)

		channel.send(`@everyone Starting Game-Id: ${args[0]}!`)
		channel.send(`Player list: `)
		for (i=0;i<users.length;i++) {
			channel.send(`<@!${users[i]}>`)
		}
		message.channel.send(`Started game in game-${args[1]}`)
		






		

		

		
		
	},
};