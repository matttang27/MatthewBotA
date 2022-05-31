const { prefix, token } = require(require.resolve("@root/config.json"));

module.exports = {
	args: [0],
	name: "deleteall",
	category: "TOS",
	aliases: ["reset"],
	description: "Delete's all Tos Channels and Roles",
	usage: `${prefix}deleteall`,
	perms: ["MATTHEW"],
	status: "wip",
	async execute(message, args, other) {
		var channels = ["town-","dead-","voting-","history-","graveyard-","other-","mafia-","coven-","vampire-"]
		var roles = ['gamemaster-','alive-','dead-']
		await message.guild.channels.cache.forEach(channel => {
			if (channels.some(v => channel.name.includes(v)) && channel.name.match(/\d+/g)) {
				channel.delete()
			}
		})
		await message.guild.roles.cache.forEach(role => {
			if (roles.some(v => role.name.includes(v))) {
				role.delete()
			}
		})
		message.channel.send("Deleted all the TosBot stuff ;-;")
	}
};