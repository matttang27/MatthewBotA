
module.exports = {
	args: [1],
	name: "copyemotes",
	aliases: ["ces","cemotes"],
	description: "Copies emotes from another server",
	usage: `${prefix}copyemotes <guild id>`,
	perms: [0x0040000000],
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
		
		console.log("syncing emotes")
		var emoji = await bot.guilds.fetch(args[0])
		emoji = await emoji.emojis.cache
		var gemojis = await message.guild.emojis
		
		emoji.each(e => {
			gemojis.create(e.url,e.name)
			})

		
	}
};	

