const { prefix, token } = require("../../config.json");
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [-1],
	name: "suggest",
	category: "bot",
	description: "Make a suggestion for Matthew Bot!",
	usage: `${prefix}suggest <stuff>`,
	perms: [],
	async execute(message, args, other) {
		var s = JSON.parse(fs.readFileSync('suggestions.json').toString());
		var m = []
		if (args.length == 0) {
			s.suggestions.forEach(sg => {
				m.push(`\`${sg.suggestion}\`\n**from:** ${sg.author}`)
			})
			message.channel.send(m.join("\n\n"),{split: true}).catch(message.channel.send("No suggestions currently."))
		}
		else if (args.length == 1 && args[0] == "clear") {
			s.suggestions = []
			fs.writeFileSync('suggestions.json', JSON.stringify(s,null,2));
		}
		else {
				s.suggestions[s.suggestions.length] = {
				"suggestion" : message.content.slice(prefix.length + 8),
				"author": message.author.tag
			}
			message.channel.send("Noted. Thanks for your input!")
			fs.writeFileSync('suggestions.json', JSON.stringify(s,null,2));
		}

		
	}
};	