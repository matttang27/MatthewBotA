const { prefix, ownerID } = require("../../config.json");
const fs = require('fs');
const Discord = require('discord.js');
const https = require('https')
const {httpsGet,httpRequest} = require('../../functions.js')
const chars = require("../../emojiCharacters.js")
module.exports = {
	args: [-1],
	name: "tetra",
	description: "Get tetra results. Subcommands: leaderboard, user",
	usage: `${prefix}tetra <command> <args>`,
	wip: false,
	perms: 4,
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
		
		var db = admin.firestore()
		var trlist = await db.collection('trlist')
		
		if (args[0] == "leaderboard" || args[0] == "lb") {
			var docRefs = await trlist.listDocuments()
			var documentIds = docRefs.map(it => it.id)

			var serverIds = await message.guild.members.cache.map((m) => m.id)

			var players = documentIds.filter(r => serverIds.indexOf(r) != -1)
			var lb = {}
			console.log(players)
			for (i of players) {
				var player = trlist.doc(i)
				
			}
		}
		if (args[0] == "add") {
			var docRefs = await trlist.listDocuments()
			if (docRefs.indexOf(args[1]) == -1) {
				console.log("lol")
				userdata = await Promise.all([httpsGet("https://ch.tetr.io/api/users/" + args[2].toLowerCase(),https)
				,httpsGet("https://ch.tetr.io/api/users/" + args[2].toLowerCase() + "/records",https)]).then((values) => {
					trlist.doc(args[1]).set({
						user: values[0],
						records: values[1]
					})
				});
			}
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
				var guildm = await message.guild.members.cache.filter(u => ((u.nickname ? u.nickname.toLowerCase() : null)  == search.toLowerCase()) || (u.user.username.toLowerCase() == search.toLowerCase()))
				var arraym = guildm.array()
				console.log(arraym)
				if (guildm.size > 1) {
					var text = ""
					for (i=0;i<guildm.length;i++){
						text += chars[i+1] + " - " + arraym[i]
					}
					var embed = new Discord.MessageEmbed()
					.setTitle("Select member or cancel command")
					.setDescription(text)
					.setTimestamp()
					var sended = await message.channel.send(embed)
				}
				else if (guildm.size == 1) {
					var user = guildm.first().user
					console.log(user)
				}
				else {
					return message.channel.send("No user found with that username / nickname.")
				}
			}
		}
		
	}
}	

