
module.exports = {
	args: [1],
	name: "copyroles",
	description: "Copy roles from one server to another",
	usage: `${prefix}copyroles <servertocopyfrom>`,
	perms: ["MANAGE_ROLES"],
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]

		var roles = message.guild.roles
		var origin = await bot.guilds.fetch(args[0])
		var origin = await origin.roles.cache
		origin = origin.sort((roleA,roleB) => roleB.rawPosition - roleA.rawPosition)
		console.log(origin)
		origin.each(r => {
			console.log(r.name)
			roles.create({
				data: {
					name: r.name,
					color: r.color,
					hoist: r.hoist,
					mentionable: r.mentionable,
					permissions: r.permissions,
				}
			})
		})
		console.log("done")
		
	}
};