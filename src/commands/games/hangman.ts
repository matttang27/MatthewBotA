import config = require("../../../config.json");
const {embedError} = require("../../constants/functions.js");;
const path = require("path");
const fs = require('fs');
const Discord = require('discord.js');
const english = require('an-array-of-english-words');
module.exports = {
	args: [-1],
	name: "hangman",
	category: "fun",
	description: "The classic hangman",
	usage: `${config.proPrefix[0]}hangman <topic>`,
	perms: [],
	status: 'wip',
	async execute(message, args, other) {
		
		let words = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../hangman.json")));
		
		let short = {}
		//this is absolutely horrible but i can't think of a better solution right now and it's 12:30AM so
		for (let topic of Object.keys(words)) {
			short[topic.split(" - ")[1]] = topic.split(" - ")[0]
		}
		let long = {}
		for (let topic of Object.keys(words)) {
			long[topic.split(" - ")[0]] = topic.split(" - ")[1]
		}
		//the problem was that the original key contains both the long and shortcut, but the argument is either the shortcut or long, and so it doesn't match up.
		//I now have two object keys so we can "piece" back the original key.

		let word = ""
		
		
		if (args.length == 0 || args[0] == "words") {
			word = english[Math.floor(Math.random()*english.length)]
		}
		else if (args[0] == "list") {
			let topiclist = ["words (default)"].concat(Object.keys(words));
			return message.channel.send(new Discord.MessageEmbed().setTitle("Hangman Topics").setDescription("Here is a list of all the current MatthewBot Hangman Topics.\nUse `m!hangman <topic or shortcut>` to play!\n\nIf you want another topic, use m!suggest or dm matttang27#6574 (preferably with a list of words)\n\n**List of topics (topic - shortcut)**:\n\n" + topiclist.join("\n")));
		}
		else {
			if (Object.keys(long).includes(args[0])) {
				let key = args[0] + " - " + long[args[0]]

				word = words[key][Math.floor(Math.random()*words[key].length)]
			}
			else if (Object.keys(short).includes(args[0])) {
				let key = short[args[0]] + " - " + args[0]
				
				word = words[key][Math.floor(Math.random()*words[key].length)]
			}
			else {
				return message.channel.send(new Discord.MessageEmbed().setTitle("Not a topic").setDescription(`${args[0]} is not a valid topic.\nA list of valid topics can be found at \`m!hangman list\`.`).setColor("red"));
			}
		}
		return message.channel.send("Word: " + word);
		
	}
};	