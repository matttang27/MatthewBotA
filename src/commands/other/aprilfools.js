const { prefix, token } = require(require.resolve("@root/config.json"));
const fs = require('fs');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');

module.exports = {
	args: [-1],
	name: "aprilfools",
	description: "Reverses EVERYTHING",
	usage: `${prefix}aprilfools`,
	perms: ["MANAGE_CHANNELS","MANAGE_ROLES","MANAGE_GUILD","MANAGE_NICKNAMES","CHANGE_NICKNAME"],
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
		var serverQueue = other[3]

		var firestore = admin.firestore

		var guild = await message.guild
		guild.setName(message.guild.name.split("").reverse().join(""))

		var channels = await message.guild.channels.cache
		channels.forEach(c => c.setName(c.name.split("").reverse().join("")))

		var users = await message.guild.members.cache
		users.forEach(u => u.setNickname(u.nickname ? u.nickname.split("").reverse().join(""): u.user.username.split("").reverse().join("")))

		var roles = await message.guild.roles.cache
		roles.forEach(r => r.setName(r.name.split("").reverse().join("")))

		var emojis = await message.guild.emojis.cache
		emojis.forEach(e => e.setName(e.name.split("").reverse().join("")))
	}
};