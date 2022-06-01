const { prefix, ownerID } = require(require.resolve("@root/config.json"));
const fs = require('fs');
const Discord = require('discord.js');
var admin = require("firebase-admin");
const uuid = require('uuid-v4');
module.exports = {
	args: [0, 1, 2],
	name: "covidscreen",
	aliases: ["cvs"],
	description: "Dms you a picture of a covid screening result!",
	usage: `${prefix}covidscreen <opt. device | x pixels> <y pixels>`,
	perms: [],
	async execute(message, args, other) {
		var admin = other["admin"]
		var bucket = admin.storage().bucket()
		var content;
		
		var screenie = bucket.file('screenie.png')
		console.log(screenie)
		const localFilename = './assets/screenie.png';

		screenie.createReadStream()
			.on('error', function(err) {})
			.on('response', function(response) {
				// Server connected and responded with the specified status and headers.
			})
			.on('end', function() {
				// The file is fully downloaded.
			})
			.pipe(fs.createWriteStream(localFilename));
		setTimeout(() => {
			message.channel.send({files: ['./assets/screenie.png']})
		},1000)
	}

};

