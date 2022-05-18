module.exports = {
    args: [1],
    name: "allchannels",
    aliases: ["ac"],
    description: "Logs information about all channels in a server",
    usage: `${prefix}allchannels`,
    perms: ["MATTHEW"],
    async execute(message, args, other) {
        var admin = other[0];
        var bot = other[1];
        var commandName = other[2];
        var guild = await bot.guilds.fetch(args[0]);
        var channels = await guild.channels.cache;
        let sended = await message.channel.send(new Discord.MessageEmbed().setTitle("List of channels").setDescription(channels.map(g => g.name + ":  **" + g.id + "**").join("\n")));
    }
};
