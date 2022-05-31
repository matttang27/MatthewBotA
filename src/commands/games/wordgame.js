const { prefix, token } = require(require.resolve("@root/config.json"));
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [0],
	name: "wordgame",
	aliases: ["beer", "coffee", "wine"],
	category: "fun",
	description: "Word games!",
	usage: `${prefix}<beer, coffee or wine>`,
	perms: [],
	async execute(message, args, other) {

		var admin = other[0]
		var firestore = admin.firestore
		var db = admin.firestore()
		var FieldValue = firestore.FieldValue
		let users = db.collection('users');
		var bot = other[1]
		var commandName = other[2]
		var words = require("an-array-of-english-words")
		var game = ""
		var player;
		var saltcount = {}
		const place = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"]
		const description = {
			"beer": "Enter a word containing all four letters in any order.",
			"coffee": "Enter a word containing the two letters at the correct spaces.",
			"wine": "Enter a word containing all 3 letters in order"
		}
		const startTitle = {
			"beer": "🍺 The Beer is being brewed. m@start when you're ready! 🍺",
			"coffee": "☕ A new Coffee is being brewed. m@start for the caffeine boost! ☕",
			"wine": "🍷 The Wine is being fermented. m@start to start the game! 🍷"
		}
		const finishTitle = {
			"beer": "🍺 The Beer has finished Brewing! 🍺",
			"coffee": "☕ The Coffee has finished Brewing! ☕",
			"wine": "🍷 The Wine is ready! 🍷"
		}
		const emote = {
			"beer": "🍺",
			"coffee": "☕",
			"wine": "🍷"
		}
		const check = {
			"beer": (check, word) => {
				let temp = word
				for (j = 0; j < 4; j++) { temp = temp.replace(check[j], "") }
				return temp.length + 4 == word.length
			},
			"coffee": (check, word) => { return (word[check[0]] == check[2] && word[check[1]] == check[3]) },
			"wine": (check, word) => { return word.includes(check.join("")) }
		}
		const ask = {
			"beer": (check) => { return `Enter a word containing **${check.join("")}** in any order.` },
			"coffee": (check) => { return `Enter a word with the **${place[check[0]]}** letter being **${check[2]}** and the **${place[check[1]]}** letter being **${check[3]}**.` },
			"wine": (check) => { return ` Enter a word containing **${check.join("")}**.` }
		}


		if (commandName == "wordgame") {
			return message.channel.send(new Discord.MessageEmbed()
				.setTitle("Matthew Bot's word games!")
				.setDescription(`Currently Matthew Bot has 3 (three) word games that you can play:\n**beer**: ${description.beer}\n**coffee** ${description.coffee}\n**wine** ${description.wine}\n\nBefore the game, you can edit the **m@time**, **m@difficulty**, and **m@goal**, as well as the **m@salt** gamemode\n\n**m@start** to start the game\n**m@end** to end the game\n**m@lb** to view the leaderboard.`))
        .setFooter("Play one now with: m!beer , m!coffee, or m!wine !")
		}
		else {
			game = commandName
		}


		var time = 20;
		var diff = 1000;
		var goal = 100;
		var salt = false;
		var lb = {}
		var hp = 20;
		var salted = []
		var embed = new Discord.MessageEmbed()
			.setTitle(startTitle[game])
			.setDescription(`${description[game]}\nPoints System: \n\n1st - 10pts\n2nd - 5pts\n3rd - 3pts\n4th - 2pts\n5th - 1 pt.\n\n**Current settings:**\n**m@time** : The amount of time in seconds to answer the question(5-120). \n(Current: ${time})\n**m@difficulty** : The amount of possible answers that is required(100-3000)\n(Current: ${diff})\n**m@goal** : the number of points to get (10-1000)\n(Current: ${goal})\n\n**m@salt** : toggles the salt gamemode \n\nEnd the game with **m@end**\nView the in-game leaderboard with **m@lb**`)
			.setColor("#6f4e37")
			.setFooter("m@end to stop right now")

		var reactor = await message.channel.send(embed)



		const filter = () => { return true };
		const collector = message.channel.createMessageCollector(filter, { time: 60000 });

		collector.on('collect', m => {

			if (m.content == "m@start") {
				if (salt) {
					if (Object.keys(lb).length >= 2) {
						m.react('✅')
						collector.stop("start");
					}
					else {
						message.channel.send(`There are currently only ${Object.keys(lb).length} players. Please get more people to join before starting.`)
					}
				}
				else {


					return collector.stop('start')
				}
			}
			else if (m.content == "m@salt") {
				salt = !salt
				if (salt) {
					m.react("✅").then((r) => { m.react("🧂") })
					message.channel.send("This is now a SALT game, at least 2 players need to **m@join** before we can m@start the game!\nAlso, the hp per person is currently 20 (use m@hp to change)")
				}
				else {
					return m.react("❌").then((r) => { m.react("🧂") })
				}
			}
			else if (m.content == "m@end") {
				return message.channel.send("Game cancelled.")
			}
			else if (m.content == "m@join") {
				if (salt) {
					lb[m.author.id] = hp
					m.react('✅')
				}
			}
			else if (m.content.startsWith("m@time") || m.content.startsWith("m@difficulty") || m.content.startsWith("m@goal") || m.content.startsWith("m@hp")) {
				var c = m.content
				var arg = m.content.split(" ")[1];

				var min = 0
				var max = 0
				if (c.startsWith("m@time")) {
					min = 5
					max = 120
				}
				if (c.startsWith("m@difficulty")) {
					min = 100
					max = 3000
				}
				if (c.startsWith("m@goal")) {
					min = 10
					max = 1000

				}
				if (c.startsWith("m@hp")) {
					min = 4
					max = 100

				}

				if (arg >= min && arg <= max) {
					if (c.startsWith("m@time")) {
						time = arg;
					}
					if (c.startsWith("m@difficulty")) {
						diff = arg;
					}
					if (c.startsWith("m@goal")) {
						goal = arg;
						if (salt) { m.react("❌").then((r) => { m.react("🧂") }) }
					}
					if (c.startsWith("m@hp")) {
						hp = arg;
						if (!salt) { m.react("❌").then((r) => { m.react("🧂") }) }
					}
					m.react("✅")
				}
				else {
					m.react("❌")
				}
			}
		});

		collector.on('end', async (collected, reason) => {
			console.log(reason)
			if (reason == "time") {
				return message.channel.send(new Discord.MessageEmbed().setTitle(`m!${game} cancelled`).setDescription("No one started the game (m@start)").setColor("RED"))
			}
			for (i in lb) {
				lb[i] = parseInt(hp)
			}
			embed = new Discord.MessageEmbed()
				.setTitle(`${salt ? "🧂 " : ""}${finishTitle[game]}${salt ? " 🧂" : ""}`)
				.setDescription(`Who will claim the ${game}?\n\n**Time**: ${time} seconds\n**Difficulty**: ${diff} Minimum Solutions\n${salt ? `**HP**: ${hp}` : `**Goal**: ${goal} pts`}`)
				.setColor("#6f4e37")
			await message.channel.send(embed)


			round(time, diff, goal, lb, 0);
		});



		async function round(time, diff, goal, lb, active) {
			if (active == 8) {
				return message.channel.send(`I guess this ${game} is for me then :D`)
			}


			var letters = createProblem(diff)
			console.log(letters)

			var place = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"]

			if (salt) {
				var players = Object.keys(lb)
				var select = ""
				while (select == "") {
					var tryer = players[Math.floor(Math.random() * players.length)]
					if (lb[tryer] > 0) {
						select = tryer
					}
				}
				player = select
			}
			var reactor = await message.channel.send(`${salt ? `<@${player}> ` : ""}${ask[game](letters)}`)


			var countdown = setTimeout(() => {
				var counter = 0;
				var reactions = ["5️⃣", "4️⃣", "3️⃣", "2️⃣", "1️⃣", emote[game]]
				var stop = setInterval(() => {
					reactor.react(reactions[counter])
					counter++;
					if (counter == 6) {
						clearInterval(stop);
					}
				}, 1000)
			}, time * 1000 - 6000)


			const filter = m => {
				m.content = m.content.toLowerCase()
				return ((check[game](letters, m.content) && words.includes(m.content) && !used.includes(m.content) && (reply.indexOf(m.author.id) == -1)) || m.content == ("m@end") || m.content == "m@lb")
			}


			var reply = []
			var used = []
			var points = [10, 5, 3, 2, 1]
			var reacts = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣"]

			const collector = message.channel.createMessageCollector(filter, { time: time * 1000, max: salt ? undefined : 5 });

			collector.on('collect', async m => {
				console.log("collect")
				if (salt) {
					if (m.content == "m@end") {
						message.channel.send("Ending already? How salty.")
						collector.stop("end")
					}
					else if (m.content == "m@quit") {
						lb[m.author.id] = 0;
						message.channel.send(`${m.author.username} has given up.`)
					}
					else if (m.content == "m@join") {
						if (!(m.author.id in lb)) {
							var counter = Object.values(lb).reduce((a, c) => a + c)
							var average = Math.floor(counter / Object.keys(lb).length);
							if (average <= 2) {
								message.channel.send(`Sorry ${m.author.username}, it's too late to join now.`)
							}
							else {
								lb[m.author.id] = average - 2
								message.channel.send(`${m.author.username} has joined the fray!`);
							}

						}
					}
					else if (m.content == "m@lb") {
						if (Object.keys(lb).length == 0) {
							message.channel.send("No players yet!")
						}
						else {
							collector.options.max += 1
							var print = await leaderboard(lb)
							var print = "Current leaderboard:\n" + print
							message.channel.send(print);
						}

					}

					else {
						if (m.author.id == select) {
							m.react('✅')
							lb[m.author.id] += 2
							clearTimeout(countdown)
							m.channel.send(`${m.author.username} has gained 2 💖`)
							collector.stop("got");
							active = 0
						}
						else {
							active = 0
							let username = await bot.users.fetch(player)
							username = username.username
							m.react('🧂')
							lb[select] -= 4
							salted[m.author.id] = salted[m.author.id] ? salted[m.author.id] += 1 : 1
							clearTimeout(countdown)
							m.channel.send(`${m.author.username} caused ${username} to lose 4 💖. ` + (lb[select] > 0 ? `They now have ${lb[select]} 💖!` : `They got too salty and lost. (They can still take your health away though :eyes:) :salt:`))
							collector.stop("taken");
						}
					}
				}

				//non salt games
				else {


					if (m.content == "m@end") {
						message.channel.send(`Giving up already? I guess I get the ${game} then.`)
						return collector.stop('end')
					}
					else if (m.content == "m@lb") {
						if (Object.keys(lb).length == 0) {
							message.channel.send("No players yet!")
						}
						else {
							collector.options.max += 1
							var print = "Current leaderboard:\n"
							var print = print + (await leaderboard(lb))
							message.channel.send(print);
						}

					}
					else {
						m.content = m.content.toLowerCase();
						if (m.author.id in lb) {
							lb[m.author.id] += points[reply.length];
						}
						else {
							lb[m.author.id] = points[reply.length];
						}
						await m.react(reacts[reply.length]);
						reply.push(m.author.id);
						used.push(m.content)
						active = 0
					}
				}
			});
			collector.on('end', async (collected, reason) => {
				console.log(reason)
				if (reason == "end") {
					return;
				}
				word = ""
				if (reply.length == 0 && reason != "taken" && reason != "got") {
					let solutions = 0
					var shortest = 0
					for (i = 0; i < words.length; i++) {

						if (check[game](letters, words[i])) {
							solutions++
							if (shortest == 0) {
								shortest = words[i].length
							}
							else if (shortest > words[i].length) {
								word = words[i]
								shortest = words[i].length
							}
						}
					}
					message.channel.send(`Looks like no one got this one. One answer was: ${word}, but there were ${solutions} solutions!`)
					round(time, diff, goal, lb, ++active)
					return;
				}
				else {
					if (salt) {
						//check if there's only one player left
						var alive = []

						for (player in lb) {

							if (lb[player] > 0) {
								alive.push(player)
							}
						}
						if (alive.length == 1) {
							var user = await bot.users.fetch(Object.keys(lb).indexOf('356945454979874816') >= 0 ? '356945454979874816' : alive[0]);
							let leader = await leaderboard(lb)
							let salter = Object.keys(salted).reduce((a, b) => salted[a] > salted[b] ? a : b)
							let saltuser = await bot.users.fetch(salter)
							message.channel.send(new Discord.MessageEmbed().setTitle(`${user.username} embraced the salt!`).setColor("GREEN").setDescription("Final Leaderboard:\n\n" + leader + `\n\nTop Salter: ${saltuser.username} - ${salted[salter]} salts`).setThumbnail(user.displayAvatarURL()));

							return

						}
						else {
							var print = "Leaderboard:\n" + await leaderboard(lb)
							message.channel.send(print)
							round(time, diff, goal, lb, active)
						}
					}
					else {
						print = ""
						for (i = 0; i < reply.length; i++) {
							var user = await bot.users.fetch(reply[i])
							print += `\n${reacts[i]} - ${user.username} - ${lb[reply[i]] - points[i]} -> **${lb[reply[i]]}**`
						}
						message.channel.send(print);
						var winners = winnerCheck(lb)

						if (winners.length == 0) {
							round(time, diff, goal, lb, active)
						}
						else if (winners.length == 1) {
							var user = await bot.users.fetch(Object.keys(lb).indexOf('356945454979874816') >= 0 ? '356945454979874816' : winners[0]);
							let leader = await leaderboard(lb)
							message.channel.send(new Discord.MessageEmbed().setTitle(`${user.username} has claimed the ${game}!`).setColor("GREEN").setDescription("Final Leaderboard:\n\n" + leader).setThumbnail(user.displayAvatarURL()));

							return;
						}

						else {
							message.channel.send(`${winners.map(c => `<@${c}>`).join(",")} are tied for first!`)
							round(time, diff, goal, lb, active)
						}
					}
				}

			})
		}
		//returns a problem based on the diff input
		function createProblem(diff) {
			var letters = []
			if (game == "beer") {


				while (true) {
					solutions = 0
					//random letters
					letters = []
					letters[0] = String.fromCharCode(Math.floor(Math.random() * 26) + 97)
					letters[1] = String.fromCharCode(Math.floor(Math.random() * 26) + 97)
					letters[2] = String.fromCharCode(Math.floor(Math.random() * 26) + 97)
					letters[3] = String.fromCharCode(Math.floor(Math.random() * 26) + 97)



					console.log(letters[0] + letters[1] + letters[2] + letters[3])

					words.forEach(w => {
						o = w

						for (i = 0; i < letters.length; i++) {
							w = w.replace(letters[i], "")
						}
						//if not all 4 letters were replaced
						if (w.length + letters.length == o.length) {
							solutions++
						}
					})
					console.log(solutions);
					if (solutions >= diff) {
						return letters;
					}
				}
			}
			else if (game == "coffee") {

				while (true) {
					var solutions = 0;
					//two random letters
					letter1 = String.fromCharCode(Math.floor(Math.random() * 26) + 97)
					letter2 = String.fromCharCode(Math.floor(Math.random() * 26) + 97)
					number1 = Math.floor(Math.random() * 4);
					number2 = Math.floor(Math.random() * 3) + number1 + 1

					words.forEach(w => {
						if (w[number1] == letter1 && w[number2] == letter2) {
							solutions++
						}
					})
					if (solutions >= diff) {
						letters = [number1, number2, letter1, letter2]
						break;
					}
				}
			}
			else if (game == "wine") {
				while (true) {
					//two random letters
					let solutions = 0
					let letter1 = String.fromCharCode(Math.floor(Math.random() * 26) + 97)
					let letter2 = String.fromCharCode(Math.floor(Math.random() * 26) + 97)
					let letter3 = String.fromCharCode(Math.floor(Math.random() * 26) + 97)
					let syllable = [letter1, letter2, letter3]

					words.forEach(w => {
						if (w.includes(syllable.join(""))) {
							solutions++
						}
					})
					if (solutions >= diff) {
						letters = syllable
						break;
					}
				}
			}
			return letters
		}
		async function leaderboard(lb) {
			return new Promise(async (resolve, reject) => {
				if (salt) {
					//convert lb to two arrays
					var ids = []
					var hps = []
					for (player in lb) {
						ids.push(player);
						hps.push(lb[player])
					}

					//sort arrays by hp
					var flag = true
					while (flag) {
						flag = false
						for (i = 0; i < hps.length - 1; i++) {
							if (hps[i] < hps[i + 1]) {
								var temp = hps[i + 1]
								hps[i + 1] = hps[i]
								hps[i] = temp
								var temp = ids[i + 1]
								ids[i + 1] = ids[i]
								ids[i] = temp
								flag = true
							}
						}
					}

					var print = ""
					for (i = 0; i < hps.length; i++) {
						var player = await bot.users.fetch(ids[i]);
						print += `${i + 1}. ${player.username} - ${lb[ids[i]] <= 0 ? "ELIMINATED\n" : `${lb[ids[i]]} 💖\n`}`

					}
					resolve(print)
				}
				else {


					counter = 1
					var sorter = Object.keys(lb)
					sorter = sorter.sort((a, b) => {
						console.log("comparing " + a + " " + b)
						if (a == '356945454979874816') { return -1 }
						else if (b == '356945454979874816') { return 1 }
						else { return lb[b] - lb[a] }
					})
					print = ""
					for (p of sorter) {
						var user = await bot.users.fetch(p);
						print += `\n${counter}. ${user.username} - ${lb[p]}`
						counter++
					}
					resolve(print)
				}
			})

		}
		function winnerCheck(lb) {
			let winners = []
			let top = goal
			for (player in lb) {
				if (lb[player] >= goal) {
					if (lb[player] > top) {
						winners = [player]
						top = lb[player]
					}
					else {
						winners.push(player)
					}
				}
			}

			return winners
		}
		async function updateData(lb) {
			const users = db.collection('users')
			let userdata = await users.get()
			let data = userdata.docs.map(doc => doc.data())
			if (salt) {
				for (i of salted) {
					await users.doc(i).update({s});
				}
				for (i of lb) {
					users.doc(i).set({
						salted: FieldValue.increment(salted[i])
					}, { merge: true })
				}
			}
		}
	}

};	