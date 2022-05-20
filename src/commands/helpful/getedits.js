const { prefix, token } = require("../../../config.json");

module.exports = {
	args: [1],
	name: "getedits",
	aliases: ["ge","gedits","geteds"],
	description: "Get the edits from a specific message",
	usage: `${prefix}getedits <message ID>`,
	perms: ["MANAGE_MESSAGES","READ_MESSAGE_HISTORY"],
	async execute(message, args, other) {
		var temp = await message.channel.messages.fetch(args[0])
		message.reply(temp.edits)
	}
};	