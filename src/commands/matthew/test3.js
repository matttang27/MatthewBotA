const { prefix, token } = require(require.resolve("@root/config.json"));
const fs = require('fs');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
var {newProfile} = require(require.resolve("@functions"))
module.exports = {
	args: [-1],
	name: "test3",
	description: "Testing with firestore!",
	usage: `${prefix}test3`,
	perms: ["MATTHEW"],
	async execute(message, args, other) {
		var admin = other["admin"]
		var bot = other["bot"]
		var commandName = other["commandName"]
		var serverQueue = other[3]

		var firestore = admin.firestore
		var db = other["db"]

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