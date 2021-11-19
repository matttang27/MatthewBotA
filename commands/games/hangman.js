const { prefix, token } = require("../../config.json");
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [-1],
	name: "hangman",
	category: "fun",
	description: "The classic hangman",
	usage: `${prefix}hangman`,
	perms: [],
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
		

		var topic = "random"
		var goal = 100;
		var embed = new Discord.MessageEmbed()
		.setTitle("Setting up the stage...:noose:")
		.setDescription(`Enter any word containing all four letters in any order\nPoints System: \n\n1st - 10pts\n2nd - 5pts\n3rd - 3pts\n4th - 2pts\n5th - 1 pt.\n\n**Current settings:**\n**m@time** : The amount of time in seconds to answer the question(5-120). \n(Current: ${time})\n**m@difficulty** : The amount of possible answers that is required(100-3000)\n(Current: ${diff})\n**m@goal** : the number of points to get (10-1000)\n(Current: ${goal})\n\nEnd the game with **m@end**`)
		.setColor("#6f4e37")

		var reactor = await message.channel.send(embed)

		//countdown from 5
		var countdown = setTimeout(() => {
			var counter = 0;
			var reactions = ["5️⃣","4️⃣","3️⃣","2️⃣","1️⃣","🍺"]
			var stop = setInterval(() => {
				reactor.react(reactions[counter])
				counter++;
				if (counter == 6) {
					clearInterval(stop);
				}
			},1000)
		},4000)


		const filter = m => m.content.startsWith("m@time") || m.content.startsWith("m@difficulty") || m.content.startsWith("m@goal");
		const collector = message.channel.createMessageCollector(filter, { time: 10000 });

		collector.on('collect', m => {
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

			if (arg >= min && arg <= max) {
				if (c.startsWith("m@time")) {
					time = arg;
				}
				if (c.startsWith("m@difficulty")) {
					diff = arg;
				}
				if (c.startsWith("m@goal")) {
					goal = arg;
				}
				m.react("✅")
			}
			else {
				m.react("❌")
			}
		});

		collector.on('end', async collected => {
			embed = new Discord.MessageEmbed()
			.setTitle("🍺 The beer has finished Brewing! 🍺")
			.setDescription(`Who will claim the beer?\n\n**Time**: ${time} seconds\n**Difficulty**: ${diff} Minimum Solutions\n**Goal**: ${goal} pts`)
			.setColor("#6f4e37")
			await message.channel.send(embed)
			
			var lb = {}
			beer(time,diff,goal,lb,0);
		});


		
		async function beer (time,diff,goal,lb,active) {
			if (active == 8) {
				return message.channel.send("I guess this beer is for me then ~~you dumb f*cks~~")
			}
			var solutions = 0;
			while (true) {
				//two random letters
				letters = []
				letters[0] = String.fromCharCode(Math.floor(Math.random() * 26) + 97)
				letters[1] = String.fromCharCode(Math.floor(Math.random() * 26) + 97)
				letters[2] = String.fromCharCode(Math.floor(Math.random() * 26) + 97)
				letters[3] = String.fromCharCode(Math.floor(Math.random() * 26) + 97)
				
				
				
				console.log(letters[0] + letters[1] + letters[2] + letters[3])
				
				words.forEach(w => {
					o = w

					for (i=0;i<letters.length;i++) {
						w = w.replace(letters[i],"")
					}
					//if not all 4 letters were replaced
					if (w.length + letters.length == o.length) {
						solutions++
					}
				})
				console.log(solutions);
				if (solutions >= diff) {
					break;
				}
			}
			var place = ["1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th"]
			//checks if word is viable
			var reactor = await message.channel.send(`Enter a word containing **${letters[0] + letters[1] + letters[2] + letters[3]}**`)
			var countdown = setTimeout(() => {
				var counter = 0;
				var reactions = ["5️⃣","4️⃣","3️⃣","2️⃣","1️⃣","🍺"]
				var stop = setInterval(() => {
					reactor.react(reactions[counter])
					counter++;
					if (counter == 6) {
						clearInterval(stop);
					}
				},1000)
			},time*1000 - 6000)
			const filter = m => {
				m.content = m.content.toLowerCase()
				n = m.content
				for (i=0;i<letters.length;i++) {
					n = n.replace(letters[i],"")
				}
				return (n.length + letters.length == m.content.length && words.includes(m.content) && !used.includes(m.content) && reply.indexOf(m.author.id)) == -1 || m.content == ("m@end") 
			}
			var reply = []
			var used = []
			var points = [10,5,3,2,1]
			var reacts = ["🥇","🥈","🥉","4️⃣","5️⃣"]

			const collector = message.channel.createMessageCollector(filter, { time: time * 1000, max: 5 });
			
			collector.on('collect', async m => {
				if (m.content == "m@end") {
					message.channel.send("Giving up already? I guess I get the beer then.")
					return collector.stop('end')
				}
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
			});
			collector.on('end', async (collected,reason) => {
				if (reason == "end") {
					return;
				}
				word = ""
				if (reply.length == 0) {
					var shortest = 0
					for (i=0;i<words.length;i++) {
						n = words[i]
						for (j=0;j<letters.length;j++) {
							n = n.replace(letters[j],"")
						}
						if (n.length + letters.length == words[i].length) {
							if (shortest == 0) {
								shortest = n.length
							}
							else if (shortest > n.length) {
								word = words[i]
								shortest = n.length
							}
						}
					}
					message.channel.send(`Looks like no one got this one. One answer was: ${word}, but there were ${solutions} solutions!`)
					beer(time,diff,goal,lb,++active)
					return;
				}
				print = ""
				for (i=0;i<reply.length;i++) {
					var user = await bot.users.fetch(reply[i])
					print += `\n${reacts[i]} - ${user.username} - ${lb[reply[i]] - points[i]} -> **${lb[reply[i]]}**`
				}
				message.channel.send(print);
				for (player in lb) {
					if (lb[player] >= goal) {
						var user = await bot.users.fetch(player);
						var print = `${user.username} has won!\n\n**Final Leaderboard**`
						var counter = 1
						for (player in lb) {
							var user = await bot.users.fetch(player);
							print += `\n${counter}. ${user.username} - ${lb[player]}`
							counter++
						}
						message.channel.send(print);

						return;
					}
					else {
						beer(time,diff,goal,lb,active)
						return;
					}
				}
			})
		}
	}
};	