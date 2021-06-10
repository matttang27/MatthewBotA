const { prefix, token } = require("../../config.json");
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [-1],
	name: "test",
	description: "Tests for Matthew only.",
	usage: `${prefix}test`,
	perms: 1,
	async execute(message, args, other) {
		// Create a message collector
		var secretNumber = 10
		function getGuesses(numberOfGuesses,maxGuesses){
			const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000, max: 1 });
					collector.on('collect', message => {
						var guess = message.content
							if (parseInt(guess) == secretNumber) {
									message.channel.send('Boom! Correct!');
									return collector.stop();
							} else if (parseInt(guess) < secretNumber) {
									numberOfGuesses++;
									message.channel.send('Too small');
									collector.stop();
							} else {
									numberOfGuesses++;
									message.channel.send('Too big');
									collector.stop();

							}
							if (numberOfGuesses == maxGuesses) {
									collector.stop();
									return message.channel.send('Game over');
							}
						}   
					)

					//Repeat if guesses still exist
					collector.on('end', collected => {
							if(numberOfGuesses < maxGuesses) getGuesses(numberOfGuesses,maxGuesses)
					});
			};

			getGuesses(0,5);
		
	}
};	