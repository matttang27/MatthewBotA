const { prefix, token } = require(require.resolve("@root/config.json"));
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
		var admin = other["admin"]
		var bot = other["bot"]
		var commandName = other["commandName"]
		let code = fs.readFileSync('./test.txt','utf-8')
		eval(`(async () => {${code}})()`)
	}
};	