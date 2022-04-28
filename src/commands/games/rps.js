const { prefix, token } = require("../../config.json");
const fs = require('fs');
const Discord = require('discord.js');



module.exports = {
	args: [1,2],
	name: "rps",
	aliases: ["challenge","chal","jankenpon"],
	description: "Challenge a player to a game of Rock Paper Scissors.(Default first to one)",
	usage: `${prefix}rps <player> <first to>`,
	example: `${prefix}rps @Matthew 5`,
	perms: [],
	status: 'closed',
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]

		
		var mention = message.mentions.members.array()
		
		if (message.channel.type == "dm") {
			return message.reply("Sorry but you can only battle in a guild!")
		}
		
		if (args[0] == "accept") {
			
			
			var g = JSON.parse(fs.readFileSync('games.json').toString());
			var c = g.games.find(game => game.id2 == message.author.id)
			var d = g.games.find(game => (game.id1 == message.author.id || game.id2 == message.author.id) && game.status == "battling")
			if (d) {
				return message.channel.send(`You are already in a battle!`)
			}
			if (!c) {
				return message.channel.send(`No one has challenged you! Challenge someone else with ${prefix}rps <target>`)
			}
			
			var index = g.games.findIndex(game => game.id2 == message.author.id)
			g.games[index].status = "battling"
			
			let data = JSON.stringify(g,null,2);
			fs.writeFileSync('games.json', data);

			var moves = ['rock','paper','scissors','r','p','s']

			const filter = m => {
				var player = players.find(p => p.id == m.author.id)
				console.log(player)
				console.log(m)
				return moves.includes(m.content.toLowerCase()) && c.channel.id == m.channel.id && (m.author.id == game.id1 || m.author.id == game.id2) && player.move == ""}



			players = [
				{
					id: c.id1,
					move: "",
					score: c.score1
				},
				{
					id: c.id2,
					move: "",
					score: c.score2
				}
			]
			
			function battle(round){
				message.channel.send(`RPS Battle ${round}!`)
				const collector = message.channel.createMessageCollector(filter , { time: 10000, max: 2 });
				collector.on('collect', m => {
					console.log(m)
				})

						
				collector.on('end', (collected,reason) => {
					if (reason == "Correct") {
						return
					}
					else if (!collected.first()) {
						return message.channel.send("No reply. Game ended.")
					}
					else {
						message.channel.send("Both players replied!")
					}
				});
			};
			battle(1)
		}	
		else if (args[0] == "cancel") {
			
		}
		
		else if (mention.length == 0) {
			return message.reply("Mention someone to battle!")
		}
		else if (mention.length > 1) {
			return message.reply("You can only battle one person!")
		}
		else if (mention[0].user.id == "720466960118186015") {
			return message.channel.send("**You dare challenge me foolish mortal? Even immediately deleting messages cannot escape my all-knowing eyes.**")
		}
		else if (mention[0].user.bot) {
			return message.reply("You can't battle a bot!")
		}
		else if (mention[0].user.id == message.author.id) {
			return message.reply("You can't battle yourself!")
		}
		else {
			
			
			var g = JSON.parse(fs.readFileSync('games.json').toString());
			var c = g.games.find(game => game.id1 == mention[0].user.id || game.id2 == mention[0].user.id)
			if (c) {
				if (c.status == "challenge") {
					if (c.id2 == mention[0].user.id) {
						return message.reply("Sorry, this player already has a challenge pending.")
					}
				}
				else if (c.status == "battling") {
					return message.reply("Sorry, this player is already battling!")
				}
			}

			g.games[g.games.length] = {
				status: "challenge",
				goal: args[1] || 1,
				guild: message.guild.id,
				channel: message.channel.id,
				challengetime: Date.now(),
				starttime: null,
				id1: message.author.id,
				name1: message.author.username,
				score1: 0,
				id2: mention[0].user.id,
				name2: mention[0].user.username,
				score2: 0
			}
			let data = JSON.stringify(g,null,2);
			fs.writeFileSync('games.json', data);
			message.channel.send(`<@${message.author.id}> has challenged ${args[0]} to a match of Rock Paper Scissors! Type in ${prefix}rps accept to accept this challenge!`)
		}
			
		
		
		
	}
};	