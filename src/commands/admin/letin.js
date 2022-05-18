module.exports = {
    args: [1],
    name: "letin",
    aliases: ["haze"],
    description: "Un-Newmembers a member of the server. Requires two others as well.",
    usage: `${prefix}letin <usermention>`,
    perms: [],
    status: 'closed',
    async execute(message, args, other) {
        var admin = other[0];
        var bot = other[1];
        var commandName = other[2];
        if (message.member.roles.cache.find(n => n.name == "New Member")) {
            return message.channel.send("Lmao nice try but you're a New Member so you can't participate in a vote.");
        }
        else if (Date.now() - message.member.joinedTimestamp < 1209600000) {
            return message.channel.send("You haven't been in this server for 14 days yet!");
        }
        var q = await message.mentions.members.first();
        if (!q) {
            return message.channel.send("Make sure to mention someone to unquarantine them!");
        }
        var qrole = await q.roles.cache.find(n => n.name == "New Member");
        if (!qrole) {
            return message.channel.send("This person is not New Member!");
        }
        var embed = new Discord.MessageEmbed()
            .setColor('#26abFF')
            .setDescription(`A new letin for ${q.user.username} has been created by ${message.author.username}! We need two more to type **letin** to unquarantine them!`);
        message.channel.send(embed);
        var voter = 0;
        const filter = m => m.author.id != message.author.id && m.author.id != q.id && m.content == "letin" && m.author.id != voter && !m.member.roles.cache.find(n => n.name == "New Member") && Date.now() - message.member.joinedTimestamp < 1209600000;
        const collector = message.channel.createMessageCollector(filter, { time: 60000, max: 2 });
        collector.on('collect', m => {
            if (voter != 0) {
                embed.setDescription(`${m.author.username} has voted to let ${q.user.username} in! 1 vote left!`);
                message.channel.send(embed);
            }
            else {
                embed.setDescription(`${m.author.username} has voted to let ${q.uesrname} in! The 3 required votes have been fulfilled!`);
            }
        });
        collector.on('end', collected => {
            if (collected.size == 0) {
                embed.setDescription(`No one else voted to let ${q.user.username} in.`);
                embed.setColor('#DC2700');
                return message.channel.send(embed);
            }
            else if (collected.size == 1) {
                embed.setDescription(`We only had 2 out of the 3 voters needed to let ${q.user.username} in.`);
                embed.setColor('#DC2700');
                return message.channel.send(embed);
            }
            else {
                q.roles.remove(qrole);
                embed.setDescription(`${q.user.username} has been let into the rest of the server! Congratulations!`);
                embed.setColor('#00FF00');
                return message.channel.send(embed);
            }
        });
    }
};
