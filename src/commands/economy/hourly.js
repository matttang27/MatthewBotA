"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require();
const fs = require('fs');
const Discord = require('discord.js');
const minutesToMessage = require('../../constants/functions.js');
module.exports = {
    args: [0],
    name: "hourly",
    aliases: ["hr"],
    description: "Become a productive member of society",
    usage: `${module_1.prefix}hourly`,
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
                chance: 20,
                min: -50,
                max: -25,
                message: function (money) { return `You were sucked into a pyramid scheme, and was scammed **${0 - money}** dollars!`; },
                author: "matttang27#0585"
            },
            {
                chance: 20,
                min: -100,
                max: -25,
                message: function (money) { return `You decided to do some nice hard labour way over your capabilities... it costed you **${0 - money}** dollars to fix your spine.`; },
                author: "matttang27#0585"
            },
            {
                chance: 20,
                min: 7,
                max: 12,
                message: function (money) { return `You worked at your local McDonalds. They pay you **${money}** dollars. Wait, isn't that under the minimum wage?`; },
                author: "matttang27#0585"
            },
            {
                chance: 20,
                min: 100,
                max: 200,
                message: function (money) { return `You renovate a house. Inside one of the walls, you discover a line of cameras! Undeterred, you sell all the cameras to a pawn shop for **${money}** dollars!`; },
                author: "matttang27#0585"
            },
            {
                chance: 20,
                min: 50,
                max: 150,
                message: function (money) { return `You work at a maid cafe. One of your fellow maids accidently trips, but you save them from toppling onto a customer. They are so moved that they tip you **${money}** dollars! (But they didn't know this was all staged :smiling_imp: ).`; },
                author: "matttang27#0585"
            },
            {
                chance: 20,
                min: 20,
                max: 80,
                message: function (money) { return `With no expertise, you help design a house. It falls after a bit of wind, but by that time you're already gone with $**${money}**!`; },
                author: "matttang27#0585"
            },
            {
                chance: 20,
                min: -200,
                max: -100,
                message: function (money) { return `Another pay to win game, another **${0 - money}** dollars gone. I mean at least you got dat 5 star hAwT anime gal right?... there is a 6 star? DAMN IT`; },
                author: "Jelly#1410"
            },
            {
                chance: 40,
                min: 0,
                max: 0,
                message: function (money) { return `Wowie, you worked a 9 to 5 job.... just to get robbed. You earned 0 dollars.`; },
                author: "Jelly#1410"
            },
            {
                chance: 20,
                min: 50,
                max: 100,
                message: function (money) { return `Did you drink water?.... that’s another **${money}** dollars. Stay hydrated!`; },
                author: "Jelly#1410"
            },
            {
                chance: 20,
                min: 250,
                max: 350,
                message: function (money) { return `You were on an adventure with a talking backpack and a map, found some gold and said Swiper no swiping quick enough. You earned **${money}** dollars!`; },
                author: "Jelly#1410"
            },
            {
                chance: 20,
                min: -50,
                max: -25,
                message: function (money) { return `You joined a discord server and got mugged. Guess you didn’t use two step verification. You lost **${0 - money}** dollars`; },
                author: "Jelly#1410"
            },
            {
                chance: 20,
                min: -50,
                max: -1,
                message: function (money) { return `You are hired to play piano at a local restaurant. You were counting on taking the money and running before they could learn that you have no musical experience, but your plot falls through because it turns out the manager was planning to make you play all night without paying you. When they catch you trying to sneak off, they give chase - you narrowly escape with your life, but you lose your wallet and the **${0 - money}** inside.`; },
                author: "embermist#7877"
            },
            {
                chance: 20,
                min: 20,
                max: 20,
                message: function (money) { return `You teach children math for a living. On a rainy evening, a little girl shows up on your doorstep, her overalls soaked through. \n\n\"I want to go to school,\" she says. \n\nBewildered, all you can manage is \"this isn't school.\" \n\n\"Yes it is,\" she says, \"I see kids walking in and out with backpacks.\" \n\nYou ask where her parents are. Her eyes widen and she grabs you, bear forgotten. \n\n\"Please don't tell. They can't know I'm here, I just want to go to school.\"\n\nIt started raining twenty minutes ago, there's no way she lives nearby.\n\n\"Come in, you're shivering.\"\n\nShe takes her tea with five spoons of sugar. You ask for her parents' phone number, but she says they don't have one, that she knows you can teach her things and she is willing to learn and that will be that. Her desperation breaks your heart. She must not realize there is a fee involved, and you don't tell her.\n\nThis is how Angie - she won't tell you her last name - arrives under your instruction. She is quick to catch on, but it is clear she has never been to a public school before, cocking her head when you ask her if she knows what whole numbers are (she correctly identified four, six, and nine as whole numbers, except her reasoning was that there were holes in them).\n\nFor two months, she arrives at 7 on Tuesdays and Fridays and leaves promptly at 8:30. You have not managed to glean much from her, but you enjoy her company. Her intuition is strong and she is learning long division before long - what her peers would be doing at public school. She always wears overalls. And holds a teddy bear.\n\nOne evening, she doesn't show. You reason she must be sick, and pay no attention - but at 9:00, there is a rapping on your door. You open it, and nobody is there.\n\nA crisp **20** dollar bill sits on your front porch. Attached is a...receipt? You flip it over, and there is writing.\n\n\"Thank you for teaching me math. You are the best teacher I've ever had. We'll see each other again someday. Wait for me. -A\"`; },
                author: "embermist#7877"
            },
            {
                chance: 20,
                min: 30,
                max: 40,
                message: function (money) { return `Turns out you picked the perfect job for you, testing video games. You got **${money}** dollars!`; },
                author: "Jelly#1410"
            },
            {
                chance: 20,
                min: -100,
                max: -150,
                message: function (money) { return `You thought it would be funny to go to the Area 51 raid. You have no idea what happened, but your wallet filled with **${0 - money}** dollars is now gone.`; },
                author: "Jelly#1410"
            },
            {
                chance: 20,
                min: -20,
                max: -10,
                message: function (money) { return `You were craving some Ramen. So you went to the shop instead of your job. Lost **${0 - money}** dollars (But it was worth it)`; },
                author: "Jelly#1410"
            },
            {
                chance: 20,
                min: 50,
                max: 60,
                message: function (money) { return `You decided to put your lazy self to work and sold hotdogs on the side. You earned **${money}** dollars. I guess it was worth it`; },
                author: "Jelly#1410"
            },
            {
                chance: 20,
                min: 50,
                max: 100,
                message: function (money) { return `The animal shelter you were volunteering at gave you **${money}** dollars for all the time you spent at the location! Good job you wonderful soul!`; },
                author: "Jelly#1410"
            },
            {
                chance: 1,
                min: -100000,
                max: -100000,
                message: function (money) { return `While working as a programmer under the great Matthew Tang, you accidently delete Matthew Bot. You pay $${0 - money} as an apology (ok if you actually get this please dm me I'll give you some money lol)`; },
                author: "matttang27#0508"
            },
            {
                chance: 20,
                min: 100,
                max: 200,
                message: function (money) { return `{TOS} After working hard transporting people, the mafioso fell to his own gun(how that happens I don't even know). The town pays you **${money}** dollars for your heroic deeds. You proceed to die of exhaustion.`; },
                author: "matttang27#0508"
            },
            {
                chance: 20,
                min: 100,
                max: 200,
                message: function (money) { return `{TOS} As a crusader, you figure that shooting someone before they can react is probably more efficient, so you shoot the next person to visit the house your protecting. The snickering mafia give you ${money} dollars.`; },
                author: "matttang27#0508"
            },
            {
                chance: 20,
                min: 100,
                max: 200,
                message: function (money) { return `{TOS} You visit the pirate's house as an escort to steal some nice booty but find even better booty! The pirate pays you $${money}. `; },
                author: "matttang27#0508"
            },
            {
                chance: 20,
                min: 100,
                max: 200,
                message: function (money) { return `{TOS} As the mayor, you enforce taxes on everyone, causing the mafia to go bankrupt and leave the town. You keep **${money}** in profits.`; },
                author: "matttang27#0508"
            },
            {
                chance: 20,
                min: 200,
                max: 300,
                message: function (money) { return `{TOS} You're a vigilante who decided to blindly shoot someone. Somehow, the Pirate dies and you get **${money}** in loot!`; },
                author: "matttang27#0508"
            },
            {
                chance: 20,
                min: 200,
                max: 300,
                message: function (money) { return `{LOL} You decide that killing champions is boring and go farm minions. Sadly you weren't a Nasus, so your nexus falls. However, you escape the arena with **${money}** coins!`; },
                author: "matttang27#0508"
            },
            {
                chance: 20,
                min: 200,
                max: 300,
                message: function (money) { return `{Danganronpa} You convince Yasuhiro to drink bleach by convincing him his fortune telling ability will go up. There's no proof, so you win the Killing Game and get the 10 million dollars! Due to some (spoiler) circumstances, you have to use the money for fire purposes, and only leaves you with **${money}** dollars.`; },
                author: "matttang27#0508"
            },
            {
                chance: 20,
                min: 500,
                max: 500,
                message: function (money) { return `{Danganronpa} You check every single furniture and object, and get a good 500 monocoins!`; },
                author: "matttang27#0508"
            },
            {
                chance: 20,
                min: -100,
                max: -200,
                message: function (money) { return `{Danganronpa} You challenge Celestia Ludenberg to a poker match with 1:100 odds. Even though you only bet $10 in total, you somehow lost ${0 - money} dollars. She shakes her head and says: "My whole life, I believed that there were only two types of luck: good and bad. However your luck is non-existent. How is this possible?"`; },
                author: "matttang27#0508"
            },
            {
                chance: 20,
                min: 100,
                max: 150,
                message: function (money) { return `{Danganronpa} You start a donut shop. Aoi Asahina makes you run out of stock, but you earn ${money} dollars in the process!`; },
                author: "matttang27#0508"
            },
            {
                chance: 20,
                min: -100,
                max: -250,
                message: function (money) { return `{Danganronpa} You sing a duet with Sayaka Maizono. It was amazing, but her fans find your house and destroy it. You're forced to pay ${0 - money} in damages.`; },
                author: "matttang27#0508"
            }
        ];
        var total = 0;
        for (let i = 0; i < situations.length; i++) {
            total += situations[i].chance;
        }
        function getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        function getMoney(message) {
            var situation = Math.floor(Math.random() * total) + 1;
            for (let i = 0; i < situations.length; i++) {
                if (situations[i].chance >= situation) {
                    money = getRndInteger(situations[i].min, situations[i].max);
                    const embed = new Discord.MessageEmbed()
                        .setColor('#7d7d7d')
                        .setAuthor(`${message.author.username} hourly event.`, `${message.author.avatarURL()}`)
                        .setDescription(situations[i].message(money));
                    if (money > 0) {
                        embed.setColor('#26ff00');
                    }
                    else if (money < 0) {
                        embed.setColor('#ff0000');
                    }
                    embed.setFooter(`written by: ${situations[i].author}`);
                    message.channel.send(embed);
                    return money;
                }
                else {
                    situation -= situations[i].chance;
                }
            }
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
        var diff = Date.now() - player.lasthourly;
        if ((diff) / 1000 < module_1.hourlycd * 60) {
            var cooldown = module_1.hourlycd - Math.floor(diff / 60000);
            return message.channel.send(`Please wait ${minutesToMessage(cooldown)} before getting an hourly event`);
        }
        else {
            money = getMoney(message);
            p.players[index].lasthourly = Date.now();
            userRef.set({
                money: userData.money + money
            }, { merge: true });
        }
        fs.writeFileSync('players.json', JSON.stringify(p, null, 2));
    }
};
