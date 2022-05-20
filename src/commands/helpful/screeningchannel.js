<<<<<<< HEAD
const { prefix, token } = require("../../../config.json");
const fs = require('fs');
const Discord = require('discord.js');
const CronJob = require('cron').CronJob;
const { embedError } = require('../../constants/functions.js');

=======
const CronJob = require('cron').CronJob;
>>>>>>> 9e79397123384be9c02f670d44438c53f18e283e
var cronstrue = require('cronstrue');
module.exports = {
    args: [-1],
    name: "screeningchannel",
    description: "Matthew Bot Sends Scheduled Covid Screenings",
    aliases: ["sc"],
    usage: `${prefix}screeningchannel <sub command> <sub args>`,
    perms: [],
    async execute(message, args, other) {
        try {
            var admin = other[0];
            var bot = other[1];
            var commandName = other[2];
            let db = admin.firestore();
            if (args.length == 0 || !["create", "add", "list", "remove"].includes(args[0])) {
                return message.channel.send(new Discord.MessageEmbed().setTitle("m!sc commands").setDescription("**create** - Creates a screening channel (or else Matthew Bot can't send anything)\n\n**list** - Lists all times Matthew Bot sends a covid screen\n\n**add** - Add a time for Matthew Bot to send a covid screen.\n\n**remove** - Removes a time"));
            }
            else if (args[0] == "create") {
                var channels = await message.guild.channels.cache;
                var channel = channels.find(c => c.name == "matthew-bot-screening");
                if (channel) {
                    return message.channel.send("Channel already exists! *Want one right now? Use **m!cvs** !*");
                }
                else {
                    var channel = await message.guild.channels.create('matthew-bot-screening', {
                        type: 'GUILD_TEXT',
                        topic: 'Matthew Bot sends covidoccreens at specific times of the day - m!sc add to add times',
                        permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['SEND_MESSAGES'],
                            }
                        ]
                    });
                    let covids = await db.collection('covidscreening');
                    let covidoc = covids.doc(message.guild.id);
                    covidoc.set({
                        screencrons: ["0 15 8 * * 1-5", "0 45 11 * * 1-5"]
                    });
                    message.channel.send(`Your <#${channel.id}> channel has been created! Please move it to a position you like`);
                }
            }
            else if (args[0] == "add") {
                let content, time, hour, minute;
                const filter = (m) => m.author.id == message.author.id;
                let sended = message.channel.send(new Discord.MessageEmbed().setTitle("Please Enter a valid time (Using 24Hour Time):").setDescription("**Examples:**\n**15:05** - 3:05PM\n**0:35** - 12:35AM").setColor("AQUA"));
                let collected = await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] });
                content = collected.first().content;
                console.log(content);
                time = content.split(":");
                hour = parseInt(time[0]);
                minute = parseInt(time[1]);
                if (hour == NaN || hour > 60 || hour < 0 || minute == NaN || minute > 60 || minute < 0) {
                    return message.channel.send(new Discord.MessageEmbed().setTitle("Could not add time").setDescription(`${content} is not valid time. (Ask matttang27#6574 for help if you don't know why)`));
                }
                sended = message.channel.send(new Discord.MessageEmbed().setTitle("Enter days of the week:").setDescription("**Examples:**\n**0** - Sunday only\n**1,3,4** - Monday, Wednesday, and Thursday\n**1-5** Weekdays (Mon-Fri)").setColor("AQUA"));
                collected = await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] });
                content = collected.first().content;
                console.log(content);
                let days = content;
                let cronstring = `0 ${minute} ${hour} * * ${days}`;
                try {
                    let testcron = new CronJob(cronstring, () => { });
                    let covids = await db.collection('covidscreening');
                    let covidoc = covids.doc(message.guild.id);
                    let covidData = await covidoc.get();
                    covidData = covidData.data();
                    let crons = covidData.screencrons;
                    if (crons.indexOf(cronstring) >= 0) {
                        return message.channel.send(new Discord.MessageEmbed().setTitle("Time already exists.").setDescription("There already exists a scheduled covid screen with this exact time.").setColor("RED"));
                    }
                    else {
                        crons.push(cronstring);
                        covidoc.set({
                            screencrons: crons
                        });
                        bot.reloadCovidSchedule();
                        return message.channel.send(new Discord.MessageEmbed().setTitle("covidoccreening Scheduled succesfully.").setDescription("Your schedule covid screen has been created. You can remove it with m!sc remove").setColor("GREEN"));
                    }
                }
                catch (err) {
                    message.channel.send(embedError(err));
                }
            }
            else if (args[0] == "list") {
                let sended = await message.channel.send(new Discord.MessageEmbed()
                    .setColor('#26abFF')
                    .setTitle("<a:loading:745769231295184959> Loading List... Please be patient."));
                let covids = await db.collection('covidscreening');
                let covidoc = covids.doc(message.guild.id);
                let covidData = await covidoc.get();
                covidData = covidData.data();
                let crons = covidData.screencrons;
                let description = "";
                for (let i in crons) {
                    description += `**${parseInt(i) + 1}.** ${cronstrue.toString(crons[i])}\n`;
                }
                sended.edit(new Discord.MessageEmbed().setColor("GREEN").setTitle("Scheduled covid screens in this server").setDescription(description).setFooter("Remove covid screens with m!sc remove <placement>"));
            }
            else if (args[0] == "remove") {
                let covids = await db.collection('covidscreening');
                let covidoc = covids.doc(message.guild.id);
                let covidData = await covidoc.get();
                covidData = covidData.data();
                let crons = covidData.screencrons;
                if (parseInt(args[1]) - 1 >= crons.length || parseInt(args[1]) - 1 < 0) {
                    return message.channel.send(new Discord.MessageEmbed().setColor("RED").setTitle(`Index selection error`).setDescription(`Index **${args[1]}** is either not a number, or does not have a corresponding covid screen in this server. View the list of scheduled covid screens with **m!sc list**`));
                }
                else {
                    let sended = await message.channel.send("Are you sure you want to remove the covid schedule **" + cronstrue.toString(crons[parseInt(args[1]) - 1]) + "**?\nType **confirm** to proceed.");
                    const filter = (m) => m.author.id == message.author.id;
                    let collected = await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] });
                    if (collected.first().content == "confirm") {
                        crons = crons.splice(parseInt(args[1]) - 1, 1);
                        covidoc.set({
                            screencrons: crons
                        });
                        bot.reloadCovidSchedule();
                        message.channel.send("Covid screening succesfully deleted. ✅");
                    }
                    else {
                        message.channel.send("Cancelled remove command. ❌");
                    }
                }
            }
        }
        catch (err) {
            message.channel.send(embedError(err));
        }
    }
};
