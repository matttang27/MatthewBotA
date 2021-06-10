const { prefix, token } = require("../../config.json");
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [-1],
	name: "test5",
	description: "Test5",
	usage: `${prefix}test5`,
	perms: 1,
	wip: true,
	async execute(message, args, other) {
		message.channel.send("hi")
		var a = await JSON.stringify(require.cache)
		fs.writeFile('wtf.txt', a, function (err) {
			if (err) return console.log(err);
		});
	}
};	

