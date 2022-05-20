const { prefix, token } = require("@config");
const fs = require('fs');
const Discord = require('discord.js');
const ChessWebAPI = require('chess-web-api');
module.exports = {
	args: [-1],
	name: "test",
	description: "Tests for Matthew only.",
	usage: `${prefix}test`,
	perms: ["MATTHEW"],
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
		let code = fs.readFileSync('./test.txt','utf-8')
		eval(`(async () => {${code}})()`)
	}
};	