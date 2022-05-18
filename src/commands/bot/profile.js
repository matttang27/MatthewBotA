"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions_js_1 = require("../../constants/functions.js");
const module_1 = require();
;
const Discord = require('discord.js');
const fs = require('fs');
module.exports = {
    args: [-1],
    name: "profile",
    aliases: ["statistics", "stat", "stats", "pr"],
    description: "Sees your or someone else's profile.",
    usage: `${module_1.prefix}profile <optional mention>`,
    example: `${module_1.prefix}profile @Matthew`,
    perms: [],
    async execute(message, args, other) {
        var admin = other[0];
        var bot = other[1];
        var commandName = other[2];
        var db = admin.firestore();
        var firestore = admin.firestore;
        function createEmbed(user, userData) {
            if (!userData.rpswon / userData.rpsplayed) {
                var winrate = 0;
            }
            else {
                var winrate = Math.round((userData.rpswon / userData.rpsplayed) * 100);
            }
            var embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Profile of ${user.username}`)
                .setDescription(`**Balance**: $${userData.money}\n**Age**: ${(Math.floor((Date.now() - userData.timeCreated.toDate()) / 86400000))} days`)
                .setTimestamp()
                .setFooter(`Matthew Bot Profile`);
            if (user.displayAvatarURL()) {
                embed.setThumbnail(`${user.displayAvatarURL()}`);
            }
            return embed;
        }
        //start here
        var db = other[0].firestore();
        var firestore = other[0].firestore;
        var userNum = message.author.id;
        var target = args[0];
        if (args.length >= 1) {
            var member = (0, functions_js_1.findMember)(message, args);
            var guildlist = bot.guilds.cache.array();
            for (let i = 0; i < guildlist.length; i++) {
                if (guildlist[i].members.fetch(member) != undefined) {
                    member = await bot.users.fetch(member);
                    break;
                }
            }
            if (!member) {
                return message.reply("Could not find this user in any of Matthew Bot's Servers.");
            }
            const userRef = db.collection('users').doc(member.user.id);
            user = await userRef.get();
            var userData = user.data();
            if (!userData) {
                return message.reply("Sorry, that person hasn't created a profile yet.");
            }
            user = await bot.users.fetch(target);
            return message.channel.send(createEmbed(user, userData));
        }
        else {
            const userRef = db.collection('users').doc(userNum);
            var user = await userRef.get();
            var userData = user.data();
            //if author doesn't have a profile, create one and send an empty profile
            if (!user.exists) {
                message.reply("Creating profile...");
                const setUser = await db.collection('users').doc(message.author.id).set((0, functions_js_1.newProfile)(firestore))
                    .catch((err) => console.log(err));
                var p = JSON.parse(fs.readFileSync('players.json'));
                p.players[p.players.length] = {
                    "playerid": message.author.id,
                    "lastwork": 0,
                    "lastdaily": 0,
                    "lastweekly": 0
                };
                fs.writeFileSync('players.json', JSON.stringify(p, null, 2));
                embed = createEmbed(message.author, userData);
                return message.channel.send(embed);
            }
            else {
                user = await other[1].users.fetch(userNum);
                message.channel.send(createEmbed(user, userData));
            }
        }
    },
};
