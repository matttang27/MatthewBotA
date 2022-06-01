const { prefix, token } = require(require.resolve("@root/config.json"));
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [0,1],
	name: "lovehistory",
	aliases: ["lh","lovehis","loveh"],
	description: "Gets the Love History of a person",
	usage: `${prefix}lovehistory <person>`,
	perms: [],
	
	status: 'closed',
	async execute(message, args, other) {
		var admin = other["admin"]
		var bot = other["bot"]
		var commandName = other["commandName"]
		
		var db = other["db"]

		if (args.length == 0) {
			var user = message.author
			var userRef = db.collection('users').doc(user.id)
			userGet = await userRef.get()
			if (!userGet.exists) {
				return message.reply("Sorry, that person hasn't created a profile yet.")
			}
			userData = userGet.data()
			
			
			for (event in userData.events) {
				message.channel.send(event)
			}
		}
	}
};	