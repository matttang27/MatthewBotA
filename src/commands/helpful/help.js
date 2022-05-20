const { prefix, token, ownerID, rpgprefix } = require("@config");
const fs = require("fs");
const Discord = require("discord.js");
module.exports = {
	args: [0, 1],
	name: "help",
	category: "other",
	aliases: ["h", "commands", "command"],
	description: "Explains what a command does, and general help.",
	usage: `${prefix}help, or ${prefix}help [command]`,
	example: `${prefix}help ping`,
	perms: [],

	execute(message, args, other) {
		var bot = other[1];
		var commandlist = { ...bot.commandlist };
		var keys = Object.keys(commandlist);

		for (i of keys) {
			commandlist[i] = commandlist[i].map((r) => r.slice(0, -3));
		}
		//sends command list if there are no arguments
		if (!args.length) {
			let embed = new Discord.MessageEmbed()
				.setTitle("List of commands")
				.setTimestamp()
				.setDescription(
					`\nYou can send \`${prefix}help [command]\` to get info on a specific command!\n\n`
				)
				.setFooter(`\nFor RPG commands, use ${rpgprefix}help instead!`);
			for (i of keys) {
				let adder = {
					undefined: "",
					"closed": "(❌)",
					"wip": "(⚙️)",
				};
				let workcoms = commandlist[i]
						.filter((c) => {
							return !bot.commands.get(c).status;
							
						})

				//only print field if there are commands
				if (workcoms.length > 0) {
				embed.addField(
							i,
							workcoms.join(", ")
						);
				}
				
			}

			message.channel.send(embed);
			/*No longer DMing help message
			message.author.send(embed)
				.then(() => {
					if (message.channel.type !== 'dm') {
						message.reply('I\'ve sent you a DM with all my commands!');
					}

				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.reply(`DM failed (DM me first), sending commands in this channel instead.`);
					message.channel.send(embed)
				});
      */
		} else {
			const name = args[0].toLowerCase();
			const command =
				bot.commands.get(name) ||
				bot.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(name));

			if (!command) {
				return message.reply("that's not a valid command!");
			}
			let embed = new Discord.MessageEmbed()
			.setTitle(command.name)
			.addField("Description", command.description)
			.addField("Usage", command.usage)
			.addField("Aliases", command.aliases)
			.addField("Example", command.example)
			.addField(
				"Permissions",
				command.perms.length == 0 ? "None" : command.perms.join(",")
			)
			.addField("Status", command.status ? command.status : "open")
			.setColor("#AAEEAA")

			message.channel.send(embed);
		}
	},
};
