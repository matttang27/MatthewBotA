const { prefix, token } = require("../../../config.json");
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [0],
	name: "saydictionary",
	description: "Says the entire dictionary",
	usage: `${prefix}saydictionary`,
	perms: ["MANAGE_MESSAGES"],
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
	
		var commandName = other[2]
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