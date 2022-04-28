const { prefix, ownerID } = require("../../config.json");
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [1],
	name: "reload",
	description: "Reload specific command, 'all', or 'wip'",
	usage: `${prefix}reload`,
	perms: ["MATTHEW"],
	async execute(message, args, other) {
		var {admin,bot,commandName} = other
		

		if (args[0] == "all") {
			for (const path in require.cache) {
				if (path.endsWith('.js')) { // only clear *.js, not *.node
					delete require.cache[path]
				}
			}
		}
		else {
			delete require.cache[require.resolve(`./${args[0]}.js`)]
		}
		
	}
};	

