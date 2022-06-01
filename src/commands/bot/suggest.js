const { prefix, token } = require(require.resolve("@root/config.json"));
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
		admin = other["admin"]
		var db = other["db"]
		let suggestRef = db.collection("extra").doc("suggestions")
		let s = await suggestRef.get()
		if (s.exists) {
			s = s.data()
		}
		var m = []
		if (args.length == 0) {
			if (s.suggestions.length != 0) {
				s.suggestions.forEach(sg => {
								m.push(`\`${sg.suggestion}\`\n**from:** ${sg.author}`)})	
				message.channel.send(m.join("\n\n"))
			}
			else {
				message.channel.send("No suggestions currently.")
			}
		}
		else if (args.length == 1 && args[0] == "clear") {
			s.suggestions = []
			suggestRef.set(s)
		}
		else {
				s.suggestions[s.suggestions.length] = {
				"suggestion" : message.content.slice(prefix.length + 8),
				"author": message.author.tag
			}
			message.channel.send("Noted. Thanks for your input!")
			suggestRef.set(s)
		}

		
	}
};	