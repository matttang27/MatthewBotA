const { prefix, token } = require("../../../config.json");
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
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]

		var todo = fs.readFileSync("todo.txt",'utf8')
		message.channel.send(todo.split("\n"))
		


		
	}
};	