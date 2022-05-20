import { prefix, ownerID } from = require("../../config.json");
const token = process.env['token'];
const fetch = require('node-fetch')
module.exports = {
	args: [-1],
	name: "reply",
	aliases: ["rp"],
	description: "Reply through MatthewBot",
	usage: `${prefix}reply <channelid> <messageid> <message>`,
	example: `${prefix}reply 716336274591580190 845861608970649622 HII!`,
	perms: ["MATTHEW"],
	
	execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
		var type = message.channel.type
		if (message.author.id != ownerID) {
			if (type == "text") {
				if (!message.member.roles.cache.find(r => r.name == "Puppeteer")) {
					return;
				}
			}
		
		}
		
		if (args.length == 0) {
			return message.reply("You need a message!")
		}
		message.delete()
		if (type == "text") {
			
			const url = `https://discord.com/api/v8/channels/${args[0]}/messages`;
			var payload = {
				content: args.splice(2).join(" "),
				tts: false,
				message_reference: {
					message_id: args[1]
				}
			};
			fetch(url, {
				method: "POST",
				body: JSON.stringify(payload),
				headers: {
					Authorization: `${bot.user.bot ? "Bot " : ""}${bot.token}`,
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
			}).catch(() => { });
		}
		else {
			message.client.users.cache.get(message.author.id).send(args.join(' ')).catch(() => {
				if (type == "text") {
					message.channel.send("Message cannot be empty.")
				}
				else {
					message.client.users.cache.get(message.author.id).send("Message cannot be empty.")
				}
			})
		}
		if (type == "text") {
			console.log(`controlled by ${message.author.username} in ${message.channel.name} in ${message.guild.name}`)
		}
		else {
			console.log(`controlled by ${message.author.username} in DMs.`)
		}
		
	
	},
}