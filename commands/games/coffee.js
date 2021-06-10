const { prefix, token } = require("../../config.json");
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [-1],
	name: "coffee",
	category: "fun",
	description: "Coffee Game! Enter a word containing the two letters at the correct spaces",
	usage: `${prefix}coffee {opt. settings}`,
	perms: 4,
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
		var words = require("an-array-of-english-words")

		var time = 15;
		var diff = 50;
		var goal = 100;
		var embed = new Discord.MessageEmbed()
		.setTitle("☕ A new Coffee is being brewed! Starting in 10 seconds. ☕")
		.setDescription(`Enter a word containing the two letters at the correct spaces.\nPoints System: \n\n1st - 10pts\n2nd - 5pts\n3rd - 3pts\n4th - 2pts\n5th - 1 pt.\n\nThe points are multiplied by the difficulty, which is the number of spaces between the two letters. e.g a word that needs e at 1st and 3rd gets 2x more points as problem that needs er beside each other.\n\n**Current settings:**\n**m@time** : The amount of time in seconds to answer the question(5-30). \n(Current: 15)\n**m@difficulty** : The amount of possible answers that is required(1-250)\n(Current: 50)\n**m@goal** : the number of points to get (10-1000)\n(Current: 100)\n\nEnd the game with **m@end**`)
		.setColor("#6f4e37")

		var reactor = await message.channel.send(embed)

		//countdown from 5
		var countdown = setTimeout(() => {
			var counter = 0;
			var reactions = ["5️⃣","4️⃣","3️⃣","2️⃣","1️⃣","☕"]
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
				max = 30
			}
			if (c.startsWith("m@difficulty")) {
				min = 1
				max = 250
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
			.setTitle("☕ The Coffee has finished Brewing! ☕")
			.setDescription(`Who will claim the coffee?\n\n**Time**: ${time} seconds\n**Difficulty**: ${diff} Minimum Solutions\n**Goal**: ${goal} pts`)
			.setColor("#6f4e37")
			await message.channel.send(embed)
			
			var lb = {}
			coffee(time,diff,goal,lb,0);
		});


		
		async function coffee (time,diff,goal,lb,active) {
			if (active == 8) {
				return message.channel.send("I guess this coffee is for me then ~~you dumb f*cks~~")
			}
			var letter1, letter2, number1, number2;
			var solutions = 0;
			while (true) {
				//two random letters
				letter1 = String.fromCharCode(Math.floor(Math.random() * 26) + 97)
				letter2 = String.fromCharCode(Math.floor(Math.random() * 26) + 97)
				number1 = Math.floor(Math.random()*4);
				number2 = Math.floor(Math.random()*3) + number1 + 1
				
				place = ["1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th"]
				
				words.forEach(w => {
					if (w[number1] == letter1 && w[number2] == letter2) {
						solutions++
					}
				})
				if (solutions >= diff) {
					break;
				}
			}
			//checks if word is viable
			var reactor = await message.channel.send(`Enter a word with the **${place[number1]}** letter being **${letter1}** and the **${place[number2]}** letter being **${letter2}**`)
			var countdown = setTimeout(() => {
				var counter = 0;
				var reactions = ["5️⃣","4️⃣","3️⃣","2️⃣","1️⃣","☕"]
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
				return (m.content.charAt(number1) == letter1 && m.content.charAt(number2) == letter2 && reply.indexOf(m.author.id) == -1 && !used.includes(m.content)) || m.content == ("m@end")
			}
			var reply = []
			var used = []
			var points = [10,5,3,2,1]
			var reacts = ["🥇","🥈","🥉","4️⃣","5️⃣"]

			const collector = message.channel.createMessageCollector(filter, { time: time * 1000, max: 5 });
			
			collector.on('collect', async m => {
				if (m.content == "m@end") {
					
					message.channel.send("Giving up already? The Coffee's still hot.")
					return collector.stop('end');
				}
				m.content = m.content.toLowerCase();
				if (m.author.id in lb) {
					lb[m.author.id] += points[reply.length] * (number2 - number1);
				}
				else {
					lb[m.author.id] = points[reply.length] * (number2 - number1);
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
					for (i=0;i<words.length;i++) {
						if (words[i].charAt(number1) == letter1 && words[i].charAt(number2) == letter2) {
							word = words[i]
							break;
						}
					}
					message.channel.send(`Looks like no one got this one. One answer was: ${word}, but there were ${solutions} solutions!`)
					coffee(time,diff,goal,lb,++active)
					return;
				}
				print = ""
				for (i=0;i<reply.length;i++) {
					var user = await bot.users.fetch(reply[i])
					print += `\n${reacts[i]} - ${user.username} - ${lb[reply[i]] - points[i] * (number2 - number1)} -> **${lb[reply[i]]}**`
					if (number2 - number1 > 1) {
						print += ` **x${number2 - number1}**`
					}
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
						}
						message.channel.send(print);

						return;
					}
					else {
						coffee(time,diff,goal,lb,active)
						return;
					}
				}
			})
		}
	}
};	