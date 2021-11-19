const { prefix, token } = require("../../config.json");
const fs = require('fs');
const Discord = require('discord.js');
const ChessWebAPI = require('chess-web-api')
module.exports = {
	args: [-1],
	name: "test5",
	description: "Test5",
	usage: `${prefix}test5`,
	perms: ["MATTHEW"],
	reload: true,
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
		var serverQueue = other[3]
		let chessAPI = new ChessWebAPI();
		let test = await chessAPI.getPlayerStats('matttang_05')
		console.log(test.body.rapid)
		var db = admin.firestore()
		var chessusers = db.collection('chess').doc('users')
		let chessdata = await chessusers.get()
		chessdata = chessdata.data()
		console.log(chessdata)
	}
};	


