const Discord = require('discord.js')

function minutesToMessage(minutes) {
	var days = Math.floor(minutes / 1440)

	var hours = Math.floor((minutes - (days * 1440)) / 60)

	var minutes = Math.floor(minutes - (days * 1440) - (hours * 60))

	var timer = ""
	if (days == 1) {
		timer += `1 day, `
	}
	else if (days > 1) {
		timer += `${days} days, `
	}
	if (hours == 1) {
		timer += `1 hour `
	}
	else {
		timer += `${hours} hours `
	}
	if (minutes == 1) {
		timer += `and 1 minute`
	}
	else {
		timer += `and ${minutes} minutes`
	}
	return timer
}


function findMember(message, args) {
	if (args.length >= 1 && message.channel.type == "dm") {
		message.reply("You can only search for others inside a guild!")
		return false
	}

	if (message.mentions.members.first()) {
		return message.mentions.members.first().id;
	}
	else if (args[0].length == 18 && !isNaN(args[0])) {
		return args[0]
	}
	else {
		var finder = args.join(" ").toLowerCase()

		var users = []
		message.guild.members.cache.each(member => {

			if (member.user.username.toLowerCase().includes(finder)) {
				users.push(member.user)
			}
			else if (member.nickname) {
				if (member.nickname.toLowerCase().includes(finder)) {
					users.push(member.user)
				}
			}
		})
		if (users.length == 0) {
			message.reply("I can't find anyone with that username")
			return false
		}
		else if (users.length == 1) {
			var user = users[0]
			return user.id
		}
		else {
			var send = []
			const filter = m => m.author.id == message.author.id && Math.floor(m.content) >= 0 && Math.floor(m.content) < users.length

			const collector = message.channel.createMessageCollector(filter, { max: 1, time: 15000 });
			for (i = 0; i < users.length; i++) {
				send.push(`${i} - ${users[i].username}`)
			}
			message.reply(`There are too many possibilities :dizzy_face: here's who you can choose! \n` + send.join("\n"))
			collector.on('collect', async m => {

				return users[parseInt(m)].id



			});

			collector.on('end', collected => {
				if (!collector.endReason()) {
					message.channel.send("Cancelled command.")
					return false
				}

			})
		}
	}
};

function cleanup(str) {
	//I don't even know man
	return str.replace(/[^0-9a-z-A-Z ]/g, "").replace(/ +/, " ")
}

function gameClear() {
	var g = JSON.parse(fs.readFileSync('../games.json').toString());
	var games = g.games.filter(myFunction);

	function myFunction(game) {
		var diff = Date.now() - game.challengetime
		return Math.floor(diff / 60000) < 5
	}
	g.games = games
	let data = JSON.stringify(g, null, 2);
	fs.writeFileSync('../games.json', data);
}

function changeStatus(bot) {
	setTimeout(function() {
		bot.user.setPresence({ activity: { name: 'Everyone must die.' }, status: 'dnd' })
			.then()
			.catch(console.error);
		var message2 = setTimeout(function() {
			bot.user.setPresence({ activity: { name: 'No one is safe.' }, status: 'idle' })
				.then()
				.catch(console.error);
			var message3 = setTimeout(function() {
				bot.user.setPresence({ activity: { name: 'I have ascended.' }, status: 'online' })
					.then()
					.catch(console.error);
				changeStatus(bot)
			}, 10000)
		}, 10000)

	}, 10000)
}

function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}


const inputs = [
	["BIGE"],

	["pog", "poggers", "pogchamp"],

	["mbot", "m-bot", "matthewbot", "matthew bot"],

	["weirdchamp"],

	["fuckingbullshit", "fckingbullshit", "fucking bullshit", "fcking bullshit"],

	["install league", "uninstall league"],

	["enormous penis"]
]
const outputs = [
	["EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE\nEE         EE         EE         EE         EE         EE         EE         EE         EE\nEEEE    EEEE     EEEE    EEEE     EEEE    EEEE     EEEE     EEEE    EEEE\nEE         EE         EE         EE         EE         EE         EE         EE         EE\nEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE\nEEEEEEEEEEEEEEEEEE\nEE         EE         EE\nEEEE    EEEE     EEEE\nEE         EE         EE\nEEEEEEEEEEEEEEEEEE\nEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE\nEE         EE         EE         EE         EE         EE\nEEEE    EEEE     EEEE    EEEE    EEEE     EEEE\nEE         EE         EE         EE         EE         EE\nEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE\nEEEEEEEEEEEEEEEEEE\nEE         EE         EE\nEEEE    EEEE     EEEE\nEE         EE         EE\nEEEEEEEEEEEEEEEEEE\nEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE\nEE         EE         EE         EE         EE         EE         EE         EE         EE\nEEEE    EEEE     EEEE    EEEE     EEEE    EEEE     EEEE     EEEE    EEEE\nEE         EE         EE         EE         EE         EE         EE         EE         EE\nEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE"],

	["That's pretty pog <a:pog:758146624400392212>"],

	["It is I, in the flesh."],


	["True, that is kinda weirdchamp.", "https://tenor.com/view/weirdchamping-weirdchamp-twitch-meme-ryan-gutierrez-gif-17202815"],

	["https://www.youtube.com/watch?v=OFjqEexH0Tg"],

	["https://signup.na.leagueoflegends.com/en/signup/redownload?page_referrer=index"],

	["https://www.youtube.com/watch?v=EWMPVn1kgIQ"]

]


function importAll(sourceScope, targetScope) {
	for (let name in sourceScope) {
		targetScope[name] = sourceScope[name];
	}
}

function randomOdd(odds) {
	var randomInt = Math.floor(Math.random() * 100) + 1
	if (odds > randomInt) {
		return true
	}
	else {
		return false
	}
}

function sendProfile(embed, user, userData) {
	if (!userData.rpswon / userData.rpsplayed) {
		var winrate = 0
	}
	else {
		var winrate = Math.round((userData.rpswon / userData.rpsplayed) * 100)
	}
	if (isNaN(userData.married != "Single")) {
		var married = "<@" + userData.married + ">"
	}
	else {
		var married = userData.married
	}
	embed.setColor('#0099ff')
		.setTitle(`Profile of ${user.username}`)

		.addFields(
			{ name: 'Balance', value: `$${userData.money}` },
			{ name: 'RPS W-L', value: `${userData.rpswon}-${userData.rpsplayed - userData.rpswon}`, inline: true },
			{ name: 'RPS Winrate', value: `${winrate}%`, inline: true },
			{ name: 'RPS Streak', value: userData.rpsstreak, inline: true },
			{ name: 'Married to:', value: `${married}` },
			{ name: 'Lovers', value: `${Object.keys(userData.lovers).length}`, inline: true },
			{ name: 'Rejections', value: `${Object.keys(userData.rejections).length}`, inline: true },
			{ name: 'Rejected', value: `${Object.keys(userData.rejected).length}`, inline: true },
			{ name: 'Age', value: `${(Math.floor((Date.now() - userData.timeCreated.toDate()) / 86400000))} days` },
		)
		.setTimestamp()
		.setFooter(`Matthew Bot Profile`);
	if (user.displayAvatarURL()) {
		embed.setThumbnail(`${user.displayAvatarURL()}`)
	}
	return embed
}


function httpsGet(link, https) {
	return new Promise((resolve, reject) => {
		var req = https.request(link, function(res) {
			if (res.statusCode < 200 || res.statusCode >= 300) {
				return reject(new Error('statusCode=' + res.statusCode));
			}
			var body = [];
			res.on('data', function(chunk) {
				body.push(chunk);
			});
			// resolve on end
			res.on('end', function() {
				try {
					body = JSON.parse(Buffer.concat(body).toString());
				} catch (e) {
					reject(e);
				}
				resolve(body);
			});
		});
		// reject on request error
		req.on('error', function(err) {
			// This is not a "Second reject", just a different sort of failure
			reject(err);
		});
		req.end();
	})
}

function httpRequest(params, postData) {
	return new Promise(function(resolve, reject) {
		var req = http.request(params, function(res) {
			// reject on bad status
			if (res.statusCode < 200 || res.statusCode >= 300) {
				return reject(new Error('statusCode=' + res.statusCode));
			}
			// cumulate data
			var body = [];
			res.on('data', function(chunk) {
				body.push(chunk);
			});
			// resolve on end
			res.on('end', function() {
				try {
					body = JSON.parse(Buffer.concat(body).toString());
				} catch (e) {
					reject(e);
				}
				resolve(body);
			});
		});
		// reject on request error
		req.on('error', function(err) {
			// This is not a "Second reject", just a different sort of failure
			reject(err);
		});
		if (postData) {
			req.write(postData);
		}
		// IMPORTANT
		req.end();
	});
}

function newProfile(firestore) {return {
	money: 0,
	rps: {
		points: 0,
		won: 0,
		games: 0,
		streak: 0,
		
	},
	beer: {
		points: 0,
		won: 0,
		games: 0,
		streak: 0
	},
	coffee: {
		points: 0,
		won: 0,
		games: 0,
		streak: 0
	},
	wine: {
		points: 0,
		won: 0,
		games: 0,
		streak: 0,
	},
	salt: {
		salted: 0,
		won: 0,
		games: 0,
		streak: 0,
	},
	timeCreated: firestore.Timestamp.fromDate(new Date()),
}}

function embedError(err) {
  let embed = new Discord.MessageEmbed().setTitle("Something went wrong...").setDescription(`Matthew bot broke :<\n\nPlease notify Matthew and send him this error: ${err}`).setColor("RED")
  console.log(err)
  return embed
}

module.exports = { minutesToMessage, findMember, cleanup, gameClear, changeStatus, sleep, inputs, outputs, randomOdd, importAll, sendProfile, httpsGet, httpRequest, newProfile, embedError }