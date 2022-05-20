<<<<<<< HEAD
const { prefix, ownerID } = require("../../../config.json");
const fs = require('fs');
const Discord = require('discord.js');
const top = require('@top-gg/sdk')
=======
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("../../../config.json");
let { proPrefix } = config;
>>>>>>> 9e79397123384be9c02f670d44438c53f18e283e
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
