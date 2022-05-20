const { prefix, token } = require("@config");
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
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
		
		var db = admin.firestore()

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