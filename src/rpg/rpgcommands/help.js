const { prefix, token, ownerID,rpgprefix } = require("@root/config.json");

module.exports = {
	args: [0,1],
	name: "help",
	aliases: ["h","commands","command"],
	description: "Explains what a command does, and general help.",
	usage: `${rpgprefix}help, or ${rpgprefix}help [command]`,
	example: `${rpgprefix}help ping`,
	perms: 4,
	
	execute(message, args, other) {
		data = []
		console.log
		const {rpgcommands} = message.client;
		
		//sends command list if there are no arguments
		if (!args.length) {
			data.push("Here's a list of all my commands:");
			rpgcommands.forEach(command => {
				if (command.ownerOnly && message.author.id != ownerID) {
					return;
				}
				else {
					data.push(command.name)
				}
			})
			data.push(`\nYou can send \`${prefix}help [command]\` to get info on a specific command!`);
			data.push(`\nFor RPG commands, use ${rpgprefix}help instead!`)

			return message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('I\'ve sent you a DM with all my commands!');
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
				});
		}

		const name = args[0].toLowerCase();
		const command = rpgcommands.get(name) || rpgcommands.find(cmd => cmd.aliases && cmd.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}

		data.push(`***${command.name}***\n`);
		var restriction = ""
		
		switch (command.perms) {
			case 1:
				restriction = "Matthew only"
				break
			case 2:
				restriction = "Admin only"
				break
			case 3:
				restriction = "Guild only"
				break
			case 4:
				restriction = "No restrictions"
				break
			
			
			
		}
		

		if (command.description) data.push("**Description: **" + `${command.description}`);
		if (command.usage) data.push("**Usage: **" + `${command.usage}`);
		if (command.aliases) data.push("**Aliases: **" + `${command.aliases}`);
		if (command.example) data.push("**Example: **" + `${command.example}`);
		data.push("**Restrictions: **" + restriction)
		message.channel.send(data, { split: true });

	}
	
}