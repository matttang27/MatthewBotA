const { prefix, token } = require("../../config.json");
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [0],
	name: "salt",
	category: "fun",
	description: "There's too much happiness. This is a game of betrayal and deceit, a bringer of agony and malice. This is SALT.",
	usage: `${prefix}salt`,
	perms: 4,
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
		var words = require("an-array-of-english-words")

		var time = 15;
		var diff = 50;
		var hp = 16;
		var embed = new Discord.MessageEmbed()
		.setTitle("🧂 The salt shaker is being prepared. Salting in 20 seconds. 🧂")
		.setDescription(`*There's too much happiness. This is a game of betrayal and deceit, a bringer of agony and malice. This is SALT.*\n\nOne by one, players have to give a word that has the syllable in it. Entering in a correct word gives you 2 health. However, if someone else is able to steal before you, you lose 4 health.\n\n**Current settings:**\n**m@time** : The amount of time in seconds to answer the question(5-30). \n(Current: 15)\n**m@difficulty** : The amount of possible answers that is required(1-250)\n(Current: 50)\n**m@hp** : the number of health points you start with. (8-100)\n(Current: 16)\n\nAt least **3** players are needed. Join the game with **m@join**. You can join the game at any time, but will have the average health of all players - 2HP. If there are at least 3 players, you can start the game with **m@start**\n\nEnd the game with **m@end**`)
		.setColor("#6f4e37")

		var reactor = await message.channel.send(embed)
		var lb = {}
		//countdown from 5
		var countdown = setTimeout(() => {
			var counter = 0;
			var reactions = ["5️⃣","4️⃣","3️⃣","2️⃣","1️⃣","🧂"]
			var stop = setInterval(() => {
				reactor.react(reactions[counter])
				counter++;
				if (counter == 6) {
					clearInterval(stop);
				}
			},1000)
		},14000)


		const filter = m => m.content.startsWith("m@time") || m.content.startsWith("m@difficulty") || m.content.startsWith("m@hp") || m.content == "m@join" || m.content == "m@start";
		const collector = message.channel.createMessageCollector(filter, { time: 20000 });

		collector.on('collect', m => {
			
			var c = m.content
			if (m.content == "m@join") {
				lb[m.author.id] = hp
				m.react('✅')
			}
			else if (m.content == "m@start") {
				if (Object.keys(lb).length >= 3) {
						m.react('✅')
						clearTimeout(countdown)
						collector.stop("start");
					}
				else {
					message.channel.send(`There are only ${Object.keys(lb).length} players currently. Please get more people to join before starting.`)
				}
			}
			else {
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
				if (c.startsWith("m@hp")) {
					min = 8
					max = 100
				}

				if (arg >= min && arg <= max) {
					if (c.startsWith("m@time")) {
						time = arg;
					}
					if (c.startsWith("m@difficulty")) {
						diff = arg;
					}
					if (c.startsWith("m@hp")) {
						hp = arg;
					}
					m.react("✅")
				}
				else {
					m.react("❌")
				}
			}
		});

		collector.on('end', async (collected,reason) => {
			if (reason == "time") {
				return message.channel.send("The salt expired.")
			}
			else {
				message.channel.send("**The salt game is now starting!**")
				salt(time,diff,hp,lb,0);
			}
			
		});


		
		async function salt (time,diff,hp,lb,active) {
			//check if there's only one player left
			var alive = []
			for (player in lb) {
				if (lb[player] > 0) {
					alive.push(player)
				}
			}
			if (alive == 1) {
				return message.channel.send(`<@${alive[0]}> has won!`)
			}
			if (active == 8) {
				return message.channel.send("Y'all are salty bastards ~~you dumb f*cks~~")
			}
			var letter1, letter2, letter3
			var solutions = 0;
			var syllable = ""
			while (true) {
				//two random letters
				letter1 = String.fromCharCode(Math.floor(Math.random() * 26) + 97)
				letter2 = String.fromCharCode(Math.floor(Math.random() * 26) + 97)
				letter3 = String.fromCharCode(Math.floor(Math.random() * 26) + 97)
				syllable = letter1 + letter2 + letter3
				place = ["1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th"]
				
				words.forEach(w => {
					if (w.includes(syllable)) {
						solutions++
					}
				})
				if (solutions >= diff) {
					break;
				}
			}
			//get random player
			var players = Object.keys(lb)
			var select = players[Math.floor(Math.random() * players.length)]
			var player = await bot.users.fetch(select).catch((e) => { console.error(e); });
			var reactor = await message.channel.send(` <@${select}> Enter a word containing **${syllable}**.`).catch((e) => { console.error(e); });
			var countdown = setTimeout(() => {
				var counter = 0;
				var reactions = ["5️⃣","4️⃣","3️⃣","2️⃣","1️⃣","🧂"]
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
				return (m.content.includes(syllable) && words.includes(m.content)) || m.content == "m@quit" || m.content == "m@join" || m.content == "m@end"
			}
			

			const collector = message.channel.createMessageCollector(filter, { time: time * 1000});
			
			collector.on('collect', async m => {
				m.content = m.content.toLowerCase();
				if (m.content == "m@end") {
					return message.channel.send("Ending already? How salty")
				}
				else if (m.content == "m@quit") {
					lb[m.author.id] = 0;
					message.channel.send(`${m.author.username} has given up.`)
				}
				else if (m.content == "m@join") {
					if (!(m.author.id in lb)) {
						var counter = Object.keys(lb).reduce((a,c) => a+c)
						var average = Math.floor(counter/Object.keys(lb).length);
						if (average <= 2) {
							message.channel.send(`Sorry ${m.author.username}, it's too late to join now.`)
						}
						else {
							lb[m.author.id] = average - 2
							message.channel.send(`${m.author.username} has joined the fray!`);
						}
						
					}
				}
				else {
					if (m.author.id == select) {
						m.react('✅')
						lb[m.author.id] += 2
						clearTimeout(countdown)
						m.channel.send(`${m.author.username} has gained 2 💖`)
						collector.stop("got");
					}
					else {
						m.react('🧂')
						lb[select] -= 4
						clearTimeout(countdown)
						m.channel.send(`${m.author.username} caused ${player.username} to lose 4💖!` + (lb[select] <= 0 ? `They now have ${lb[select]} 💖!` : `They got too salty and lost! (They can still take your health away though)`))
						collector.stop("taken");
					}
				}
				active = 0
			});
			collector.on('end', async (collected,reason) => {
				word = ""
				if (reason == "time") {
					for (i=0;i<words.length;i++) {
						if (words[i].includes(syllable)) {
							word = words[i]
							break;
						}
					}
					message.channel.send(`Looks like no one got this one. One answer was: ${word}, but there were ${solutions} solutions!`)
					salt(time,diff,hp,lb,++active)
					return;
				}
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
					for (i=0;i<hps.length-1;i++) {
						if (hps[i] < hps[i+1]) {
							var temp = hps[i+1]
							hps[i+1] = hps[i]
							hps[i] = temp
							var temp = ids[i+1]
							ids[i+1] = ids[i]
							ids[i] = temp
							flag = true
						}
					}
				}
				
				var print = ""
				for (i=0;i<hps.length;i++) {
					var player = await bot.users.fetch(ids[i]);
					print += `${i+1}. ${player.username} - ${lb[ids[i]] <= 0 ? "ELIMINATED" : lb[ids[i]]}\n`
					
				}
				message.channel.send("Leaderboard\n" + print)
				salt(time,diff,hp,lb,active)
			})
		}
	}
};	