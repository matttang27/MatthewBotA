require('better-module-alias')(__dirname)

let time = Date.now();

function timePast() {
  return (Date.now() - time) / 1000 + "s";
}

console.log("Starting code... " + timePast());

process.addListener("uncaughtException", error => {
  console.error("UncaughtException:", error.stack || error);
  process.exit(1);
});

process.addListener("unhandledRejection", (reason, p) => {
  console.warn("UnhandledRejection:", p);
});

process.addListener("warning", warning => {
  console.warn("ProcessWarn:", warning.message, "\n", warning.stack); // Print the warning message // Print the stack trace
});
console.log("Added things-went-wrong listeners " + timePast())
import fs = require("fs");
console.log("imported fs " + timePast());
import Discord = require("discord.js");

console.log("imported discord " + timePast());
import https = require("https");
console.log("imported https " + timePast());
let allIntents = new Discord.Intents(32768);
var bot = new Discord.Client({intents: allIntents});
console.log("created bot instance " + timePast());
console.log("imported compress_images" + timePast());
import cron = require("cron"); 
console.log("imported cron" + timePast());
require("console-error");
require("console-info");
require("console-warn");
console.log("console error,info,warn" + timePast());

import fetch = require('node-fetch');


import { changeStatus } from "./src/constants/functions.js";
bot["commands"] = new Discord.Collection();
bot["rpgcommands"] = new Discord.Collection();

require("dotenv").config();

const config = JSON.parse(fs.readFileSync("./config.json").toString())
let token;
let prefix: string;
let rpgprefix: string;
if (config.production) {
  token = process.env["token"]
  prefix = config.proPrefix[0]
  rpgprefix = config.proPrefix[1]
  config.prefix = config.proPrefix[0]
  config.rpgprefix = config.proPrefix[1]
}
else {
  token = process.env["othertoken"]
  prefix = config.devPrefix[0]
  rpgprefix = config.devPrefix[1]
  config.prefix = config.devPrefix[0]
  config.rpgprefix = config.devPrefix[1]
}
fs.writeFileSync("./config.json",JSON.stringify(config, null, 2))


const rpgkey = process.env["rpgkey"];
const firebasekey = process.env["firebasekey"];

if (token == "") {
  console.log("You're missing a token!");
}
console.log("imported functions " + timePast());
var startTime = new Date().toISOString().substring(2);

function filelog(str) {}

function fulllog(str) {
  console.log(str);
  filelog(str);
}

bot["games"] = {};

let praise = ["nice", "good", "amazing", "godly", "legend", "legendary"];

const commandFiles = fs.readdirSync("./src/commands");

const commandFolders = commandFiles.filter((file) => !file.endsWith(".js"));

const commands = {};
var folderFind = {};
for (const folder of commandFolders) {
  commands[folder] = fs.readdirSync("./src/commands/" + folder);
  for (const file of commands[folder]) {
    let command = require(`./src/commands/${folder}/${file}`);
    bot["commands"].set(command.name, command);
    folderFind[command.name] = folder;
    console.log(`set ${command.name} command ` + timePast());
  }
}

bot["commandlist"] = commands;

console.log("set bot commands " + timePast());
//import rpgcommands
const rpgcommandFiles = fs
  .readdirSync("./src/rpg/rpgcommands")
  .filter((file) => file.endsWith(".js"));

for (const file of rpgcommandFiles) {
  const command = require(`./src/rpg/rpgcommands/${file}`);

  // set a new item in the Collection
  // with name : command module
  bot["rpgcommands"].set(command.name, command);
  console.log(`set ${command.name} command ` + timePast());
}
console.log("set rpg commands " + timePast());
//import Firebase stuff

import admin = require("firebase-admin/app");
import storage = require('firebase-admin/storage');
import firestore = require('firebase-admin/firestore');
const { initializeApp, applicationDefault, cert } = admin
const { getFirestore, Timestamp, FieldValue } = firestore
const { getStorage } = storage
console.log("imported firebase-admin" + timePast());

let serviceAccount = require("./servicekey.json");

let rpgserviceAccount = require("./src/rpg/rpgservicekey.json");
rpgserviceAccount.private_key = rpgkey.replace(/\\n/g, "\n");
serviceAccount.private_key = firebasekey.replace(/\\n/g, "\n");

initializeApp({
  credential: admin.cert(serviceAccount),
  storageBucket: "tosbot.appspot.com",
});

initializeApp(
  {
    credential: admin.cert(rpgserviceAccount),
  },
  "rpg"
);
let db = getFirestore();
console.log("initialized firebase " + timePast());

//discord
let humantraffickingicon;
bot.on("ready", () => {
  fulllog("Bot Ready at " + new Date().toString());
  if (config.production) {
    humantraffickingicon = setInterval(() => nameChange(), 700000);
    covidScheduleSetup();
    
    console.log("synced Emotes " + timePast());
    bot["countDown"] = countDown()
    fulllog("Countdown setup at " + new Date().toString())
  }
  syncEmotes();
  changeStatus(bot);
  
  fulllog("Changing status at " + new Date().toString());
  
	
  
});

bot.on("messageDelete", async (message) => {});

bot.on("messageUpdate", async (oldMessage, newMessage) => {});

bot.on("messageCreated", async message => {
  return message.channel.send("HI");
})
bot.on("messageCreate", async message => {
  {
    //no bot replies

    if (message.author.bot && message.author.id != bot.user.id) {
      return;
    }

    if (message.channel.type == "DM") {
      
      if (
        message.author.id == bot.user.id &&
        !message.content.startsWith(prefix)
      ) {
        return;
      }
      let matthewGuild = await bot.guilds.fetch("720351714791915520");
      let channel = await matthewGuild.channels.cache
      .find(
        (c) => c.name == message.author.id
      ) as Discord.TextChannel;

      if (!channel) {
        channel = await matthewGuild.channels.create(message.author.id);
        var category = await matthewGuild.channels.cache.find(
          (c) => c.name == "DM" && c.type == "GUILD_CATEGORY"
        );
        channel.setParent(category.id);

        var alias = [];
        var guilds = [];
        var guildlist = Array.from(bot.guilds.cache);
        for (let i = 0; i < guildlist.length; i++) {
          var g = guildlist[i];
          try {
            var m = await g[1].members.fetch(message.author.id);
            alias.push(m.nickname);
            guilds.push(g[1].name);
          } catch {}
        }

        var embed = new Discord.MessageEmbed()
          .setColor("#00FF00")
          .setTitle(message.author.username)
          .setDescription(message.author.tag)
          .addField(
            "a.k.a",
            alias.join(",").length > 0 ? alias.join(",") : "None."
          )
          .addField(
            "In Guilds: ",
            guilds.join(",").length > 0 ? guilds.join(",") : "None."
          )
          .setImage(message.author.displayAvatarURL.toString());
        var sended = await channel.send({ embeds: [embed]});
        sended.pin();
      }

      try {
        channel.send(message.content);
      } catch (err) {
        fulllog(err + message.content);
      }
    }

    // EDWARD STALKING:
    if (message.author.id == "351132323405889537" && message.channel.type != "DM") {
      let edwardRef = db.collection("extra").doc("edward");
      let eGet = await edwardRef.get();
      let e = eGet.data();
      e.totalM = e.totalM + 1;
      var d = new Date();
      d.setTime(d.getTime() - 240 * 60 * 1000);
      const h = e["history"];
      if (h[d.getFullYear()] == undefined) {
        h[d.getFullYear()] = {};
      }
      if (h[d.getFullYear()][d.getMonth()] == undefined) {
        h[d.getFullYear()][d.getMonth()] = {};
      }
      if (h[d.getFullYear()][d.getMonth()][d.getDate()] == undefined) {
        h[d.getFullYear()][d.getMonth()][d.getDate()] = {};
      }
      if (
        h[d.getFullYear()][d.getMonth()][d.getDate()][d.getHours()] == undefined
      ) {
        h[d.getFullYear()][d.getMonth()][d.getDate()][d.getHours()] = {};
      }
      if (
        h[d.getFullYear()][d.getMonth()][d.getDate()][d.getHours()][
          d.getMinutes()
        ] == undefined
      ) {
        h[d.getFullYear()][d.getMonth()][d.getDate()][d.getHours()][
          d.getMinutes()
        ] = [];
      }
      h[d.getFullYear()][d.getMonth()][d.getDate()][d.getHours()][
        d.getMinutes()
      ].unshift({
        epoch: d.getTime() + 240 * 60 * 1000,
        type: "m",
        guild: message.guild.name,
        channel: message.channel.name,
      });
      e["history"] = h;
      edwardRef.set(e);
    }

    var type = "";

    //checks if message starts with the prefix for commands, and if the message was sent by a bot

    //ping response
    var temp = message.content.toLowerCase();
    var pingers = [
      "Sup.",
      "Please just stop man",
      "Stop pinging me",
      "I'm blocking you.",
      "Just let me sleep",
      "Someone kill me",
      "I'm here wassup",
      "._.",
      ".-.",
      "-_-",
      "-___-",
    ];
    if (message.content.includes("720466960118186015")) {
      message.channel.send(pingers[Math.floor(Math.random() * pingers.length)]);
    }

    
  

}});

let ignore = ["576031405037977600"];

bot.on("messageReactionAdd", async function (reaction, user) {
  try {
    if (user.bot) {
      return;
    }

    if (!(reaction.emoji instanceof Discord.GuildEmoji)) {
      return;
    }
    if (reaction.emoji.guild.id != reaction.message.guild.id) {
      return;
    }
    let guildRef = db.collection("reactions").doc(reaction.message.guild.id);
    let rGet = await guildRef.get();
    let r: { [x: string]: any; reactions?: any; users?: any; };
    if (rGet.exists) {
      r = rGet.data();
    } else {
      r = { reactions: {}, users: {} };
    }

    var e = reaction.emoji;
    var u = user;
    if (e.id in r.reactions) {
      r.reactions[e.id].count++;
    } else {
      r.reactions[e.id] = {};
      r.reactions[e.id]["name"] = e.name;
      r.reactions[e.id]["count"] = 1;
      r.reactions[e.id]["users"] = {};
    }
    if (u.id in r.reactions[e.id].users) {
      r.reactions[e.id].users[u.id]++;
    } else {
      r.reactions[e.id].users[u.id] = 1;
    }

    if (u.id in r.users) {
      r.users[u.id].count++;
    } else {
      r.users[u.id] = {};
      r.users[u.id]["name"] = u.username;
      r.users[u.id]["count"] = 1;
      r.users[u.id]["reactions"] = {};
    }
    if (e.id in r.users[u.id].reactions) {
      r.users[u.id].reactions[e.id]++;
    } else {
      r.users[u.id].reactions[e.id] = 1;
    }
    guildRef.set(r);
  } catch (err) {
    console.log(err);
  }
});
bot.on("guildMemberAdd", async (member) => {
  filelog(member);
  if (member.guild.id == "757770623450611784") {
    var channel = await member.guild.channels.cache.find(
      (c) => c.id == "843735245399785482"
    ) as Discord.TextChannel;
    var sended = await channel.send("<@" + member.id + ">");
    sended.delete();
  }
  if (member.guild.id == "836780126741332009") {
    var roles = await member.guild.roles.cache;
    var origin = await bot.guilds.fetch("757770623450611784");
    var anchor = await origin.members.fetch(member.id);
    var oldroles = await anchor.roles.cache;
    oldroles.each((r) => {
      member.roles.add(roles.find((oldrole) => oldrole.name == r.name));
    });
  }
});
bot.on("raw", async (packet) => {
  if (
    packet.t == "TYPING_START" ||
    packet.t == "MESSAGE_CREATE" ||
    packet.t == "MESSAGE_REACTION_REMOVE"
  ) {
    return;
  }
  filelog(packet);
  if (packet.t != "MESSAGE_REACTION_ADD") {
    return;
  }
  var guild = await bot.guilds.fetch(packet.d.guild_id);
  var member = await guild.members.fetch(packet.d.user_id);
  //ignore if bot
  if (member.user.bot) {
    return;
  }

  let channel = await guild.channels.cache.get(packet.d.channel_id);
  if (!channel.isText()) {
    return
  }

  //if channel message is already cached no need to call twice
  //it'll be detected by messageReactionAdd anyways
  if (channel.messages.cache.has(packet.d.message_id)) return;
  var message = await channel.messages.fetch(packet.d.message_id);
  //Emojis can have identifiers of name:id format, so we have to account for that case as well
  const emoji = packet.d.emoji.id ? packet.d.emoji.id : packet.d.emoji.name;
  //This gives us the reaction we need to emit the event properly, in top of the message object
  let reaction = await message.reactions.cache.get(emoji);
  //Adds the currently reacting user to the reaction's users collection.
  //if (reaction) reaction["users"] = (packet.d.user_id, member.user);

  bot.emit("messageReactionAdd", reaction, member.user);
});
//stalker time!

bot.on("presenceUpdate", async function (oldMember, newMember) {
  var status;
  if (!oldMember) {
    status = "offline";
  } else {
    status = oldMember.status;
  }
  351132323405889537;
  if (newMember.user.id == "351132323405889537") {
    if (newMember.guild.id == "712382129673338991") {
      var channel = await newMember.guild.channels.cache.find(
        (c) => c.name == "dead-chat"
      );
      if (!channel || !channel.isText()) {
        return;
      }
      let edwardRef = db.collection("extra").doc("edward");
      let e = await edwardRef.get();
      let eData = e.data();
      if (
        !(
          (newMember.status != "offline" && status == "offline") ||
          newMember.status == "offline"
        )
      ) {
        return;
      }
      channel
        .send(
          newMember.status != "offline" && status == "offline"
            ? "Edward has gone on!"
            : newMember.status == "offline"
            ? "Edward has gone off."
            : ""
        )
        .catch((err) => {
          console.log(err);
          return;
        });
      eData.status = "online";
      if (newMember.status != "offline" && status == "offline") {
        eData.totalA = eData.totalA + 1;
      }
      var d = new Date();
      d.setTime(d.getTime() - 240 * 60 * 1000);
      let h = e["history"];
      if (h[d.getFullYear()] == undefined) {
        h[d.getFullYear()] = {};
      }
      if (h[d.getFullYear()][d.getMonth()] == undefined) {
        h[d.getFullYear()][d.getMonth()] = {};
      }
      if (h[d.getFullYear()][d.getMonth()][d.getDate()] == undefined) {
        h[d.getFullYear()][d.getMonth()][d.getDate()] = {};
      }
      if (
        h[d.getFullYear()][d.getMonth()][d.getDate()][d.getHours()] == undefined
      ) {
        h[d.getFullYear()][d.getMonth()][d.getDate()][d.getHours()] = {};
      }
      if (
        h[d.getFullYear()][d.getMonth()][d.getDate()][d.getHours()][
          d.getMinutes()
        ] == undefined
      ) {
        h[d.getFullYear()][d.getMonth()][d.getDate()][d.getHours()][
          d.getMinutes()
        ] = [];
      }
      h[d.getFullYear()][d.getMonth()][d.getDate()][d.getHours()][
        d.getMinutes()
      ].unshift({
        epoch: d.getTime() + 240 * 60 * 1000,
        type: "a",
        data:
          newMember.status != "offline" && status == "offline" ? "on" : "off",
      });
      eData["history"] = h;
      edwardRef.set(e);
      return;
    }
  }

  //bot & ignore detector
  if (newMember.user.bot) {
    return;
  }

  var username = newMember.user.username;

  if (newMember.member.nickname) {
    username = newMember.member.nickname;
  }
  var channel = await newMember.guild.channels.cache.find(
    (c) => c.name == "matthew-sees-you"
  );
  if (!channel || !channel.isText()) {
    return;
  }
  if (newMember.status != "offline" && status == "offline") {
    if (!ignore.includes(newMember.user.id) && channel && channel.isText()) {
      channel.send(`${username} *I see you* :eyes:`);
    }

    console.log(
      `\n${username} from ${newMember.guild.name} has gone online.\n`
    );
  } else if (newMember.status == "offline") {
    if (!ignore.includes(newMember.user.id) && channel) {
      channel.send(`*${username} where are you hiding*? :dagger:`);
    }
    console.log(`\n${username} from ${newMember.guild.name} has gone off.\n`);
  }
});

bot.on("guildCreate", async function (guild) {
  console.log(`Joined guild ${guild.name}`);
  let channel = guild.channels.cache.find((channel) =>channel.permissionsFor(guild.me).has("SEND_MESSAGES") && channel.type == "GUILD_TEXT") as Discord.TextChannel;
  let embed = new Discord.MessageEmbed()
  .setTitle("Matthew Bot, at your service!")
  .setDescription(
    "I'm  Matthew Bot, here to make this server a ~~better~~ exciting place!\n\nHere's the important commands you should probably know.\n\n**m!help** - The help function, get a list of all commands or see a specific command\n**m!cvs** - Gets a covid screening :eyes:\n**m!wordgame - three matthewbot wordgames for the family!"
  )
  .setFooter(
    "I currently have every single permission bar admin, feel free to remove some :D"
  )
  await channel.send(
    {embeds: [embed]}
  );
  await channel.send("Hi! I'm Matthew Bot, at your service!");
  await channel.send(
    "I have a bunch of commands that you can see with **m!help**, and if you have any questions you can add my discord with **m!support**"
  );
});

bot.on("rateLimit", (info) => {
  console.log(
    `Rate limit hit ${
      info.timeout
        ? info.timeout
        : "Unknown timeout "
    }`
  );
});
//serverstuff

bot.on("roleCreate", async function (r) {
  if (r.guild.id == "757770623450611784") {
    var server2 = await bot.guilds.fetch("836780126741332009");
    server2.roles.create({
        name: r.name,
        color: r.color,
        hoist: r.hoist,
        mentionable: r.mentionable,
        permissions: r.permissions,
      
    });
  }
});

bot.on("roleDelete", async function (r) {
  if (r.guild.id == "757770623450611784") {
    var server2 = await bot.guilds.fetch("836780126741332009");
    var roles = await server2.roles.cache;
    var role = roles.find((role) => role.name == r.name);
    role.delete();
  }
});

bot.on("roleUpdate", async function (oldRole, newRole) {
  if (oldRole.guild.id == "757770623450611784") {
    console.log("Cult roleUpdate");
    var server2 = await bot.guilds.fetch("836780126741332009");
    var roles = await server2.roles.cache;
    var role = await roles.find((role) => role.name == oldRole.name);
    role.setColor(newRole.color);
    role.setHoist(newRole.hoist);
    role.setMentionable(newRole.mentionable);
    role.setName(newRole.name);
    role.setPermissions(newRole.permissions);
    role.setPosition(newRole.rawPosition);
  }
});

import express = require("express");
import bodyParser = require("body-parser");
import internal = require("stream");
console.log("imported express, body-parser  " + timePast());

const router = express.Router();
const server = express();

server.use(bodyParser.json());
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

server.use(express.static("website"));
server.get("/", (req, res) => {
  res.send("Hello World!");
});
server.all("/", (req, res) => {
  res.sendFile(__dirname + "/website/index.html");
});

function keepAlive() {
  server.listen(3000, () => {
    console.log("Server is Ready at " + new Date().toString());
  });
}

keepAlive();
console.log("bot login");
bot.login(token).then(async () => {

  let matthew = await bot.users.fetch("576031405037977600");
  matthew.send("Bot started!");

  console.log("Setup finished at " + timePast());
});

async function nameChange() {
  const dirs = fs.readdirSync("./amongus");
  try {
    var guild = await bot.guilds.fetch("757770623450611784");
  } catch (e) {
    console.error(e);
    return;
  }

  var names = [
    "Cult.",
    "Needs A New Name Cult",
    "NOT A Black Marketing Cult",
    "Never Plays Among Us Cult",
    "Matthew Cult?",
    "Organ Collector Cult",
    "Mai Sakurajima Cult",
    "Tetris Cult",
    "Human Trafficking Cult",
  ];

  var name = names[Math.floor(Math.random() * names.length)];
  var icon = dirs[Math.floor(Math.random() * dirs.length)];
  await guild.setIcon(`./amongus/${icon}`);
  await guild.setName(name).catch((error) => {
    console.error(error);
  });
  console.log(`Cult Server Name: ${name} Icon: ${icon}`);
  return;
}

async function syncEmotes() {
  let e = JSON.parse(fs.readFileSync(require.resolve("@constants/serveremotes.json")).toString());
  let emojiCache = await bot.emojis.cache;
  let emojis = Array.from(emojiCache);
  for (let i = 0; i < emojis.length; i++) {
    e[emojis[i][1].name] = emojis[i][1].id;
  }
  fs.writeFileSync(require.resolve("@constants/serveremotes.json"), JSON.stringify(e, null, 2));
}

async function botUpdates(message) {
  let guilds = await bot.guilds.cache;
  guilds.forEach(async (g) => {
    if (g.id == "720351714791915520") {
      return;
    }
    let channels = await g.channels.cache;
    const channel = await channels.find((c) => c.name == "matthew-bot-updates") as Discord.TextChannel;
    if (channel) {
      channel.send(message).catch();
    }
  });
}
function sendCovid(i) {
  console.log("sending covid screen");
  console.log(bot["covidtimes"]);
  let guilds = bot["covidtimes"][i];
  var bucket = getStorage().bucket();
  var content;
  var screenie = bucket.file("screenie.png");

  const localFilename = "./assets/screenie.png";
  let a = fs.createWriteStream(localFilename);
  screenie
    .createReadStream()
    .on("error", function (err) {})
    .on("response", function (response) {
      // Server connected and responded with the specified status and headers.
    })
    .on("end", function () {
      // The file is fully downloaded.
    })
    .pipe(a);
  a.on("finish", async () => {
    guilds.forEach(async (guildid) => {
      let guild = await bot.guilds.fetch(guildid);
      let channels = await guild.channels.cache;
      let channel = channels.find((c) => c.name == "matthew-bot-screening");
      if (channel && channel.isText()) {
        
        channel.send("Your daily scheduled covid screening :D");
        channel.send({ files: ["./assets/screenie.png"] });
      }
    });
  });
}

async function covidScheduleSetup() {
  `
  tempguilds = await bot.guilds.cache
  tempguilds = tempguilds.map(g => g.id)
  var job1 = new CronJob('0 15 8 * * 1-5', () => {sendCovid(tempguilds)}, null, true, 'America/New_York');
  var job2 = new CronJob('0 45 11 * * 1-5', () => {sendCovid(tempguilds)}, null, true, 'America/New_York');
  job1.start();
  job2.start();
  `;
  bot["reloadCovidSchedule"] = async function () {
    console.log("reloading Covid Schedule");
    var covidRef = await db.collection("covidscreening");
    const times = {};
    let snap = await covidRef.get();
    snap.forEach((guild) => {
      let data = guild.data();
      let crons = data.screencrons;
      for (const i of crons) {
        times[i] ? times[i].push(guild.id) : (times[i] = [guild.id]);
      }
    });
    bot["covidtimes"] = times;
    console.log(bot["covidtimes"]);
    bot["covidCrons"] = [];
    let counter = 0;
    for (const i in bot["covidtimes"]) {
      let p = i;
      console.log(bot["covidtimes"][p]);
      bot["covidCrons"].push(
        new cron.CronJob(
          p,
          () => {
            sendCovid(p);
          },
          null,
          true,
          "America/New_York"
        )
      );
      bot["covidCrons"][counter].start();
      counter++;
    }
    console.log("Covid schedule reloaded " + timePast());
  };
  bot["reloadCovidSchedule"]();
}

async function countDown() {
	console.log("HI")
	let cronJobs = []
	let eCompany = await bot.guilds.fetch("712382129673338991")

	let general = await eCompany.channels.cache.find(c => c.id == "716336274591580190") as Discord.TextChannel
	let hourly = new cron.CronJob(
		"0 30 * * * *",
		async () => {
			let timeleft;
			timeleft = (+new Date('April 28, 2022 12:30:00') - +Date.now())
			let hours = Math.ceil(timeleft / 3600000);
			

			let embed = new Discord.MessageEmbed()
			if (hours > 0) {
				embed.setTitle(`${hours} Hours Left.`).setColor("#FF0000")
				general.send({ embeds: [embed]});
			}
			else if (hours == 0) {

				embed.setTitle(`The exam begins.`)
				general.send({ embeds: [embed]});
			}
			

		},
		null,
		true,
		"America/New_York"
	).start();
	cronJobs.push(hourly)

	let minuteTimes = [0, 15, 20, 25, 26, 27, 28, 29]
	for (let minute of minuteTimes) {
		let newCron = new cron.CronJob(`0 ${minute} 8 28 * *`, async () => {
			let embed = new Discord.MessageEmbed()
			embed.setTitle(`${30-minute} minutes left.`)
			embed.setColor("#FF0000")
			general.send({ embeds: [embed]})
		},
			null,
			true,
			"America/New_York"
		).start()
		cronJobs.push(newCron)
		

	}
	return cronJobs
}