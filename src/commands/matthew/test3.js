const { prefix, token } = require("@root/config.json");
const fs = require('fs');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
var {newProfile} = require('@functions')
module.exports = {
	args: [-1],
	name: "test3",
	description: "Testing with firestore!",
	usage: `${prefix}test3`,
	perms: ["MATTHEW"],
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
		var serverQueue = other[3]

		var firestore = admin.firestore
		var db = admin.firestore()

		var FieldValue = firestore.FieldValue;
		const users = db.collection('users')
		users.get().then(function(querySnapshot) {
    querySnapshot.forEach(async function(doc) {
			var data = await doc.data()
			console.log(data)
        doc.ref.update(newProfile(firestore));
    });
});
	}
};