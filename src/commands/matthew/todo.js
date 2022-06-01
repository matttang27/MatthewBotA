const { prefix, token } = require(require.resolve("@root/config.json"));
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [0],
	name: "todo",
	category: "bot",
	description: "What Matthew Bot plans to add",
	usage: `${prefix}todo`,
	perms: [],
	async execute(message, args, other) {
		var admin = other["admin"]
		var bot = other["bot"]
		var commandName = other["commandName"]

		var todo = fs.readFileSync("todo.txt",'utf8')
		message.channel.send(todo.split("\n"))
		


		
	}
};	