<<<<<<< HEAD
const { prefix, token } = require("../../../config.json");

const Discord = require('discord.js');



=======
>>>>>>> 9e79397123384be9c02f670d44438c53f18e283e
module.exports = {
    args: [-1],
    name: "test2",
    description: "Another TEST? Damn ok Matthew chill",
    usage: `${prefix}test2`,
    perms: ["MATTHEW"],
    async execute(message, args, other) {
        var admin = other[0];
        var bot = other[1];
        var commandName = other[2];
        var moves = ['rock', 'paper', 'scissors', 'r', 'p', 's'];
        var move = [];
        function playRound(round) {
            message.channel.send("Round " + round);
            var players = [];
            const filter = m => !players.includes(m.author.id) && moves.includes(m.content.toLowerCase()) && m.channel.id == message.channel.id;
            const collector = message.channel.createMessageCollector(filter, { max: 2, time: 15000 });
            collector.on('collect', async (m) => {
                players.push(m.author);
                move.push(moves.indexOf(m.content) % 3);
                m.delete();
                m.channel.send(`${m.author.username} moved!`);
            });
            collector.on('end', collected => {
                var winner = -1;
                if (!collector.endReason()) {
                    return message.channel.send("Cancelled battle.");
                }
                switch (move[0] - move[1]) {
                    case 1:
                        winner = 0;
                        break;
                    case -1:
                        winner = 1;
                        break;
                    case 2:
                        winner = 1;
                        break;
                    case -2:
                        winner = 0;
                        break;
                    default:
                        break;
                }
                const embed = new Discord.MessageEmbed()
                    .setColor('#fffb00')
                    .setTitle(`${players[0].username} vs ${players[1].username}`);
                if (winner >= 0) {
                    embed.setThumbnail(`${players[winner].displayAvatarURL()}`);
                    embed.addFields({
                        name: 'Result', value: `${players[winner].username} won the battle!`
                    });
                }
                else {
                    embed.addFields({ name: `Result`, value: `This battle ended in a draw!` });
                }
                message.channel.send(embed);
                let results = `<@${players[0].id}>-${moves[move[0]]} -- ${moves[move[1]]}-<@${players[1].id}>`;
                message.channel.send("results:\n" + results);
            });
        }
        for (let i = 0; i < args[0]; i++) {
            playRound(i);
        }
    }
};
