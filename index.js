var time = Date.now()

function timePast() {
	return (Date.now() - time) / 1000 + "s"
}
console.log("Starting code... " + timePast())
const fs = require('fs');
console.log("imported fs " + timePast())
const Discord = require("discord.js");
console.log("imported discord " + timePast())
const https = require('https')
console.log("imported https" + timePast())
var bot = new Discord.Client();
console.log("created bot instance " + timePast())
const disbut = require('discord-buttons')(bot);
console.log("imported discord-buttons" + timePast())
const compress_images = require("compress-images");
console.log("imported compress_images" + timePast())
const {
	prefix,
	ownerID,
	rpgprefix
} = require("./config.json");
bot.commands = new Discord.Collection();
bot.rpgcommands = new Discord.Collection();

const token = process.env['token']
const othertoken = process.env['othertoken']
if (token == "") {
	console.log("You're missing a token!")
}

var func = require("./functions.js")
func.importAll(func, global)
console.log("imported functions " + timePast())
var startTime = new Date().toISOString().substring(2)

function filelog(str) {

}

function fulllog(str) {
	console.log(str)
	filelog(str)
}
const Role = require('./role.js')

bot.games = {}


var praise = ["nice", "good", "amazing", "godly", "legend","legendary"]

const commandFiles = fs.readdirSync('./commands')

const commandFolders = commandFiles.filter(file => !file.endsWith('.js'))

const commands = {}
var folderFind = {}
for (folder of commandFolders) {
	commands[folder] = fs.readdirSync('./commands/' + folder)
	for (file of commands[folder]) {
		const command = require(`./commands/${folder}/${file}`)
		bot.commands.set(command.name, command)
		folderFind[command.name] = folder
		console.log(`set ${command.name} command ` + timePast())
		
	}


}

bot.commandlist = commands


console.log("set bot commands " + timePast())
//import rpgcommands
const rpgcommandFiles = fs.readdirSync('./rpg/rpgcommands').filter(file => file.endsWith('.js'));

for (const file of rpgcommandFiles) {
	const command = require(`./rpg/rpgcommands/${file}`);

	// set a new item in the Collection
	// with name : command module
	bot.rpgcommands.set(command.name, command);
	console.log(`set ${command.name} command ` + timePast())
}
console.log("set rpg commands " + timePast())
//import Firebase stuff

const admin = require('firebase-admin');

let serviceAccount = require('./servicekey.json');

let rpgserviceAccount = require('./rpg/rpgservicekey.json');
rpgserviceAccount.private_key = process.env['rpgkey'].replace(/\\n/g, '\n')
serviceAccount.private_key = process.env['firebasekey'].replace(/\\n/g, '\n')

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

var rpgadmin = admin.initializeApp({
	credential: admin.credential.cert(rpgserviceAccount)
}, "rpg");
console.log("initialized firebase " + timePast())

//discord


bot.on("ready", () => {
	fulllog("Bot Ready at " + new Date().toString());
	changeStatus(bot)
	fulllog("Changing status at " + new Date().toString());
	syncEmotes()
	console.log("synced Emotes " + timePast())
});

bot.on("messageDelete", async message => {
	if (message.channel.id == "834141508264525845") {
		var channel = await bot.channels.fetch("838496897861025812")
		channel.send(message.content)
		message.embeds.forEach(e => channel.send(e))
		channel.send(`From: <@${message.author.id}>`)
	}
	if (message.guild.id == "712382129673338991") {
		var channel = await bot.channels.fetch("842750073896173628")
		if (message.content) {
			var embed = new Discord.MessageEmbed()
				.setTitle("Message Deleted")
				.setDescription(message.content)
				.addField("Channel:", message.channel.name)
				.setAuthor(message.author.username, message.author.avatarURL())
				.setTimestamp()
			channel.send(embed)
		} else {
			message.embeds.forEach(e => channel.send(e))
			channel.send(`From: <@${message.author.id}> in ${message.channel.name} at ${Date.now().toString()}`)
		}



	}
})
bot.on("messageUpdate", async (oldMessage, newMessage) => {
	if (oldMessage.guild.id == "712382129673338991") {
		if (oldMessage.author.id == "720466960118186015") {
			return
		}
		var channel = await bot.channels.fetch("842750073896173628")
		if (oldMessage.content) {
			var embed = new Discord.MessageEmbed()
				.setTitle("Message Edited")
				.addField("Old Message: ", oldMessage.content)
				.addField("New Message: ", newMessage.content)
				.addField("Channel:", oldMessage.channel.name)
				.setAuthor(oldMessage.author.username, oldMessage.author.avatarURL())
				.setTimestamp()
			channel.send(embed)
		} else {
			oldMessage.embeds.forEach(e => channel.send(e))
			channel.send(`From: <@${message.author.id}> in ${message.channel.name} at ${Date.now().toString()}`)
			channel.send("New message:")
			newMessage.embeds.forEach(e => channel.send(e))
			channel.send(`From: <@${message.author.id}> in ${message.channel.name} at ${Date.now().toString()}`)
		}



	}
})
bot.on("message", async message => {
	try {
		//no bot replies

		if (message.author.bot && message.author.id != bot.user.id) {
			return
		};

		if (message.channel.type == "dm") {
			if (message.author.id == bot.user.id && !message.content.startsWith(prefix)) {
				return;
			}
			var matthew = await bot.guilds.fetch("720351714791915520")
			var channel = await matthew.channels.cache.find(c => c.name == message.author.id)

			if (!channel) {
				var channel = await matthew.channels.create(message.author.id)
				var category = await matthew.channels.cache.find(c => c.name == "DM" && c.type == "category")
				channel.setParent(category.id)

				var alias = []
				var guilds = []
				var guildlist = bot.guilds.cache.array()
				for (i = 0; i < guildlist.length; i++) {
					var g = guildlist[i]
					try {
						var m = await g.members.fetch(message.author.id)
						alias.push(m.nickname)
						guilds.push(g.name)
					} catch {}
				}

				var embed = new Discord.MessageEmbed()
					.setColor("#00FF00")
					.setTitle(message.author.username)
					.setDescription(message.author.tag)
					.addField("a.k.a", alias.join(",").length > 0 ? alias.join(",") : "None.")
					.addField("In Guilds: ", guilds.join(",").length > 0 ? guilds.join(",") : "None.")
					.setImage(message.author.displayAvatarURL)
				var sended = await channel.send(embed)
				sended.pin()
			}

			try {
				channel.send(message.content)
			} catch (err) {
				fulllog(err + message.content)
			}
		}

		// EDWARD STALKING:
		if (message.author.id == "351132323405889537") {
			var e = JSON.parse(fs.readFileSync('edward.json').toString());
			e.totalM = e.totalM + 1
			var d = new Date()
			d.setTime(d.getTime() - 240 * 60 * 1000);
			h = e["history"]
			if (h[d.getFullYear()] == undefined) {
				h[d.getFullYear()] = {}
			}
			if (h[d.getFullYear()][d.getMonth()] == undefined) {
				h[d.getFullYear()][d.getMonth()] = {}
			}
			if (h[d.getFullYear()][d.getMonth()][d.getDate()] == undefined) {
				h[d.getFullYear()][d.getMonth()][d.getDate()] = {}
			}
			if (h[d.getFullYear()][d.getMonth()][d.getDate()][d.getHours()] == undefined) {
				h[d.getFullYear()][d.getMonth()][d.getDate()][d.getHours()] = {}
			}
			if (h[d.getFullYear()][d.getMonth()][d.getDate()][d.getHours()][d.getMinutes()] == undefined) {
				h[d.getFullYear()][d.getMonth()][d.getDate()][d.getHours()][d.getMinutes()] = []
			}
			h[d.getFullYear()][d.getMonth()][d.getDate()][d.getHours()][d.getMinutes()].unshift({
				epoch: d.getTime() + 240 * 60 * 1000,
				type: "m",
				guild: message.guild.name,
				channel: message.channel.name
			})
			e["history"] = h
			let list = JSON.stringify(e, null, 2);
			fs.writeFileSync('edward.json', list);
		}




		var type = "";


		//checks if message starts with the prefix for commands, and if the message was sent by a bot

		//ping response
		var temp = message.content.toLowerCase()
		var pingers = ["Ping me again b*tch I dare you", "I guess you wanna die today huh?", "I've got things to do.", "Sigh...you got a death wish?", "Bruh what do you want", "Sup.", "Please just stfu man", "Stop pinging me", "I'm blocking you.", "Just let me sleep", "Someone kill me", "I'm here wassup", "._.", ".-.", "-_-", "-___-"]
		if (message.mentions.has(bot.user)) {
			message.channel.send(pingers[Math.floor(Math.random() * pingers.length)])
		}
		
		if (message.channel.type == "text") {

			if (message.author.id == bot.user.id) {
				return;
			}
			
			//Human trafficking cult stuff
			if (message.guild.id == "757770623450611784") {
				if (message.channel.id == "769979741506764844") {
					if (!message.member.roles.cache.has("819421409934573568")) {
						var dirty = message.guild.roles.cache.find(r => r.name == "Horny Gang");
						await message.member.roles.add(dirty)
					}

				}
				//emoji add in #emoji-voting
				if (message.channel.id == "837743995828174878") {
					
					if (message.attachments.first()) {
						if (!message.content) {
							var sended = await message.channel.send(new Discord.MessageEmbed().setTitle("Emoji Adding").setDescription("Enter a name for you emoji:").setColor("#00FFFF"))
							const collector = message.channel.createMessageCollector((m => m.author.id == message.author.id), {time:30000, max:1})
							collector.on('end', (collected,reason) => {
								if (reason == "time") {
									sended.edit(new Discord.MessageEmbed().setTitle("Emoji Adding Timed out.").setDescription("Slowpoke :[").setColor("#FF0000"))
								}
								else {
									message.guild.emojis.create(message.attachments.first().attachment, collected.first().content).catch((err) => {
										message.channel.send(new Discord.MessageEmbed().setTitle("Failed to add Emoji").setDescription("Might be because the image size is over 256kb. If it's not, give up on your dreams and die.").setColor("#FF0000"))
									})
								}
							});
						}
						else {
							message.guild.emojis.create(message.attachments.first().attachment, message.content).catch((err) => {
							message.channel.send(new Discord.MessageEmbed().setTitle("Failed to add Emoji").setDescription("Might be because the image size is over 256kb. If it's not, give up on your dreams and die.").setColor("#FF0000"))
							})
						}
						
					}
					else if (message.content.match(/tenor/g) || message.content.match(/imgur/g)) {
						let file = message.content
						message.channel.send("Enter a name for this emoji:")
						message.channel.awaitMessages(m => m.author.id == message.author.id,{max:1, time:30000}).then((collected,reason) => {
							if (collected.first()) {
								message.guild.emojis.create(file,collected.first().content).catch((err) => {
							message.channel.send("File cannot be larger than 256.0 kb.")})
							}
							else {
								return message.channel.send("Command timed out.")
							}
						})
						
					}
				}
				//emoji counting
				var emojis = message.content.match(/<:.+?:\d+>/g)
				if (emojis) {
					var emojis = emojis.map(e => e.match(/\d+/g)[0])
					emojis = emojis.filter((v, i) => emojis.indexOf(v) == i)

					for (var i = 0; i < emojis.length; i++) {
						var r = JSON.parse(fs.readFileSync('reactions.json').toString());


						var e = message.guild.emojis.cache.get(emojis[i])
						if (!e) {
							return;
						}
						var u = message.author

						if (e.id in r.reactions) {
							r.reactions[e.id].count++
						} else {
							r.reactions[e.id] = {}
							r.reactions[e.id]["name"] = e.name
							r.reactions[e.id]["count"] = 1
							r.reactions[e.id]["users"] = {}
						}
						if (u.id in r.reactions[e.id].users) {
							r.reactions[e.id].users[u.id]++
						} else {
							r.reactions[e.id].users[u.id] = 1
						}

						if (u.id in r.users) {
							r.users[u.id].count++
						} else {
							r.users[u.id] = {}
							r.users[u.id]["name"] = u.username
							r.users[u.id]["count"] = 1
							r.users[u.id]["reactions"] = {}
						}
						if (e.id in r.users[u.id].reactions) {
							r.users[u.id].reactions[e.id]++
						} else {
							r.users[u.id].reactions[e.id] = 1
						}

						let list = JSON.stringify(r, null, 2);
						fs.writeFileSync('reactions.json', list);
					}
				}

				//only rolling in human trafficking channels
				if (message.channel.id != "834128407536861284" && message.channel.id != "834132436136230942") {
					var c = message.content
					if (c == "$wa" || c == "$wg" || c == "$ha" || c == "$hg" || c == "$ma" || c == "$mg") {
						message.delete()
						message.channel.send("Rolling waifus are only allowed in the <#757977875059179602> channel!")
						message.member.roles.add(message.guild.roles.cache.find(r => r.name == "Muted"));
						return setTimeout(function() {
							message.member.roles.remove(message.guild.roles.cache.find(r => r.name == "Muted"))
						}, 10000)

					}
				};
				var clean = message.content.replace(/\W/g, '').toLowerCase();
				if (clean == "imadegeneratetoo") {
					var act = message.guild.roles.cache.find(r => r.name == "Human Rights Activist");
					if (message.member.roles.cache.has("776509222145228870")) {
						message.channel.send(`${message.author.username} is now a degenerate!`);
						return message.member.roles.remove(act);
					} else {
						message.channel.send(`${message.author.username} is a degenerate.`)
					}
				}
				if (clean == "yallarefuckingdegenerates") {
					var act = message.guild.roles.cache.find(r => r.name == "Human Rights Activist");
					if (message.member.roles.cache.has("776509222145228870")) {
						message.channel.send(`We know`);
						return message.member.roles.remove(act);
					} else {
						message.channel.send(`${message.author.username} is now a <@&776509222145228870>!`, {
							"allowedMentions": {
								"users": []
							}
						})
						return message.member.roles.add(act);
					}
				}
				if (clean == "procrastinationtime") {
					var act = message.guild.roles.cache.find(r => r.name == "Responsible Person");
					if (message.member.roles.cache.has("770826236158410762")) {
						message.channel.send(`${message.author.username} is now a Procrastinator!`);
						return message.member.roles.remove(act);
					} else {
						message.channel.send(`${message.author.username} is in Quadrant 1: Procrastinator.`)
					}
				}
				if (clean == "imaresponsibleboi") {
					var act = message.guild.roles.cache.find(r => r.name == "Responsible Person");
					if (message.member.roles.cache.has("770826236158410762")) {
						message.channel.send(`${message.author.username} is in Quadrant 2: Something idk i wasn't listening`);
						return message.member.roles.remove(act);
					} else {
						message.channel.send(`${message.author.username} is now a <@&770826236158410762>!`, {
							"allowedMentions": {
								"users": []
							}
						})
						return message.member.roles.add(act);
					}
				}
				if (clean == "imapervert") {
					var act = message.guild.roles.cache.find(r => r.name == "Innocent");
					var dirty = message.guild.roles.cache.find(r => r.name == "Horny Gang");
					if (message.member.roles.cache.has("784135793987682384")) {
						message.channel.send(`${message.author.username} couldn't fight the *urge*`);
						await message.member.roles.add(dirty)
						return message.member.roles.remove(act);
					} else {
						message.channel.send(`${message.author.username}...h-h-***hentaii!***`)
					}
				}
				if (clean == "imunder18") {
					var act = message.guild.roles.cache.find(r => r.name == "Innocent");
					var dirty = message.guild.roles.cache.find(r => r.name == "Horny Gang");
					if (message.member.roles.cache.has("784135793987682384")) {
						message.channel.send(`${message.author.username} doesn't know anything :sweat:`);
						await message.member.roles.remove(dirty)
					} else {
						message.channel.send(`${message.author.username} is now <@&784135793987682384>!`, {
							"allowedMentions": {
								"users": []
							}
						})
						await message.member.roles.remove(dirty)
						return message.member.roles.add(act);
					}
				}


			};
			//Matthew Bot Testing stuff

			if (message.guild.id == "720351714791915520") {
				if (message.channel.parentID == "781939212416581654") {
					if (message.author.bot) {
						return;
					}
					var receive = await bot.users.fetch(message.channel.name)
					receive.send(message.content);
				}
			}
		}



		if (message.author.id == "518232676411637780") {
			message.react("827007959363223562").catch((err) => {
				console.log(`reaction failed in ${message.channel.name} of ${message.guild.name}`)
			})
		}
		if (message.content.startsWith(prefix)) {
			type = "bot"
		} else if (message.content.startsWith(rpgprefix)) {
			type = "rpg"
		}
		//checks if matthew bot or rpg bot is called
		if (!type) {
			//some extra personality for Matthew Bot
			/*if (temp.length = 1 && temp.includes("e")) {
 				var role = await message.guild.roles.cache.find(role => role.id == '758129827906584587');
 				message.channel.send("Silence.")
 				return message.member.roles.add(role)
				
 			}*/
			temp = cleanup(temp)
			for (i = 0; i < inputs.length; i++) {
				for (j = 0; j < inputs[i].length; j++) {
					if (temp.includes(inputs[i][j])) {
						for (k = 0; k < outputs[i].length; k++) {
							message.channel.send(outputs[i][k])
						}
						return
					}
				}

			}
			if (temp.length == 1 && temp.includes("e")) {
				var sended = await message.channel.send("E")
				if (message.author.id == "351164483256975360") {
					await sleep(1000)
					return sended.edit("You thought");
				}
				if (randomOdd(50)) {
					await sleep(1000)
					return sended.edit("You thought");
				} else {
					return
				}
			}
			if ((temp.split(" ").includes("david") || temp.split(" ").includes("davids")) && temp.split(" ").includes("yasuo")) {
				message.react("🤡")
			}
			if (temp.split(" ").includes("clown")) {
				message.react("🤡");
			}
			if (temp.split(" ").includes("masteryu")) {
				message.channel.send("<:masteryu:827007959363223562>")
			}
			if (temp.split(" ").includes("im") && temp.split(" ").includes("god")) {
				return message.channel.send("You are not god. **I am God**.")
			}
			if (message.author.id == ownerID) {

				if (!(temp.split(" ").includes("matthew") || temp.split(" ").includes("matthewbot"))) {

				} else {
					for (i = 0; i < temp.split(" ").length; i++) {
						if (praise.includes(temp.split(" ")[i])) {
							return message.channel.send("https:cdn.discordapp.com/attachments/720351714791915523/764105109536768020/unknown.png")
						}
					}
				}

			}
			if (temp.includes("abdullah")) {
				if (!temp.includes("supreme") || !temp.includes("leader")) {
					message.channel.send("You must refer to him as Supreme Leader Abdullah!")
				} else {
					message.channel.send("All hail Supreme Leader Abdullah! <:hotabdullahcrop:746455282921636021> ")
				}
				return
			}
			if (temp.split(" ").includes("mai") || temp.split(" ").includes("maisan")) {
				message.react("809523703138091108").catch((err) => {
					console.log(`reaction failed in ${message.channel.name} of ${message.guild.name}`)
				})
			}
			if (temp.charAt(0) == "a" && temp.slice(1).split("y").join("").length == 0 && temp.length != 1) {
				return message.channel.send("(☞ﾟヮﾟ)☞ ☜(ﾟヮﾟ☜) **Ayyyyy**")
			}
			if ((temp.split(" ")[temp.split(" ").indexOf("big") + 1] == "brother") || temp.split(" ").includes("bb")) {
				var bigbrother = ["💖", "❤️", "👏", "👍", "💪", "👁️", "👁‍🗨", "🥳", "📷", "🎉"]
				for (var i = bigbrother.length - 1; i > 0; i--) {
					var j = Math.floor(Math.random() * (i + 1));
					var temp = bigbrother[i];
					bigbrother[i] = bigbrother[j];
					bigbrother[j] = temp;
				}
				for (i = 0; i < 4; i++) {
					message.react(bigbrother[i]).catch((err) => {
						console.log(`reaction failed in ${message.channel.name} of ${message.guild.name}`)
					})
				}
			}
			if (temp.includes("just do it")) {
				message.react("🎷")
			}
			if (temp.includes("suck") && temp.includes("i") && message.author.id == 306512867232972802) {
				return message.channel.send("https://i.imgur.com/1pQHxXd.png")
			}

			return
		};




		//gets the arguments by slicing the prefix, and splitting them into an array
		const args = message.content.slice(prefix.length).trim().split(/ +/g)
		const commandName = args.shift().toLowerCase();



		console.log(commandName + " from " + message.author.username);
		console.log(args)

		//check if command exists for both prefix and rpgprefix
		if (type == "bot") {
			command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
		} else {
			command = bot.rpgcommands.get(commandName) || bot.rpgcommands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
		}

		if (!command) {
			return;
		}

		/*perm levels:
	
 		4 - DMs allowed
 		3 - guild only(or gamemaster only)
 		2 - administrator only
 		1 - Matthew only
 		0 - Shut down
 		*/

		if (command.perms == 0) {
			return message.reply("Sorry, this command has been shut down and may be implented later.")
		}
		//guild check
		if (command.perms < 4 && message.channel.type !== 'text' && command.perms != 1) {
			return message.reply('I can\'t execute that command inside DMs!');
		}


		//owner check
		if (command.perms == 1 && message.author.id !== ownerID) {
			return message.reply("Sorry, only Matthew Tang can use this command")
		}

		//admin check
		if (command.perms == 2 && (!(message.member.hasPermission("ADMINISTRATOR") || !message.member.roles.cache.some(role => role.name.includes("gamemaster"))) || message.author.id != ownerID)) {
			return message.reply("Sorry, you need admin / gamemaster permissions for this command!")
		}

		//args check
		if (!(command.args.includes(-1)) && !(command.args.includes(args.length))) {
			await message.reply("Are you sure that was the right number of arguments?")
			await message.channel.send("usage: " + command.usage)
			return
		}

		if (type == "bot") {
			var other = [admin, bot, commandName, disbut]
		} else {
			var other = [rpgadmin, bot, commandName, disbut]
		}

		if (command.wip) {
			

			bot.commands.set(command.name, require('./commands/' + folderFind[command.name] + "/" + command.name + ".js"))
		}
		console.log(command.name)
		command.execute(message, args, other);


	} catch (error) {
		console.error(error)
	}



});

var ignore = ["576031405037977600"]


bot.on("messageReactionAdd", async function(reaction, user) {
	try {
			if (user.bot) {
			return;
		}


		if (reaction.message.guild.id == "757770623450611784") {
			if (reaction.message.id == "850212882594398248") {
				var reactlist = []
				var test = await reaction.users.fetch()
				console.log(test)


				// msg = await trchannel.messages.fetch("850545940010893332")
				// msg.edit(reactlist.join("\n"))
			}
			if (!(reaction.emoji instanceof Discord.GuildEmoji)) {
				return;
			}
			if (reaction.emoji.guild.id != "757770623450611784") {
				return;
			}
			var r = JSON.parse(fs.readFileSync('reactions.json').toString());
			var e = reaction.emoji
			var u = user
			if (e.id in r.reactions) {
				r.reactions[e.id].count++
			} else {
				r.reactions[e.id] = {}
				r.reactions[e.id]["name"] = e.name
				r.reactions[e.id]["count"] = 1
				r.reactions[e.id]["users"] = {}
			}
			if (u.id in r.reactions[e.id].users) {
				r.reactions[e.id].users[u.id]++
			} else {
				r.reactions[e.id].users[u.id] = 1
			}

			if (u.id in r.users) {
				r.users[u.id].count++
			} else {
				r.users[u.id] = {}
				r.users[u.id]["name"] = u.username
				r.users[u.id]["count"] = 1
				r.users[u.id]["reactions"] = {}
			}
			if (e.id in r.users[u.id].reactions) {
				r.users[u.id].reactions[e.id]++
			} else {
				r.users[u.id].reactions[e.id] = 1
			}

			let list = JSON.stringify(r, null, 2);
			fs.writeFileSync('reactions.json', list);
		}
	}
	catch(err) {
		console.log(err)
	}
	




})
bot.on("guildMemberAdd", async (member) => {
	filelog(member)
	if (member.guild.id == "757770623450611784") {
		var channel = await member.guild.channels.cache.find(c => c.id == "843735245399785482")
		var sended = await channel.send("<@" + member.id + ">")
		sended.delete()
	}
	if (member.guild.id == "836780126741332009") {
		var roles = await member.guild.roles.cache
		var origin = await bot.guilds.fetch("757770623450611784")
		var anchor = await origin.members.fetch(member.id)
		var oldroles = await anchor.roles.cache
		oldroles.each(r => {
			member.roles.add(roles.find(oldrole => oldrole.name == r.name))
		})
	}
})
bot.on("raw", async packet => {
	if (packet.t == "TYPING_START" || packet.t == "MESSAGE_CREATE" || packet.t == "MESSAGE_REACTION_REMOVE") {
		return
	}
	filelog(packet)
	if (packet.t != "MESSAGE_REACTION_ADD") {
		return;
	}
	var guild = await bot.guilds.fetch(packet.d.guild_id)
	var member = await guild.members.fetch(packet.d.user_id)
	//ignore if bot
	if (member.user.bot) {
		return;
	}


	const channel = await guild.channels.cache.get(packet.d.channel_id);

	//if channel message is already cached no need to call twice
	//it'll be detected by messageReactionAdd anyways
	if (channel.messages.cache.has(packet.d.message_id)) return;
	var message = await channel.messages.fetch(packet.d.message_id)
	//Emojis can have identifiers of name:id format, so we have to account for that case as well
	const emoji = packet.d.emoji.id ? packet.d.emoji.id : packet.d.emoji.name;
	//This gives us the reaction we need to emit the event properly, in top of the message object
	const reaction = await message.reactions.cache.get(emoji);
	//Adds the currently reacting user to the reaction's users collection.
	if (reaction) reaction.users = (packet.d.user_id, member.user);


	bot.emit('messageReactionAdd', reaction, member.user);
})
//stalker time!


bot.on("presenceUpdate", async function(oldMember, newMember) {
	var status;
	if (!oldMember) {
		status = 'offline'
	} else {
		status = oldMember.status
	}
	351132323405889537
	if (newMember.user.id == "351132323405889537") {
		if (newMember.guild.id == "712382129673338991") {
			var channel = await newMember.guild.channels.cache.find(c => c.name == "general")
			if (!channel) {
				return
			}
			var e = JSON.parse(fs.readFileSync('edward.json').toString());

			channel.send(newMember.status != 'offline' && status == 'offline' ? "Edward has gone on!" : newMember.status == 'offline' ? "Edward has gone off." : "").catch((err) => {
				console.log("Edwardstatuscatch")
				return
			})
			e.status = "online"
			if (newMember.status != 'offline' && status == 'offline') {
				e.totalA = e.totalA + 1
			}
			var d = new Date()
			d.setTime(d.getTime() - 240 * 60 * 1000);
			h = e["history"]
			if (h[d.getFullYear()] == undefined) {
				h[d.getFullYear()] = {}
			}
			if (h[d.getFullYear()][d.getMonth()] == undefined) {
				h[d.getFullYear()][d.getMonth()] = {}
			}
			if (h[d.getFullYear()][d.getMonth()][d.getDate()] == undefined) {
				h[d.getFullYear()][d.getMonth()][d.getDate()] = {}
			}
			if (h[d.getFullYear()][d.getMonth()][d.getDate()][d.getHours()] == undefined) {
				h[d.getFullYear()][d.getMonth()][d.getDate()][d.getHours()] = {}
			}
			if (h[d.getFullYear()][d.getMonth()][d.getDate()][d.getHours()][d.getMinutes()] == undefined) {
				h[d.getFullYear()][d.getMonth()][d.getDate()][d.getHours()][d.getMinutes()] = []
			}
			h[d.getFullYear()][d.getMonth()][d.getDate()][d.getHours()][d.getMinutes()].unshift({
				epoch: d.getTime() + 240 * 60 * 1000,
				type: "a",
				data: newMember.status != 'offline' && status == 'offline' ? "on" : "off"
			})
			e["history"] = h
			let list = JSON.stringify(e, null, 2);
			fs.writeFileSync('edward.json', list);
			return;
		}
	}




	//bot & ignore detector
	if (newMember.user.bot) {
		return
	}


	var username = newMember.user.username

	if (newMember.member.nickname) {
		username = newMember.member.nickname
	}
	var channel = await newMember.guild.channels.cache.find(c => c.name == "matthew-sees-you")
	if (!channel) {
		return
	}
	if (newMember.status != 'offline' && status == 'offline') {
		if (!ignore.includes(newMember.user.id) && channel) {
			channel.send(`${username} *I see you* :eyes:`)
		}

		console.log(`\n${username} from ${newMember.guild.name} has gone online.\n`)
	} else if (newMember.status == 'offline') {
		if (!ignore.includes(newMember.user.id) && channel) {
			channel.send(`*${username} where are you hiding*? :dagger:`)
		}
		console.log(`\n${username} from ${newMember.guild.name} has gone off.\n`)
	}

});

bot.on("guildCreate", function(guild) {
	console.log(`Joined guild ${guild.name}`)
	const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))

	channel.send("Hi! I'm Matthew Bot, at your service!")
});

bot.on('guildMemberAdd', (member) => {

})
bot.on('rateLimit', (info) => {
	console.log(`Rate limit hit ${info.timeDifference ? info.timeDifference : info.timeout ? info.timeout: 'Unknown timeout '}`)
})
//serverstuff

bot.on('roleCreate', async function(r) {
	if (r.guild.id == "757770623450611784") {
		var server2 = await bot.guilds.fetch("836780126741332009")
		server2.roles.create({
			data: {
				name: r.name,
				color: r.color,
				hoist: r.hoist,
				mentionable: r.mentionable,
				permissions: r.permissions,
			}
		})
	}
})

bot.on('roleDelete', async function(r) {
	if (r.guild.id == "757770623450611784") {
		var server2 = await bot.guilds.fetch("836780126741332009")
		var roles = await server2.roles.cache
		var role = roles.find(role => role.name == r.name)
		role.delete()
	}
})

bot.on('roleUpdate', async function(oldRole, newRole) {
	if (oldRole.guild.id == "757770623450611784") {
		console.log("Cult roleUpdate")
		var server2 = await bot.guilds.fetch("836780126741332009")
		var roles = await server2.roles.cache
		var role = await roles.find(role => role.name == oldRole.name)
		role.setColor(newRole.color)
		role.setHoist(newRole.hoist)
		role.setMentionable(newRole.mentionable)
		role.setName(newRole.name)
		role.setPermissions(newRole.permissions)
		role.setPosition(newRole.rawPosition)
	}
})

const express = require('express');
const bodyParser = require('body-parser');
console.log("imported express, body-parser  " + timePast())


const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
	extended: true
}));

server.use(express.static('website'));

server.all('/', (req, res) => {
	res.sendFile(__dirname + '/website/index.html');

})


function keepAlive() {
	server.listen(3000, () => {
		console.log("Server is Ready at " + new Date().toString())
	});
}




keepAlive()
bot.login(token).then(console.log("Setup finished at " + timePast()))



async function nameChange() {
	const dirs = fs.readdirSync('/home/runner/MatthewBot/amongus');
	var guild = await bot.guilds.fetch("757770623450611784");

	var names = ["Cult.", "Needs A New Name Cult", "NOT A Black Marketing Cult", "Never Plays Among Us Cult", "Matthew Cult?", "Organ Collector Cult", "Mai Sakurajima Cult", "Tetris Cult", "Human Trafficking Cult"];

	var name = names[Math.floor(Math.random() * names.length)]
	var icon = dirs[Math.floor(Math.random() * dirs.length)]
	await guild.setIcon(`/home/runner/MatthewBot/amongus/${icon}`)
	await guild.setName(name).catch((error) => {
		console.error(error)
	});
	console.log(`Cult Server Name: ${name} Icon: ${icon}`)
	return
}

var humantraffickingicon = setInterval(() => nameChange(), 700000)

setTimeout(() => {
	console.log("REQUIRE CACHE")
	
},5000)

async function syncEmotes() {
	var e = JSON.parse(fs.readFileSync('serveremotes.json').toString());
	var emojis = await bot.emojis.cache
	var emojis = emojis.array()
	for (i=0;i<emojis.length;i++) {
		e[emojis[i].name] = emojis[i].id
	}
	fs.writeFileSync('serveremotes.json', JSON.stringify(e, null, 2));


	
}

