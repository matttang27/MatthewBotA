"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require();
module.exports = {
    args: [0, 1],
    name: "setup",
    aliases: ["createchannels", "setupchannels"],
    description: "Creates the channels and roles for a Town of Salem game",
    usage: `${module_1.prefix}create <optional game num>`,
    perms: ["MATTHEW"],
    status: 'closed',
    async execute(message, args, other) {
        //part 1: find a game number that does not exist in the guild
        var roles = ['gamemaster', 'alive', 'dead'];
        var colors = [16580705, "GREEN", "GREY"];
        var names = ["town", "dead", "voting", "history", "graveyard", "other", "mafia", "coven", "vampire"];
        var counter = 1;
        let channel;
        //finds a "game-counter" that does not exist, and creates one
        while (true) {
            let category = message.guild.channels.cache.find(c => c.name == `game-${counter}` && c.type == "category");
            console.log(!category);
            if (!category)
                break;
            counter++;
            console.log(counter);
        }
        function createRoles(message, roles, colors, names, counter) {
            for (let i = 0; i < roles.length; i++) {
                message.member.guild.roles.create({
                    data: {
                        name: `${roles[i]}-${counter}`,
                        color: colors[i]
                    }
                });
            }
        }
        //part two: create channels
        //creates the channel category
        function createChannels(message, roles, colors, names, counter) {
            message.guild.channels.create(`game-${counter}`, { type: "category" });
            for (let i = 0; i < names.length; i++) {
                message.guild.channels.create(`${names[i]}-${counter}`)
                    .then(channel => {
                    let category = message.guild.channels.cache.find(c => c.name == `game-${counter}` && c.type == "category");
                    if (!category)
                        throw new Error("Category channel does not exist");
                    channel.setParent(category.id);
                }).catch(console.error);
            }
        }
        //we did it!
        //＼(＾O＾)／
        if (args.length == 1) {
            counter = args[0];
        }
        await createRoles(message, roles, colors, names, counter);
        await createChannels(message, roles, colors, names, counter);
        let sent = await message.reply(`Created game-${counter}. I can't program so please use ${module_1.prefix}setperms for the next step. Thanks!`);
    }
};
