const { prefix, ownerID } = require(require.resolve("@root/config.json"));
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [-1],
	name: "danbooru",
	description: "WIP (a.k.a i have nothing here)",
	usage: `${prefix}danbooru <command>`,
	perms: [],
	nsfw: true,
	status: 'wip',
	async execute(message, args, other) {
		var admin = other["admin"]
		var bot = other["bot"]
		var commandName = other["commandName"]
		

		
	}
};	

