const { prefix, ownerID } = require("../../config.json");
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [0,1],
	name: "connect4",
	description: "Connect4",
	usage: `${prefix}connect4 <opt. variation>`,
	perms: [],
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
		var player1 = message.author
		console.log("connect4 time")
		console.log(bot.games)

		if (args[0] == "help") {
			return message.channel.send(new Discord.MessageEmbed()
			.setTitle("Connect4 Variations")
			.setDescription("Here are the variations you can choose with m!connect4 <variation>\n\n**five**:\na normal game just with two side columns already filled in. Get five in a row to win!\n\n**unknown**:\nThe pieces are now all grey. Figure out which ones are yours to win!\n\n**blind**:\nIf you thought Unknown was too easy, try your hand at a game without being able to look at the board.\n\n**death**:\nFor the super tryhards, MatthewBot will delete all your messages and only tell you the last column played.")
			.setTimestamp()
			.setFooter("m!connect <variation>"))
		}
		else if (["five","unknown","blind","death",undefined].indexOf(args[0]) == -1) {
			return message.channel.send(new Discord.MessageEmbed()
			.setTitle("Connect 4 Failed")
			.setDescription(`Could not find variation ${args[1]}. Available variations: **five**,**unknown**,**blind**,**death**.\nSend \`m!connect4 help\` to learn more.`)
			.setColor("#FF0000")
			.setTimestamp()
			.setFooter(`m!connect4 from ${player1.username}`))
		}
		if (bot.games[message.channel.id]) {
			return message.channel.send(new Discord.MessageEmbed()
				.setTitle("Connect 4 Failed.")
				.setDescription("There is already an invite or game going on! Please wait.")
				.setColor("#FF0000")
				.setTimestamp()
				.setFooter(`m!connect4 from ${player1.username}`)
			)
		}
		else {
			var gamemode = (args.length == 0 ? "classic" : args[0])
			var embed = new Discord.MessageEmbed()
				.setTitle(`A Connect 4 Match has been created by ${player1.username}`)
				.setDescription(`Gamemode: **${gamemode}**\nType **accept** to accept the match`)
				.setTimestamp()
				.setFooter("The sender of this challenge can type 'cancel' to cancel this match")
			
			bot.games[message.channel.id] = "Tetris"
			
			
			await message.channel.send({embeds: [embed]})
			var filter = m => (m.author.id != player1.id && m.content == "accept") || (m.author.id == player1.id && m.content == "cancel")

			var collector = message.channel.createMessageCollector(filter, { time: 60000, max: 1 })

			collector.on('end', async (collected, reason) => {
				if (reason == "time") {
					bot.games[message.channel.id] = null
					return message.channel.send(new Discord.MessageEmbed()
						.setTitle("Connect 4 Invite Timed Out.")
						.setDescription("Looks like no one accepted your challenge...too powerful?")
						.setColor("#FF0000")
						.setTimestamp()
						.setFooter(`m!connect4 from ${player1.username}`))

				}
				else {
					if (collected.first().content == "cancel") {
						bot.games[message.channel.id] = null
						return message.channel.send(new Discord.MessageEmbed()
						.setTitle("Connect 4 Invite Cancelled.")
						.setTimestamp()
						.setFooter("this is an embed because im extra as fuck"))
					}
					var player2 = collected.first().author
					var sended = await message.channel.send(new Discord.MessageEmbed()
						.setTitle(`${player2.username} has accepted the challenge! Game will begin in 10 seconds...`)
						.setDescription("React to this message with an emote to customize your tokens, or they will be defaulted to :yellow_circle: and :blue_circle:\nYou can forfeit the game with m@forfeit")
						.setColor("#00FF00")
						.setTimestamp()
						.setFooter(`Connect 4: ${player1.username} vs ${player2.username}`))

					var emoji1 = ":blue_circle:"
					var emoji2 = ":yellow_circle:"
					var thisMove = "0 0";
					var filter = (reaction, user) => reaction.emoji.name != "yellow_circle" && reaction.emoji.name != "blue_circle" && (user.id == player1.id || user.id == player2.id)
					var react = sended.createReactionCollector(filter, { time: 10000 });

					react.on('collect', (reaction, user) => {

						console.log(`Collected ${reaction.emoji.identifier} from ${user.tag}`);
						if (user.id == player1.id) {
							if (reaction.emoji.id) {
								emoji1 = `<:${reaction.emoji.name}:${reaction.emoji.id}>`
							}
							else {
								emoji1 = `${reaction.emoji.name}`
							}

						}
						else {
							if (reaction.emoji.id) {
								emoji2 = `<:${reaction.emoji.name}:${reaction.emoji.id}>`
							}
							else {
								emoji2 = `${reaction.emoji.name}`
							}
						}
					});
					react.on('end', async collected => {
						//START GAME
						var width = 7
						var height = 6
						var required = 4
						if (gamemode == "five") {
							width = 9
							height = 6
							required = 5
						}
						var board = Array(height)
						for (i = 0; i < height; i++) {
							board[i] = Array(width)
							for (j = 0; j < width; j++) {
								board[i][j] = ":black_circle:"
							}
						}
						if (gamemode == "five") {
							for (i=0;i<height;i++) {
								board[i][0] = (i % 2 ? emoji1 : emoji2)
								board[i][width-1] = (i % 2 ? emoji2 : emoji1)
							}
						}


						var turn = 1

						while (true) {
							if (turn == 43) {
								bot.games[message.channel.id] = null
								return sended.edit(new Discord.MessageEmbed()
									.setTitle(`Connect4: ${player1.username} and ${player2.username} drew.`)
									.setDescription(`Turn: 43\n${printBoard(board,"classic",thisMove)}`)
									.setImage(player1.displayAvatarURL())
									.setTimestamp()
									.setFooter("Connect 4 End Screen"))
							}
							thisMove = await getMove()
							if (thisMove == "end") {
								return;
							}
							else {
								console.log(thisMove)
								if (checkWin(board, thisMove, required)) {
									bot.games[message.channel.id] = null
									return sended.edit(new Discord.MessageEmbed()
										.setTitle(`Connect4: ${turn % 2 ? player1.username : player2.username} beat ${turn % 2 ? player2.username : player1.username}!`)
										.setImage(turn % 2 ? player1.displayAvatarURL() : player2.displayAvatarURL())
										.setTimestamp()
										.setColor("#FFD700")
										.setFooter("Connect 4 End Screen")
										.setDescription(`Turns: ${turn}\n${printBoard(board,"classic",thisMove)}`))
								}
								else {
									turn++;
								}

							}
						}
						function checkWin(array, lastpiece, required) {
							console.log(array)
							var oy = parseInt(lastpiece.split(" ")[0])
							var ox = parseInt(lastpiece.split(" ")[1])
							var piece = array[oy][ox]
							console.log(piece)
							var y = oy
							var x = ox
							var xcheck = 1
							var ycheck = 1
							var updiag = 1
							var downdiag = 1
							//xcheck
							for (i = 1; i < required; i++) {
								if (y - i < 0) {
									break;
								}
								else if (array[y - i][x] == piece) {
									ycheck += 1
									console.log("add ycheck")
								}
								else { break }
							}
							y = oy
							x = ox
							for (i = 1; i < required; i++) {

								if (y + i >= array.length) {
									break;
								}
								console.log(array[y + i][x])
								if (array[y + i][x] == piece) {
									ycheck += 1
									console.log("add ycheck")
								}
								else { break }
							}
							if (ycheck >= required) {
								return true
							}
							console.log("xcheck")
							//ycheck
							y = oy
							x = ox
							for (i = 1; i < required; i++) {
								if (x - i < 0) {
									break;
								}
								else if (array[y][x - i] == piece) {
									xcheck += 1
								}
								else { break }
							}
							y = oy
							x = ox
							for (i = 1; i < required; i++) {
								if (x + i >= array[0].length) {
									break;
								}
								else if (array[y][x + i] == piece) {
									xcheck += 1
								}
								else { break }
							}
							if (xcheck >= required) {
								return true
							}
							//updiag check
							y = oy
							x = ox
							for (i = 1; i < required; i++) {
								if (x - i < 0 || y - i < 0) {
									break;
								}
								else if (array[y - i][x - i] == piece) {
									updiag += 1
								}
								else { break }
							}
							y = oy
							x = ox
							for (i = 1; i < required; i++) {
								if (x + i >= array[0].length || y + i >= array.length) {
									break;
								}
								else if (array[y + i][x + i] == piece) {
									updiag += 1
								}
								else { break }
							}
							if (updiag >= required) {
								return true
							}
							//downdiag check
							y = oy
							x = ox
							for (i = 1; i < required; i++) {
								if (x + i >= array[0].length || y - i < 0) {
									break;
								}
								else if (array[y - i][x + i] == piece) {
									downdiag += 1
								}
								else { break }
							}
							y = oy
							x = ox
							for (i = 1; i < required; i++) {
								if (x - i < 0 || y + i >= array.length) {
									break;
								}
								else if (array[y + i][x - i] == piece) {
									downdiag += 1
								}
								else { break }
							}
							if (downdiag >= required) {
								return true
							}
							return false
						}
						function printBoard(array,gamemode,thisMove) {
							text = ""
							if (gamemode == "blind") {
								text += "No board for you son"
							}
							else if (gamemode == "death") {
								text += "Last played: " + (parseInt(thisMove.split(" ")[1]) + 1)
							}
							else {
								for (i = 0; i < array.length; i++) {
									for (j = 0; j < array[i].length; j++) {
										if (gamemode == "unknown") {
											if (array[i][j] != ":black_circle:") {
												text += ":white_circle:"
											}
											else {
												text += ":black_circle:"
											}
										}
										else {
											text += array[i][j]
										}
										
									}
									text += "\n"
								}
								numbers = [":one:",":two:",":three:",":four:",":five:",":six:",":seven:",":eight:",":nine:",":keycap_ten:",":pause_button:"]
								for (i=0;i<width;i++) {
									text += numbers[i]
								}
							}
							
							return text
						}
						async function getMove() {
							return new Promise(async resolve => {
								await sended.edit(new Discord.MessageEmbed()
									.setTitle(`Connect4: ${player1.username} vs ${player2.username}`)
									.setColor("#00FFFF")
									.setDescription(`${player1.username} ${emoji1} - ${player2.username} ${emoji2}\n\n**Turn: ${turn}**\n${printBoard(board,gamemode,thisMove)}`)
									.setFooter(`${(turn % 2 ? player1 : player2).username} please send a column (1-${width})`))
								var filter = m => m.author.id == (turn % 2 ? player1.id : player2.id) && ((parseInt(m.content) > 0 && parseInt(m.content) <= width) || m.content == "m@resign")
								var collector = message.channel.createMessageCollector(filter, { time: 30000 })
								setTimeout(() => {
									if (!collector.ended) {
										message.channel.send(`<@${(turn % 2 ? player1 : player2).id}> has 10 seconds left to move!`)
									}
								}, 20000)

								collector.on('collect', (m) => {
									if (m.content == "m@forfeit") {
										bot.games[message.channel.id] = null
										sended.edit(new Discord.MessageEmbed()
											.setTitle(`Connect4: ${(turn % 2 ? player2 : player1).username} beat ${(turn % 2 ? player1 : player2).username} !`)
											.setColor("#00FF00")
											.setDescription(`${(turn % 2 ? player1 : player2).username} didn't move in time.`)
											.setTimestamp()
											.setFooter("Connect4 End Screen"))
										return collector.stop("forfeit")
									}
									for (i = 5; i >= 0; i--) {

										if (board[i][parseInt(m.content) - 1] == ":black_circle:") {
											board[i][parseInt(m.content) - 1] = turn % 2 ? emoji1 : emoji2
											m.delete()
											collector.stop(i + " " + (parseInt(m.content) - 1).toString())
											break;
										}

									}
									if (board[0][parseInt(m.content - 1)] != ":black_circle:" && !collector.ended) {
										m.channel.send(`<@${(turn % 2 ? player1 : player2).id}> invalid move: column is already full.`)
									}

								})
								collector.on('end', (collected, reason) => {
									if (reason == "forfeit") {
										resolve("end")
									}
									else if (reason == "time") {
										bot.games[message.channel.id] = null
										message.channel.send(new Discord.MessageEmbed()
											.setTitle(`Connect4: ${(turn % 2 ? player2 : player1).username} beat ${(turn % 2 ? player1 : player2).username} !`)
											.setColor("#00FF00")
											.setDescription(`${(turn % 2 ? player1 : player2).username} didn't move in time.`)
											.setTimestamp()
											.setFooter("Connect4 End Screen"))
										resolve("end")
									}
									else {
										resolve(reason)
									}
								})
							})
						}

					});

				}

			});
		}
	}
};

