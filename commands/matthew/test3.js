const { prefix, token } = require("../../config.json");
const fs = require('fs');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');

module.exports = {
	args: [-1],
	name: "test3",
	description: "Testing with firestore!",
	usage: `${prefix}test3`,
	perms: 1,
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
		var serverQueue = other[3]

		var firestore = admin.firestore
		var roles = message.guild.roles.cache
		roles.each(r => {if (r.name == "₱ɄⱤ₲Ɇ"){
			r.delete()
			console.log('deleted')
		}})

	}
};