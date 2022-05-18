"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require();
module.exports = {
    args: [1],
    name: "getedits",
    aliases: ["ge", "gedits", "geteds"],
    description: "Get the edits from a specific message",
    usage: `${module_1.prefix}getedits <message ID>`,
    perms: ["MANAGE_MESSAGES", "READ_MESSAGE_HISTORY"],
    async execute(message, args, other) {
        var temp = await message.channel.messages.fetch(args[0]);
        message.reply(temp.edits);
    }
};
