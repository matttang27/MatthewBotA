const { prefix, token } = require("../../../config.json");
const fs = require('fs');
const Discord = require('discord.js');
const emoji = require('@constants/emojiCharacters.js')
module.exports = {
	args: [-1],
	name: "numguess",
	type: "games",
	aliases: ["ng","numberguess","guessthenumber"],
	description: "Guess the number!",
	usage: `${prefix}guess <min> <max>`,
	perms: [],
	async execute(message, args, other) {
		// Create a message collector
		var secretNumber = 0;
		function guess(guesses,max){
			message.channel.send(`${max-guesses} guesses left!`)
			const collector = new Discord.MessageCollector(message.channel, m => !isNaN(m.content) , { time: 10000, max: 1 });
			collector.on('collect', message => {
				var guess = message.content
					if (parseInt(guess) == secretNumber) {
						message.channel.send('You got it! Correct!');
						collector.stop("Correct");
					} else if (parseInt(guess) < secretNumber) {
							guesses++;
							message.channel.send('Too small');
							
							collector.stop();
					} else {
							guesses++;
							message.channel.send('Too big');
							collector.stop();

					}
					if (guesses == max) {
							collector.stop();
							return message.channel.send('Game over');
					}
				}   
			)

					
			collector.on('end', (collected,reason) => {
				if (reason == "Correct") {
					return
				}
				else if (!collected.first()) {
					return message.channel.send("No reply. Game ended.")
				}
				else if(guesses < max) guess(guesses,max)
			});
		};

		message.channel.send("Select your difficulty!")
		var m = await message.channel.send(":one: 1-10\n:two: 1-100\n:three: 1-1000")
		try {
			await m.react(emoji[1]);
			await m.react(emoji[2]);
			await m.react(emoji[3])
			
		}
		catch (error){
			console.log(error)
		}

		const filter = (reaction, user) => {
			return user.id == message.author.id && (reaction.emoji.name == emoji[1] || reaction.emoji.name == emoji[2] || reaction.emoji.name == emoji[3]);
		};

		const collector = m.createReactionCollector(filter, { max: 1, time: 15000, errors: ["time"] });

		collector.on('collect', (reaction, user) => {});

		collector.on('end', collected => {
			
			reaction = collected.first()
			if (reaction.emoji.name == emoji[1]) {
				secretNumber = Math.floor((Math.random() * 9) + 1)
				message.channel.send("Game started! Guess the number from 1-10")
				guess(0,5)
			}
			else if (reaction.emoji.name == emoji[2]) {
				secretNumber = Math.floor((Math.random() * 99) + 1)
				message.channel.send("Game started! Guess the number from 1-10")
				guess(0,10)
			}
			else if (reaction.emoji.name == emoji[3]) {
				message.channel.send("Game started! Guess the number from 1-10")
				secretNumber = Math.floor((Math.random() * 999) + 1)
				guess(0,15)
			}
		});
	}
};	