const { prefix, token } = require(require.resolve("@root/config.json"));
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [0],
	name: "saydictionary",
	description: "Says the entire dictionary",
	usage: `${prefix}saydictionary`,
	perms: ["MANAGE_MESSAGES"],
	async execute(message, args, other) {
		var admin = other["admin"]
		var bot = other["bot"]
		var commandName = other["commandName"]
	
		var commandName = other["commandName"]
		var words = require("an-array-of-english-words")
		var counter = 0;


		var m = "";
		while(counter < words.length) {
			m = "";
			while(m.length <= 1900) {
				if (counter == words.length) {
					break;
				}
				m += words[counter] + "\n"
				counter++;
			}
			message.channel.send(m);
		}
		
	}
};	