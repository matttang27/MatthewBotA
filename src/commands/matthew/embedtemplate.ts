

module.exports = {
	args: [-1],
	name: "embedtemplate",
	description: "Template for sending an embed",
	usage: `${prefix}embedtemplate`,
	perms: ["MATTHEW"],
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]

		var embed = new Discord.MessageEmbed()
		.setTitle("Example")
		.setDescription("Example here")
		.setImage("")
		
	}
};	

