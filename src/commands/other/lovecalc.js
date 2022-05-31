const { prefix, token } = require(require.resolve("@root/config.json"));

module.exports = {
	args: [-1],
	name: "lovecalc",
	category: "fun",
	aliases: ["lovecalculator","lc"],
	description: "Calculates the love between the people specified ~ cannot be more than 2 (WIP)",
	usage: `${prefix}lovecalc <person> <1> | <person> <2> (Unlimited number of arguments, seperate the people with a | (Shift+\\)`,
	example: `${prefix}lovecalc Matthew Tang | Astolfo`,
	perms: [],
	
	async execute(message, args, other) {

		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]



		//get location of seperator
		var seps = []
		for (i=0;i<args.length;i++) {
			if (args[i] == "|") {
				seps.push(i)
			}
		}
		
		//only allow one seperator
		if (seps.length == 0) {
			return message.reply("Sorry I need a separator!")
		}
		else if (seps.length == 2) {
			return message.reply("Sorry, my Love Calculator doesn't support love triangles! Please delete a seperator! **|**")
		}
		else if (seps.length > 2) {
			return message.reply(`Ha...this is getting complicated... ${seps.length + 1} people? I don't do orgies.`)
		}

		
		//find both names and put them in alphabetical order
		var name1 = args.slice(0,seps[0])
		var name2 = args.slice(seps[0] + 1)
		var temp1 = name1.join(' ')
		var temp2 = name2.join(' ')
		var name1 = name1.join('').toLowerCase()
		var name2 = name2.join('').toLowerCase()
		//test if arguments are users, takes usernames
		if (name1.startsWith('<@') && name1.endsWith('>')) {
			name1 = name1.slice(2, -1);

			if (name1.startsWith('!')) {
				name1 = name1.slice(1);
				var member = await message.guild.members.fetch(name1)
				if (member.nickname) {
					temp1 = member.nickname
				}
				else {
					temp1 = member.user.username 
				}
			}
			else {
				var user = await bot.users.fetch(name1)
				temp1 = user.username 
			}

		}
		if (name2.startsWith('<@') && name2.endsWith('>')) {
			name2 = name2.slice(2, -1);

			if (name2.startsWith('!')) {
				name2 = name2.slice(1);
				var member = await message.guild.members.fetch(name2)
				if (member.nickname) {
					temp2 = member.nickname
				}
				else {
					temp2 = member.user.username 
				}
			}
			else {
				var user = await bot.users.fetch(name1)
				temp2 = user.username 
			}
		}

		if (name2 < name1) {
			var temp = name2
			name2 = name1
			name1 = temp
			temp = temp2
			temp2 = temp1
			temp1 = temp
		}

		//convert each character to number and add to calc
		var love = name1 + "loves" + name2
		var calc = 0
		for (i=0;i<love.length;i++) {
			calc += parseInt(love[i], 36)
		}
		function random(calc) {
				var x = Math.sin(calc++) * 10000;
				return x - Math.floor(x);
		}
		var score = random(calc)
		score = Math.round(score*100)

		message.channel.send(`The love between **${temp1}** and **${temp2}** is **${score}**%!`)


		

		
		
		
	}
};