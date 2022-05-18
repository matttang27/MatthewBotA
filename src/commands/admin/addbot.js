"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("../../../config.json");
let { proPrefix } = config;
module.exports = {
    args: [-1],
    name: "addbot",
    description: "MatthewBot provides the authorization link :D. Uses the top.gg API",
    usage: `${proPrefix[0]}addbot <Bot name>`,
    perms: ["MATTHEW"],
    status: "wip",
    async execute(message, args, other) {
        var admin = other[0];
        var bot = other[1];
        var commandName = other[2];
    }
};
