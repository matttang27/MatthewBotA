"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require();
module.exports = {
    args: [-1],
    name: "puppet",
    aliases: ["pp", "say"],
    description: "Speak through TosBot!",
    usage: `${module_1.prefix}puppet <message>`,
    example: `${module_1.prefix}puppet HII!`,
    perms: ["MANAGE_MESSAGES"],
    execute(message, args, other) {
        var type = message.channel.type;
        if (message.author.id != module_1.ownerID) {
            if (type == "text") {
                if (!message.member.roles.cache.find(r => r.name == "Puppeteer")) {
                    return;
                }
            }
        }
        if (args.length == 0) {
            return message.reply("You need a message!");
        }
        message.delete();
        if (type == "text") {
            message.channel.send(args.join(' ')).catch(() => {
                message.channel.send("Message cannot be empty.");
            });
        }
        else {
            message.client.users.cache.get(message.author.id).send(args.join(' ')).catch(() => {
                if (type == "text") {
                    message.channel.send("Message cannot be empty.");
                }
                else {
                    message.client.users.cache.get(message.author.id).send("Message cannot be empty.");
                }
            });
        }
        if (type == "text") {
            console.log(`controlled by ${message.author.username} in ${message.channel.name} in ${message.guild.name}`);
        }
        else {
            console.log(`controlled by ${message.author.username} in DMs.`);
        }
    },
};
