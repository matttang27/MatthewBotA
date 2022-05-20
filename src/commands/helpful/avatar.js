<<<<<<< HEAD
const { prefix, token } = require("../../../config.json");
const fs = require('fs');
const Discord = require('discord.js');
const {findMember} = require("../../constants/functions.js");

=======
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
const config_json_1 = require("../../../config.json");
const functions_js_1 = require("../../constants/functions.js");
>>>>>>> 9e79397123384be9c02f670d44438c53f18e283e
module.exports = {
    args: [0, 1, 2, 3],
    name: "avatar",
    description: "Sends avatar",
    usage: `${config_json_1.proPrefix}avatar (user) (format) (size)`,
    perms: [],
    async execute(message, args, other) {
        var admin = other[0];
        var bot = other[1];
        var commandName = other[2];
        let user;
        if (args.length == 0) {
            user = message.author;
        }
        if (args.length == 1) {
            user = await (0, functions_js_1.findMember)(message, args[0]);
        }
        if (args.length > 1) {
            if (["webp", "png", "jpg", "jpeg", "gif"].indexOf(args[1]) == -1) {
                var embed = new discord_js_1.default.MessageEmbed()
                    .setColor("#FF0000")
                    .setTitle("Avatar Image Format Fail")
                    .setDescription(`"${args[1]}" is not one of the available image formats: webp, png, jpg, jpeg, gif`);
                return message.channel.send(embed);
            }
        }
        if (args.length > 2) {
            if (['16', '32', '64', '128', '256', '512', '1024', '2048', '4096'].indexOf(args[2]) == -1) {
                var embed = new discord_js_1.default.MessageEmbed()
                    .setColor("#FF0000")
                    .setTitle("Avatar Image Size Fail")
                    .setDescription(`"${args[2]} is not one of the available image sizes: 16, 32, 64, 128, 256, 512, 1024, 2048, 4096`);
                return message.channel.send(embed);
            }
        }
        message.channel.send(user.displayAvatarURL({ format: args.length > 1 ? args[1] : "jpg", size: args.length == 2 ? args[2] : 1024 }));
    }
};
