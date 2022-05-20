import { prefix, token, weeklycd, ownerID } from = require("../../config.json");
const fs = require('fs');
const Discord = require('discord.js');
const minutesToMessage = require('../../constants/functions.js')

module.exports = {
	args: [0],
	name: "weekly",
	description: "Collect your weekly reward!",
	usage: `${prefix}weekly`,
	perms: [],
	status: 'closed',
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
		var db = admin.firestore()
		var firestore = admin.firestore
		var money = 0
		situations = [
			{
				chance: 40,
				message: function (money) {return `${money} dollars? That's a pretty big paycheck`},
				author: "matttang27#0585"
			},
			{
				chance: 40,
				message: function (money) {return `You try the lottery and somehow win **${money}** dollars! Lucky you!`},
				author: "matttang27#0585"
			},
			{
				chance: 40,
				message: function (money) {return `Crossing the street, someone hits you with their car. It was just a light bump, but they give you $${money} as an apology.`},
				author: "matttang27#0585"
			},
			{
				chance: 40,
				message: function (money) {return `You enter a writing contest and get first place with a prize of **${money}** dollars! Sadly your book never gets published...`},
				author: "matttang27#0585"
			},
			{
				chance: 40,
				message: function (money) {return `You struck a goldmine! Yes, an actual Gold Mine. Here you go **${money}** dollars.`},
				author: "Jelly#1410"
			},
			{
				chance: 40,
				message: function (money) {return `You were the 1 millionth customer at a restaurant. Your prize was having all the food you want! You start filling food into bags, keeping some for later, and running a soup kitchen while the owner glares at you from the other side of the road. Overall, you saved**${money}**dollars! `},
				author: "matttang27#0585"
			},
			{
				chance: 40,
      	message: function (money) {return `{Danganronpa} You trap Toko Fukawa in her room. Byakuya is so relieved he gives you ${money} dollars and promises to make you an honorary Togami.`},
      	author: "matttang27#0508"
			}
			


		]


		function getRndInteger(min, max) {
			return Math.floor(Math.random() * (max - min + 1) ) + min;
		}





		function getMoney(message) {
			var i = getRndInteger(0,situations.length-1)
			
			money = getRndInteger(1000,2000)
			const embed = new Discord.MessageEmbed()
			.setColor('#26ff00')
			.setAuthor(`${message.author.username}'s weekly event.`, `${message.author.avatarURL()}`)
			.setDescription(situations[i].message(money))
			embed.setFooter(`written by: ${situations[i].author}`)
			message.channel.send(embed)
			return money
		}



		const userRef = db.collection('users').doc(message.author.id);
		user = await userRef.get();
		var userData = user.data()
		if (!userData) {
			return message.reply(`Create a profile first with ${prefix}profile !`)
		}
    var p = JSON.parse(fs.readFileSync('players.json'))

		var index = p.players.findIndex(p => p.playerid == message.author.id)
		var player = p.players[index]
		


		var diff = Date.now() - player.lastweekly
		if ((diff) / 1000 < weeklycd * 60) {
			var cooldown = weeklycd - Math.floor(diff/60000)
			console.log(player.lastweekly)
			return message.channel.send(`Please wait ${minutesToMessage(cooldown)} before your weekly event!`)
		}
		else {
			money = getMoney(message)
			p.players[index].lastweekly = Date.now()
			

			userRef.set({
				money: userData.money + money	
			}, {merge: true})
		}

		fs.writeFileSync('players.json', JSON.stringify(p,null,2));
		

		
	}
};	