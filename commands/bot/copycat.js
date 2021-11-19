const { prefix, token } = require("../../config.json");

module.exports = {
	args: [-1],
	name: "copycat",
	aliases: ["copy","cc"],
	description: "Copycat!",
	usage: `${prefix}copycat <message>`,
	example: `${prefix}copycat HII!`,
	perms: [],
	
	execute(message, args, other) {
		message.channel.send(args.join(' ')).catch(() => {
				message.channel.send("Message cannot be empty.")
			})
	
	},
}