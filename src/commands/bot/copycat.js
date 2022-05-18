"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require();
module.exports = {
    args: [-1],
    name: "copycat",
    aliases: ["copy", "cc"],
    description: "Copycat!",
    usage: `${module_1.prefix}copycat <message>`,
    example: `${module_1.prefix}copycat HII!`,
    perms: [],
    execute(message, args, other) {
        message.channel.send(args.join(' ')).catch(() => {
            message.channel.send("Message cannot be empty.");
        });
    },
};
