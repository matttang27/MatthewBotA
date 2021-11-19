const { prefix, token } = require("../../config.json");

module.exports = {
	args: [0,1],
	name: "setperms",
	category: "TOS",
	aliases: ["setpermissions","sp"],
	description: "Set permissions for all the channels in that game",
	usage: `${prefix}setperms <optional game num>`,
	perms: ["ADMINISTRATOR"],
	
	async execute(message, args, other) {

		var roles = ['gamemaster','alive','dead']
		var colors = [16580705,"GREEN","GREY"]
		var names = ["town","dead","voting","history","graveyard","other","mafia","coven","vampire"]
		var counter = 1
		let channel;


		while (true) {
			let category = message.guild.channels.cache.find(c => c.name == `game-${counter}` && c.type == "category");
			console.log(!category)
			if (!category) break;
			counter++;
			console.log(counter)
		}
		
		counter -= 1

		if (args.length == 1) {
			counter = args[0]
		}
		//part three: assign's permissions to each channel

		//I'm sorry I'm too lazy now so I'm doing it channel by channel :D

		//this is now a seperate command because I'm too stupid

		//first, default each channel as SEND_MESSAGE & ADD_REACTIONS false for everyone except for gamemaster (makes things easier)
		function defaultPermissions(message,roles,colors,names,counter) {
			console.log(message.guild.channels.cache)
			console.log(names)
			for (i=0;i<names.length;i++) {
				
				console.log(names[i])
				let channel = message.guild.channels.cache.find(c => c.name == `${names[i]}-${counter}` && c.type == "text")
				if (!channel) throw new Error("Channel does not exist");

				channel.createOverwrite(message.guild.roles.everyone, {
					SEND_MESSAGES: false,
					ADD_REACTIONS: false
				})
				channel.createOverwrite(message.guild.roles.cache.find(r => r.name == `dead-${counter}`).id, {
					SEND_MESSAGES: false,
					ADD_REACTIONS: false
				})
				channel.createOverwrite(message.guild.roles.cache.find(r => r.name == `alive-${counter}`).id, {
					SEND_MESSAGES: false,
					ADD_REACTIONS: false
				})
				channel.createOverwrite(message.guild.roles.cache.find(r => r.name == `gamemaster-${counter}`).id, {
					VIEW_CHANNEL: true,
					SEND_MESSAGES: true,
					ADD_REACTIONS: true
					
				})
			}
			
		}
		
		/* 
F = cannot VIEW_CHANNEL
X = cannot SEND_MESSAGES or add ADD_REACTIONS
I = can only ADD_REACTIONS
O = can do both

		|E|A|D|G|
	T  X O X O
	D  F F O O
	V  X I X O
	H	 X X X O
	G  X X X O
	O  O O O O
	M  F F F O
	C  F F F O
	V  F F F O
Note: Everyone can talk in Other, but no information may be shared (fun comments that do not affect the game in any way are allowed)
*/


		//edit permissions for each channel according to the chart

		function assignPermissions(message,roles,colors,names,counter) {
			channel = message.guild.channels.cache.find(c => c.name == `town-${counter}` && c.type == "text")

			channel.createOverwrite(message.guild.roles.cache.find(r => r.name == `alive-${counter}`).id, {
				SEND_MESSAGES: true,
				ADD_REACTIONS: true
			})

			channel = message.guild.channels.cache.find(c => c.name == `dead-${counter}` && c.type == "text")


			channel.createOverwrite(message.guild.roles.everyone, {
				VIEW_CHANNEL: false
			})
			channel.createOverwrite(message.guild.roles.cache.find(r => r.name == `alive-${counter}`).id, {
				VIEW_CHANNEL: false
			})
			channel.createOverwrite(message.guild.roles.cache.find(r => r.name == `dead-${counter}`).id, {
				SEND_MESSAGES: true,
				ADD_REACTIONS: true
			})

			channel = message.guild.channels.cache.find(c => c.name == `voting-${counter}` && c.type == "text")
			channel.createOverwrite(message.guild.roles.cache.find(r => r.name == `alive-${counter}`).id, {
				ADD_REACTIONS: true
			})
			
			channel = message.guild.channels.cache.find(c => c.name == `other-${counter}` && c.type == "text")
			channel.createOverwrite(message.guild.roles.everyone, {
				SEND_MESSAGES: true,
				ADD_REACTIONS: true
			})
			channel.createOverwrite(message.guild.roles.cache.find(r => r.name == `alive-${counter}`).id, {
				SEND_MESSAGES: true,
				ADD_REACTIONS: true
			})
			channel.createOverwrite(message.guild.roles.cache.find(r => r.name == `dead-${counter}`).id, {
				SEND_MESSAGES: true,
				ADD_REACTIONS: true
			})
		
		}

		channel = message.guild.channels.cache.find(c => c.name == `mafia-${counter}` && c.type == "text")
		channel.createOverwrite(message.guild.roles.everyone, {
			VIEW_CHANNEL: false
		})


		
		await defaultPermissions(message,roles,colors,names,counter)
		await assignPermissions(message,roles,colors,names,counter)
		message.reply(`Finished setting permissions for game-${counter}`)
	},
};