const { prefix, token } = require(require.resolve("@root/config.json"));
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [1],
	name: "ignore",
	description: "Ignore people",
	usage: `${prefix}ignore <ID>`,
	perms: ["MATTHEW"],
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]

		message.delete()
		var members = await message.channel.members.array()
		if (members.splice(members.indexOf(args[0]),1).length == 0) {
			return message.channel.send("I need an actual member!")
		}
		if (members.length < 4) {
			for (var j=0;j<members.length;j++) {
				var username = members[j].user.username

				if (members[j].nickname) {
					username = members[j].nickname
				}
				message.channel.send(`${username} has gone off.\n`)
			}
			message.channel.send(`<@${args[0]}> is left alone.`)
			return;
		}
		for (var i=0;i<3;i++) {
			var text = ""
			for (var j=i*(Math.floor(members.length/4));j<(i+1)*Math.floor(members.length/4);j++) {
				var username = members[j].user.username

				if (members[j].nickname) {
					username = members[j].nickname
				}
				text += `${username} has gone off.\n`
			}
			message.channel.send(text)
		}
		for (var j=4*Math.floor(members.length/4);j<members.length;j++) {
			var username = members[j].user.username

			if (members[j].nickname) {
				username = members[j].nickname
			}
			text += `${username} has gone off.\n`
		}
		message.channel.send(text)

		message.channel.send(`<@${args[0]}> is left alone.`)
		
	}
};	