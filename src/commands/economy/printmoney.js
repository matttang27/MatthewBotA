const { prefix, token, workcd } = require("@config");
const fs = require('fs');
const Discord = require('discord.js');
const minutesToMessage = require('@functions')

module.exports = {
	args: [1,2],
	name: "printmoney",
	aliases: ["give"],
	description: "Adds money to someone",
	usage: `${prefix}printmoney <money> <opt. person>`,
	perms: ["MATTHEW"],
	status: 'closed',
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
		var db = admin.firestore()
		var firestore = admin.firestore
		

		var mention = message.mentions.members.array()
		if (!(!isNaN(args[0]) && parseInt(Number(args[0])) == args[0] && !isNaN(parseInt(args[0], 10)))) {
			return message.channel.send("Not a valid number!")
		}
		if (mention.length == 0) {
			const userRef = db.collection('users').doc(message.author.id);
			user = await userRef.get();
			var userData = user.data()
			
			if (!userData) {
				return message.reply(`Create a profile first with ${prefix}profile !`)
			}
			userRef.set({
				money: parseInt(userData.money) + parseInt(args[0])
			}, {merge: true})

			message.channel.send(`Added $${args[0]} to your account.`)
		}
		else {
			const userRef = db.collection('users').doc(mention[0].user.id);
			user = await userRef.get();
			var userData = user.data()
			if (!userData) {
				return message.reply(`This person hasn't created a profile yet.`)
			}
			userRef.set({
				money: parseInt(userData.money) + parseInt(args[0])
			}, {merge: true})

			message.channel.send(`Added $${args[0]} to their account.`)
		}
		

		
	}
};	