const { prefix, token } = require("../../config.json");
const fs = require('fs');
const Discord = require('discord.js');
const natural = require('natural');
const wordnet = new natural.WordNet();

module.exports = {
	args: [-1],
	name: "test4",
	description: "4th test",
	usage: `${prefix}test4`,
	perms: 1,
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
		var disbut = other[3]

		let button = new disbut.MessageButton()
  .setStyle('url') //default: blurple
  .setLabel('Hentify!') //default: NO_LABEL_PROVIDED
  .setID('click_to_function') //note: if you use the style "url" you must provide url using .setURL('https://example.com')
	.setURL('https://nhentai.net') //disables the button | default: false
	
	var buttons = new Array(parseInt(args[0])).fill(button)
	console.log(buttons)
	message.channel.send('Click for nhentai', button);
message.channel.send('Click for nhentai', {buttons: buttons});
		

		
		
		
	}
};	