"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require();
const fs = require('fs');
const Discord = require('discord.js');
const minutesToMessage = require('../../constants/functions.js');
module.exports = {
    args: [0],
    name: "daily",
    description: "Collect your daily reward!",
    usage: `${module_1.prefix}daily`,
    perms: [],
    status: 'closed',
    async execute(message, args, other) {
        var admin = other[0];
        var bot = other[1];
        var commandName = other[2];
        var db = admin.firestore();
        var firestore = admin.firestore;
        var money = 0;
        situations = [
            {
                message: function (money) { return `You find $**${money}** in your mailbox. Interesting.`; },
                author: "matttang27#0585"
            },
            {
                message: function (money) { return `You just won a discord giveaway of $**${money}**! Please boost my server :thumbsup:`; },
                author: "matttang27#0585"
            },
            {
                message: function (money) { return `You find a lost pet. The owner gives you $**${money}**`; },
                author: "matttang27#0585"
            },
            {
                message: function (money) { return `You picked up $**${money}** worth of bills on the ground. You don't know who lost it, so you just take it with you.`; },
                author: "matttang27#0585"
            },
            {
                message: function (money) { return `You played League..... you were payed ${money}dollars to delete it`; },
                author: "matttang27#0585"
            },
            {
                message: function (money) { return `You decided to sign up for a science “experiment”... it was to test the COVID-19 vaccine. I mean you made **${money}** dollars. Was it worth it?`; },
                author: "Jelly#1410"
            },
            {
                message: function (money) { return `You and your friends played music outside for fun! You got tipped **${money}** dollars.`; },
                author: "Jelly#1410"
            },
            {
                message: function (money) { return `Someone tried to rob you, but after looking at your wallet, they gave you $**${money}** out of pity.`; },
                author: "Jelly#1410"
            },
            {
                message: function (money) { return `Scholarships gave you **${money}** dollars to keep studying. Pretty good but, is that gonna help my thousands of dollars of debt?`; },
                author: "Jelly#1410"
            },
            {
                message: function (money) { return `Living with friends saves money, so you decided to do that. That thankfully saved you**${money}** dollars!`; },
                author: "Jelly#1410"
            },
            {
                message: function (money) { return `For the experience, you walked down a dark alleyway. Instead of getting mugged, you found a nice new iPhone. Being a smart person you sold it instead of using it.**${money}** dollars for you!`; },
                author: "Jelly#1410"
            },
            {
                message: function (money) { return `You pioneered the broken condom in an effort to help your morning after pill sell better. It worked like a charm, and you reaped **${money}** in profits.`; },
                author: "serotonin#7877"
            },
            {
                message: function (money) { return `You pioneered the broken condom in an effort to help your morning after pill sell better. It worked like a charm, and you reaped **${money}** in profits.`; },
                author: "serotonin#7877"
            },
            {
                message: function (money) { return `{Danganronpa 2} You convince Komaeda Nagito to give you lottery numbers by promising to give him private time with Hinata. You get hit by a car on the way there, but you still win the top prize. That's ${money} in profits after insurance costs. Worth it!`; },
                author: "matttang27#0508"
            },
        ];
        /*var total = 0
        for (let i=0;i<situations.length;i++) {
            total += situations[i].chance
        }*/
        function getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        function getMoney(message) {
            var i = getRndInteger(0, situations.length - 1);
            money = getRndInteger(250, 500);
            const embed = new Discord.MessageEmbed()
                .setColor('#26ff00')
                .setAuthor(`${message.author.username}'s daily event.`, `${message.author.avatarURL()}`)
                .setDescription(situations[i].message(money));
            embed.setFooter(`written by: ${situations[i].author}`);
            message.channel.send(embed);
            return money;
        }
        const userRef = db.collection('users').doc(message.author.id);
        user = await userRef.get();
        var userData = user.data();
        if (!userData) {
            return message.reply(`Create a profile first with ${module_1.prefix}profile !`);
        }
        var p = JSON.parse(fs.readFileSync('players.json'));
        var index = p.players.findIndex(p => p.playerid == message.author.id);
        var player = p.players[index];
        var diff = Date.now() - player.lastdaily;
        if ((diff) / 1000 < module_1.dailycd * 60) {
            var cooldown = module_1.dailycd - Math.floor(diff / 60000);
            return message.channel.send(`Please wait ${minutesToMessage(cooldown)} for your daily event!`);
        }
        else {
            money = getMoney(message);
            p.players[index].lastdaily = Date.now();
            userRef.set({
                money: userData.money + money
            }, { merge: true });
        }
        fs.writeFileSync('players.json', JSON.stringify(p, null, 2));
    }
};
