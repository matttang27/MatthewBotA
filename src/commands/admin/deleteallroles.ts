

module.exports = {
	args: [0],
	name: "deleteallroles",
	description: "deletes all roles",
	usage: `${prefix}template`,
	perms: ["ADMINISTRATOR"],
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]

		var sended = await message.channel.send("ARE YOU SURE YOU WANT TO DELETE ALL ROLES? ENTER THE SERVER NAME TO CONFIRM:")
		const filter = (m) => (m.content == m.guild.name) && (m.author.id == message.author.id)
		message.channel.awaitMessages(filter, {max:1,timer:30}).then(async collected => {
			console.log("collected")
			if (collected.size == 0) {
				return message.channel.send("A crisis has been succesfully averted due to your indecisiveness.")
			}
			else {
				message.channel.send("Your roles are disappearing...")
				var roles = await message.guild.roles.cache
				roles.each(r => {
					r.delete().catch((err) => {
						console.log(`${r.name} cannot be removed`)
					})
				})
				
			}
		})
		

		
	}
};	
