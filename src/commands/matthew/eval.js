const { prefix, token } = require(require.resolve("@root/config.json"));
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [-1],
	aliases: ["evaluate"],
	name: "eval",
	description: "Evaluates string",
	usage: `${prefix}eval`,
	perms: ["MATTHEW"],
	async execute(message, args, other) {
		var admin = other["admin"]
		var bot = other["bot"]
		var commandName = other["commandName"]
		eval("(async () => {" + args.join(" ") + "})()")

		
	}
};	