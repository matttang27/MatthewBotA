const { prefix, token, ownerID,rpgprefix } = require("../../config.json");
const fs = require('fs');
const Discord = require('discord.js');
module.exports = {
	args: [0,1],
	name: "help",
	category: "other",
	aliases: ["h","commands","command"],
	description: "Explains what a command does, and general help.",
	usage: `${prefix}help, or ${prefix}help [command]`,
	example: `${prefix}help ping`,
	perms: 4,
	
	execute(message, args, other) {
		data = []
		var bot = other[1]
		var commandlist = {...bot.commandlist}
		console.log(commandlist)
		var keys = Object.keys(commandlist)

		for (i of keys) {
			commandlist[i] = commandlist[i].map(r => r.slice(0,-3))
		}
		//sends command list if there are no arguments
		if (!args.length) {
			data.push("Here's a list of all my commands:");
			var embed = new Discord.MessageEmbed()
			.setTitle("List of commands")
			.setTimestamp()
			.setDescription(`\nYou can send \`${prefix}help [command]\` to get info on a specific command!`)
			.setFooter(`\nFor RPG commands, use ${rpgprefix}help instead!`)
			for (i of keys) {
				console.log(i)
				embed.addField(i, commandlist[i].join(", "))
			}
			return message.author.send(embed)
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
		const command = commands.get(name) || commands.find(cmd => cmd.aliases && cmd.aliases.includes(name));

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
