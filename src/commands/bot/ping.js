<<<<<<< HEAD
const { prefix, token } = require("../../../config.json");
=======
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require();
>>>>>>> 9e79397123384be9c02f670d44438c53f18e283e
module.exports = {
    args: [0],
    name: "ping",
    category: "bot",
    aliases: ["pong", "latency", "lag"],
    description: "Ping me!",
    usage: `${module_1.prefix}ping`,
    perms: [],
    execute(message, args, other) {
        var ping = Date.now() - message.createdAt;
        if (other[2] == "ping") {
            var added = ":ping_pong: Pong! ";
        }
        else if (other[2] == "pong") {
            var added = ":ping_pong: Ping! ";
        }
        else {
            var added = "Ping: ";
        }
        message.channel.send(added + `\`${ping}ms\``);
    },
};
function msToTime(ms) {
    days = Math.floor(ms / 86400000);
    daysms = ms % 86400000;
    ;
    hours = Math.floor(daysms / 3600000);
    ;
    hoursms = ms % 3600000;
    minutes = Math.floor(hoursms / 60000);
    ;
    minutesms = ms % 60000;
    sec = Math.floor(minutesms / 1000);
    let str = "";
    if (days)
        str = str + days + "d";
    if (hours)
        str = str + hours + "h";
    if (minutes)
        str = str + minutes + "m";
    if (sec)
        str = str + sec + "s";
    return str;
}
