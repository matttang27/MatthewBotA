const natural = require('natural');
const wordnet = new natural.WordNet();

const { prefix, token } = require("../../../config.json");
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [-1],
	aliases: ["dict"],
	name: "dictionary",
	description: "Gets a definition of the word",
	usage: `${prefix}dictionary`,
	perms: [],
	async execute(message, args, other) {
        wordnet.lookup(args[0], function(details) {
            
            var embed = new Discord.MessageEmbed();
            if (details.length == 0) {
                embed.setColor("#FF0000");
                embed.setTitle = (args[0] + " is not a word!")
                return message.channel.send(embed);
            }
            
            details.forEach(function(detail) {
                embed = new Discord.MessageEmbed();
                embed.setColor("#00FF00");
                embed.setTitle(args[0]);
                embed.setDescription(detail.def);
                embed.addFields(
                    { name: 'Synonyms', value: detail.synonyms.join(", ") },
                    { name: 'Point of Speech', value: detail.pos },
                )
                // Display examples, if available
                var counter = 1
                detail.exp.forEach(function(example) {
                    embed.addField(`Example #${counter}`,example)
                    counter++;
                });
                message.channel.send(embed);
            });
        });
		

		
	}
};	