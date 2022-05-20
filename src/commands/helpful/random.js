const { prefix, token } = require("@config");

module.exports = {
	args: [1,2],
	name: "random",
	aliases: ["rand","numberselect","randnum","rd"],
	description: "Selects a number from the range chosen, or 1 to the number.",
	usage: `${prefix}random <num> <op.num>`,
	example: `${prefix}random 10 (choose a number between 1 to 10)`,
	perms: [],
	
	async execute(message, args, other) {
		for (i=0;i<args.length;i++) {
			args[i] = parseInt(args[i])
		}
		if (args.length == 1) {
			var rand = Math.floor((Math.random() * args[0]) + 1)
		}
		if (args.length == 2) {
			var rand = Math.floor((Math.random() * (args[1] - args[0] + 1)) + args[0])
		}
		
		message.channel.send(`Badabadabadabada... the lucky number is... **${rand}**!`) 	
	}
};