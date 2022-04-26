var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var time = Date.now();
function timePast() {
    return (Date.now() - time) / 1000 + "s";
}
console.log("Starting code... " + timePast());
process.addListener("uncaughtException", function (error) {
    console.error("UncaughtException:", error.stack || error);
    process.exit(1);
});
process.addListener("unhandledRejection", function (reason, p) {
    console.warn("UnhandledRejection:", p);
});
process.addListener("warning", function (warning) {
    console.warn("ProcessWarn:", warning.message, "\n", warning.stack); // Print the warning message // Print the stack trace
});
console.log("Added things-went-wrong listeners " + timePast());
var fs = require("fs");
console.log("imported fs " + timePast());
var Discord = require("discord.js");
console.log("imported discord " + timePast());
var https = require("https");
console.log("imported https " + timePast());
var bot = new Discord.Client();
console.log("created bot instance " + timePast());
var disbut = require("discord-buttons")(bot);
console.log("imported discord-buttons" + timePast());
var compress_images = require("compress-images");
console.log("imported compress_images" + timePast());
var CronJob = require("cron").CronJob;
console.log("imported cron" + timePast());
require("console-error");
require("console-info");
require("console-warn");
console.log("console error,info,warn" + timePast());
//test: rewrite discord message send
var _a = require("./config.json"), prefix = _a.prefix, ownerID = _a.ownerID, rpgprefix = _a.rpgprefix;
bot.commands = new Discord.Collection();
bot.rpgcommands = new Discord.Collection();
require("dotenv").config();
var token = process.env["token"];
var othertoken = process.env["othertoken"];
var rpgkey = process.env["rpgkey"];
var firebasekey = process.env["firebasekey"];
if (token == "") {
    console.log("You're missing a token!");
}
var _b = require("./functions"), changeStatus = _b.changeStatus, cleanup = _b.cleanup, inputs = _b.inputs, outputs = _b.outputs, randomOdd = _b.randomOdd, sleep = _b.sleep;
console.log("imported functions " + timePast());
var startTime = new Date().toISOString().substring(2);
function filelog(str) { }
function fulllog(str) {
    console.log(str);
    filelog(str);
}
var Role = require("./role.js");
bot.games = {};
var praise = ["nice", "good", "amazing", "godly", "legend", "legendary"];
var commandFiles = fs.readdirSync("./commands");
var commandFolders = commandFiles.filter(function (file) { return !file.endsWith(".js"); });
var commands = {};
var folderFind = {};
for (var _i = 0, commandFolders_1 = commandFolders; _i < commandFolders_1.length; _i++) {
    var folder = commandFolders_1[_i];
    commands[folder] = fs.readdirSync("./commands/" + folder);
    for (var _c = 0, _d = commands[folder]; _c < _d.length; _c++) {
        var file = _d[_c];
        var command = require("./commands/".concat(folder, "/").concat(file));
        bot.commands.set(command.name, command);
        folderFind[command.name] = folder;
        console.log("set ".concat(command.name, " command ") + timePast());
    }
}
bot.commandlist = commands;
console.log("set bot commands " + timePast());
//import rpgcommands
var rpgcommandFiles = fs
    .readdirSync("./rpg/rpgcommands")
    .filter(function (file) { return file.endsWith(".js"); });
for (var _e = 0, rpgcommandFiles_1 = rpgcommandFiles; _e < rpgcommandFiles_1.length; _e++) {
    var file = rpgcommandFiles_1[_e];
    var command = require("./rpg/rpgcommands/".concat(file));
    // set a new item in the Collection
    // with name : command module
    bot.rpgcommands.set(command.name, command);
    console.log("set ".concat(command.name, " command ") + timePast());
}
console.log("set rpg commands " + timePast());
//import Firebase stuff
var admin = require("firebase-admin");
console.log("imported firebase-admin" + timePast());
var serviceAccount = require("./servicekey.json");
var rpgserviceAccount = require("./rpg/rpgservicekey.json");
rpgserviceAccount.private_key = rpgkey.replace(/\\n/g, "\n");
serviceAccount.private_key = firebasekey.replace(/\\n/g, "\n");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "tosbot.appspot.com",
});
var rpgadmin = admin.initializeApp({
    credential: admin.credential.cert(rpgserviceAccount),
}, "rpg");
var db = admin.firestore();
console.log("initialized firebase " + timePast());
//discord
bot.on("ready", function () {
    fulllog("Bot Ready at " + new Date().toString());
    changeStatus(bot);
    fulllog("Changing status at " + new Date().toString());
    syncEmotes();
    console.log("synced Emotes " + timePast());
});
bot.on("messageDelete", function (message) { return __awaiter(_this, void 0, void 0, function () {
    var channel, channel, embed;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(message.channel.id == "834141508264525845")) return [3 /*break*/, 2];
                return [4 /*yield*/, bot.channels.fetch("838496897861025812")];
            case 1:
                channel = _a.sent();
                channel.send(message.content);
                message.embeds.forEach(function (e) { return channel.send(e); });
                channel.send("From: <@".concat(message.author.id, ">"));
                _a.label = 2;
            case 2:
                if (!(message.guild.id == "712382129673338991")) return [3 /*break*/, 4];
                return [4 /*yield*/, bot.channels.fetch("842750073896173628")];
            case 3:
                channel = _a.sent();
                if (message.content) {
                    embed = new Discord.MessageEmbed()
                        .setTitle("Message Deleted")
                        .setDescription(message.content)
                        .addField("Channel:", message.channel.name)
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setTimestamp();
                    channel.send(embed);
                }
                else {
                    message.embeds.forEach(function (e) { return channel.send(e); });
                    channel.send("From: <@".concat(message.author.id, "> in ").concat(message.channel.name, " at ").concat(Date.now().toString()));
                }
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
bot.on("messageUpdate", function (oldMessage, newMessage) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/];
}); }); });
bot.on("message", function (message) { return __awaiter(_this, void 0, void 0, function () {
    var matthew, channel, channel, category, alias, guilds, guildlist, g, m, _a, embed, sended, edwardRef, e_1, d, h, type, temp, pingers, emojis, emojis, guildRef, r, i, e, u, dirty, sended, collector, file_1, c, clean, act, act, act, act, act, dirty, act, dirty, receive, kellydata, data, extra, embed_1, k, sended, bigbrother, i, j, temp_1, args, commandName_1, command, perms, missing, _i, perms_1, perm, other, other, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 48, , 49]);
                //no bot replies
                if (message.author.bot && message.author.id != bot.user.id) {
                    return [2 /*return*/];
                }
                if (!(message.channel.type == "dm")) return [3 /*break*/, 13];
                if (message.author.id == bot.user.id &&
                    !message.content.startsWith(prefix)) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bot.guilds.fetch("720351714791915520")];
            case 1:
                matthew = _b.sent();
                return [4 /*yield*/, matthew.channels.cache.find(function (c) { return c.name == message.author.id; })];
            case 2:
                channel = _b.sent();
                if (!!channel) return [3 /*break*/, 12];
                return [4 /*yield*/, matthew.channels.create(message.author.id)];
            case 3:
                channel = _b.sent();
                return [4 /*yield*/, matthew.channels.cache.find(function (c) { return c.name == "DM" && c.type == "category"; })];
            case 4:
                category = _b.sent();
                channel.setParent(category.id);
                alias = [];
                guilds = [];
                guildlist = bot.guilds.cache.array();
                i = 0;
                _b.label = 5;
            case 5:
                if (!(i < guildlist.length)) return [3 /*break*/, 10];
                g = guildlist[i];
                _b.label = 6;
            case 6:
                _b.trys.push([6, 8, , 9]);
                return [4 /*yield*/, g.members.fetch(message.author.id)];
            case 7:
                m = _b.sent();
                alias.push(m.nickname);
                guilds.push(g.name);
                return [3 /*break*/, 9];
            case 8:
                _a = _b.sent();
                return [3 /*break*/, 9];
            case 9:
                i++;
                return [3 /*break*/, 5];
            case 10:
                embed = new Discord.MessageEmbed()
                    .setColor("#00FF00")
                    .setTitle(message.author.username)
                    .setDescription(message.author.tag)
                    .addField("a.k.a", alias.join(",").length > 0 ? alias.join(",") : "None.")
                    .addField("In Guilds: ", guilds.join(",").length > 0 ? guilds.join(",") : "None.")
                    .setImage(message.author.displayAvatarURL);
                return [4 /*yield*/, channel.send(embed)];
            case 11:
                sended = _b.sent();
                sended.pin();
                _b.label = 12;
            case 12:
                try {
                    channel.send(message.content);
                }
                catch (err) {
                    fulllog(err + message.content);
                }
                _b.label = 13;
            case 13:
                if (!(message.author.id == "351132323405889537")) return [3 /*break*/, 15];
                edwardRef = db.collection("extra").doc("edward");
                return [4 /*yield*/, edwardRef.get()];
            case 14:
                e_1 = _b.sent();
                e_1 = e_1.data();
                e_1.totalM = e_1.totalM + 1;
                d = new Date();
                d.setTime(d.getTime() - 240 * 60 * 1000);
                h = e_1["history"];
                if (h[d.getFullYear()] == undefined) {
                    h[d.getFullYear()] = {};
                }
                if (h[d.getFullYear()][d.getMonth()] == undefined) {
                    h[d.getFullYear()][d.getMonth()] = {};
                }
                if (h[d.getFullYear()][d.getMonth()][d.getDate()] == undefined) {
                    h[d.getFullYear()][d.getMonth()][d.getDate()] = {};
                }
                if (h[d.getFullYear()][d.getMonth()][d.getDate()][d.getHours()] == undefined) {
                    h[d.getFullYear()][d.getMonth()][d.getDate()][d.getHours()] = {};
                }
                if (h[d.getFullYear()][d.getMonth()][d.getDate()][d.getHours()][d.getMinutes()] == undefined) {
                    h[d.getFullYear()][d.getMonth()][d.getDate()][d.getHours()][d.getMinutes()] = [];
                }
                h[d.getFullYear()][d.getMonth()][d.getDate()][d.getHours()][d.getMinutes()].unshift({
                    epoch: d.getTime() + 240 * 60 * 1000,
                    type: "m",
                    guild: message.guild.name,
                    channel: message.channel.name,
                });
                e_1["history"] = h;
                edwardRef.set(e_1);
                _b.label = 15;
            case 15:
                type = "";
                temp = message.content.toLowerCase();
                pingers = [
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
                if (!(message.channel.type == "text")) return [3 /*break*/, 36];
                if (message.author.id == bot.user.id) {
                    return [2 /*return*/];
                }
                emojis = message.content.match(/<:.+?:\d+>/g);
                if (!emojis) return [3 /*break*/, 17];
                emojis = emojis.map(function (e) { return e.match(/\d+/g)[0]; });
                emojis = emojis.filter(function (v, i) { return emojis.indexOf(v) == i; });
                guildRef = db.collection("reactions").doc(message.guild.id);
                return [4 /*yield*/, guildRef.get()];
            case 16:
                r = _b.sent();
                if (r.exists) {
                    r = r.data();
                }
                else {
                    r = { reactions: {}, users: {} };
                }
                for (i = 0; i < emojis.length; i++) {
                    e = message.guild.emojis.cache.get(emojis[i]);
                    if (!e) {
                        continue;
                    }
                    u = message.author;
                    if (e.id in r.reactions) {
                        r.reactions[e.id].count++;
                    }
                    else {
                        r.reactions[e.id] = {};
                        r.reactions[e.id]["name"] = e.name;
                        r.reactions[e.id]["count"] = 1;
                        r.reactions[e.id]["users"] = {};
                    }
                    if (u.id in r.reactions[e.id].users) {
                        r.reactions[e.id].users[u.id]++;
                    }
                    else {
                        r.reactions[e.id].users[u.id] = 1;
                    }
                    if (u.id in r.users) {
                        r.users[u.id].count++;
                    }
                    else {
                        r.users[u.id] = {};
                        r.users[u.id]["name"] = u.username;
                        r.users[u.id]["count"] = 1;
                        r.users[u.id]["reactions"] = {};
                    }
                    if (e.id in r.users[u.id].reactions) {
                        r.users[u.id].reactions[e.id]++;
                    }
                    else {
                        r.users[u.id].reactions[e.id] = 1;
                    }
                }
                guildRef.set(r);
                _b.label = 17;
            case 17:
                if (!(message.guild.id == "757770623450611784")) return [3 /*break*/, 31];
                if (!(message.channel.id == "769979741506764844")) return [3 /*break*/, 19];
                if (!!message.member.roles.cache.has("819421409934573568")) return [3 /*break*/, 19];
                dirty = message.guild.roles.cache.find(function (r) { return r.name == "Horny Gang"; });
                return [4 /*yield*/, message.member.roles.add(dirty)];
            case 18:
                _b.sent();
                _b.label = 19;
            case 19:
                if (!(message.channel.id == "837743995828174878")) return [3 /*break*/, 24];
                if (!message.attachments.first()) return [3 /*break*/, 23];
                if (!!message.content) return [3 /*break*/, 21];
                return [4 /*yield*/, message.channel.send(new Discord.MessageEmbed()
                        .setTitle("Emoji Adding")
                        .setDescription("Enter a name for you emoji:")
                        .setColor("#00FFFF"))];
            case 20:
                sended = _b.sent();
                collector = message.channel.createMessageCollector(function (m) { return m.author.id == message.author.id; }, { time: 30000, max: 1 });
                collector.on("end", function (collected, reason) {
                    if (reason == "time") {
                        sended.edit(new Discord.MessageEmbed()
                            .setTitle("Emoji Adding Timed out.")
                            .setDescription("Slowpoke :[")
                            .setColor("#FF0000"));
                    }
                    else {
                        message.guild.emojis
                            .create(message.attachments.first().attachment, collected.first().content)
                            .catch(function (err) {
                            message.channel.send(new Discord.MessageEmbed()
                                .setTitle("Failed to add Emoji")
                                .setDescription("Might be because the image size is over 256kb. If it's not, give up on your dreams and die.")
                                .setColor("#FF0000"));
                        });
                    }
                });
                return [3 /*break*/, 22];
            case 21:
                message.guild.emojis
                    .create(message.attachments.first().attachment, message.content)
                    .catch(function (err) {
                    message.channel.send(new Discord.MessageEmbed()
                        .setTitle("Failed to add Emoji")
                        .setDescription("Might be because the image size is over 256kb. If it's not, give up on your dreams and die.")
                        .setColor("#FF0000"));
                });
                _b.label = 22;
            case 22: return [3 /*break*/, 24];
            case 23:
                if (message.content.match(/tenor/g) ||
                    message.content.match(/imgur/g)) {
                    file_1 = message.content;
                    message.channel.send("Enter a name for this emoji:");
                    message.channel
                        .awaitMessages(function (m) { return m.author.id == message.author.id; }, {
                        max: 1,
                        time: 30000,
                    })
                        .then(function (collected, reason) {
                        if (collected.first()) {
                            message.guild.emojis
                                .create(file_1, collected.first().content)
                                .catch(function (err) {
                                message.channel.send("File cannot be larger than 256.0 kb.");
                            });
                        }
                        else {
                            return message.channel.send("Command timed out.");
                        }
                    });
                }
                _b.label = 24;
            case 24:
                //only rolling in human trafficking channels
                if (message.channel.id != "834128407536861284" &&
                    message.channel.id != "834132436136230942") {
                    c = message.content;
                    if (c == "$wa" ||
                        c == "$wg" ||
                        c == "$ha" ||
                        c == "$hg" ||
                        c == "$ma" ||
                        c == "$mg") {
                        message.delete();
                        message.channel.send("Rolling waifus are only allowed in the <#757977875059179602> channel!");
                        message.member.roles.add(message.guild.roles.cache.find(function (r) { return r.name == "Muted"; }));
                        return [2 /*return*/, setTimeout(function () {
                                message.member.roles.remove(message.guild.roles.cache.find(function (r) { return r.name == "Muted"; }));
                            }, 10000)];
                    }
                }
                clean = message.content.replace(/\W/g, "").toLowerCase();
                if (clean == "imadegeneratetoo") {
                    act = message.guild.roles.cache.find(function (r) { return r.name == "Human Rights Activist"; });
                    if (message.member.roles.cache.has("776509222145228870")) {
                        message.channel.send("".concat(message.author.username, " is now a degenerate!"));
                        return [2 /*return*/, message.member.roles.remove(act)];
                    }
                    else {
                        message.channel.send("".concat(message.author.username, " is a degenerate."));
                    }
                }
                if (clean == "yallarefuckingdegenerates") {
                    act = message.guild.roles.cache.find(function (r) { return r.name == "Human Rights Activist"; });
                    if (message.member.roles.cache.has("776509222145228870")) {
                        message.channel.send("We know");
                        return [2 /*return*/, message.member.roles.remove(act)];
                    }
                    else {
                        message.channel.send("".concat(message.author.username, " is now a <@&776509222145228870>!"), {
                            allowedMentions: {
                                users: [],
                            },
                        });
                        return [2 /*return*/, message.member.roles.add(act)];
                    }
                }
                if (clean == "procrastinationtime") {
                    act = message.guild.roles.cache.find(function (r) { return r.name == "Responsible Person"; });
                    if (message.member.roles.cache.has("770826236158410762")) {
                        message.channel.send("".concat(message.author.username, " is now a Procrastinator!"));
                        return [2 /*return*/, message.member.roles.remove(act)];
                    }
                    else {
                        message.channel.send("".concat(message.author.username, " is in Quadrant 1: Procrastinator."));
                    }
                }
                if (clean == "imaresponsibleboi") {
                    act = message.guild.roles.cache.find(function (r) { return r.name == "Responsible Person"; });
                    if (message.member.roles.cache.has("770826236158410762")) {
                        message.channel.send("".concat(message.author.username, " is in Quadrant 2: Something idk i wasn't listening"));
                        return [2 /*return*/, message.member.roles.remove(act)];
                    }
                    else {
                        message.channel.send("".concat(message.author.username, " is now a <@&770826236158410762>!"), {
                            allowedMentions: {
                                users: [],
                            },
                        });
                        return [2 /*return*/, message.member.roles.add(act)];
                    }
                }
                if (!(clean == "imapervert")) return [3 /*break*/, 27];
                act = message.guild.roles.cache.find(function (r) { return r.name == "Innocent"; });
                dirty = message.guild.roles.cache.find(function (r) { return r.name == "Horny Gang"; });
                if (!message.member.roles.cache.has("784135793987682384")) return [3 /*break*/, 26];
                message.channel.send("".concat(message.author.username, " couldn't fight the *urge*"));
                return [4 /*yield*/, message.member.roles.add(dirty)];
            case 25:
                _b.sent();
                return [2 /*return*/, message.member.roles.remove(act)];
            case 26:
                message.channel.send("".concat(message.author.username, "...h-h-***hentaii!***"));
                _b.label = 27;
            case 27:
                if (!(clean == "imunder18")) return [3 /*break*/, 31];
                act = message.guild.roles.cache.find(function (r) { return r.name == "Innocent"; });
                dirty = message.guild.roles.cache.find(function (r) { return r.name == "Horny Gang"; });
                if (!message.member.roles.cache.has("784135793987682384")) return [3 /*break*/, 29];
                message.channel.send("".concat(message.author.username, " doesn't know anything :sweat:"));
                return [4 /*yield*/, message.member.roles.remove(dirty)];
            case 28:
                _b.sent();
                return [3 /*break*/, 31];
            case 29:
                message.channel.send("".concat(message.author.username, " is now <@&784135793987682384>!"), {
                    allowedMentions: {
                        users: [],
                    },
                });
                return [4 /*yield*/, message.member.roles.remove(dirty)];
            case 30:
                _b.sent();
                return [2 /*return*/, message.member.roles.add(act)];
            case 31:
                if (!(message.guild.id == "720351714791915520")) return [3 /*break*/, 34];
                if (!(message.channel.parentID == "781939212416581654")) return [3 /*break*/, 33];
                if (message.author.id != ownerID) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bot.users.fetch(message.channel.name)];
            case 32:
                receive = _b.sent();
                receive.send(message.content);
                _b.label = 33;
            case 33:
                if (message.channel.id == "894262071116566558") {
                    botUpdates(message.content);
                }
                _b.label = 34;
            case 34:
                if (!(message.guild.id == "712382129673338991")) return [3 /*break*/, 36];
                if (!(message.author.id == "351164483256975360")) return [3 /*break*/, 36];
                kellydata = db.collection("extra").doc("kellycount");
                return [4 /*yield*/, kellydata.get()];
            case 35:
                data = _b.sent();
                data = data.data();
                console.log(data);
                data.count += 1;
                kellydata.set(data);
                extra = "";
                switch (data.count) {
                    case 50:
                        extra = "Halfway";
                        break;
                    case 69:
                        extra = "nice.";
                        break;
                    case 100:
                        extra = "The journey begins...";
                        break;
                    case 250:
                        extra = "The delayer.";
                        break;
                    case 500:
                        extra = "The postponer.";
                        break;
                    case 1000:
                        extra = "THE PROCRASTINATOR";
                        break;
                }
                embed_1 = new Discord.MessageEmbed()
                    .setTitle("Go study Kelly.")
                    .setFooter("I have told you ".concat(data.count, " times."));
                message.reply(embed_1);
                if (extra != "") {
                    message.channel.send(new Discord.MessageEmbed()
                        .setTitle("New achievement: ".concat(extra))
                        .setColor("#FFD700"));
                }
                _b.label = 36;
            case 36:
                if (message.author.id == "518232676411637780") {
                    message.react("827007959363223562").catch(function (err) {
                        console.log("reaction failed in ".concat(message.channel.name, " of ").concat(message.guild.name));
                    });
                }
                if (message.content.startsWith(prefix)) {
                    type = "bot";
                }
                else if (message.content.startsWith(rpgprefix)) {
                    type = "rpg";
                }
                if (!!type) return [3 /*break*/, 44];
                //some extra personality for Matthew Bot
                /*if (temp.length = 1 && temp.includes("e")) {
                              var role = await message.guild.roles.cache.find(role => role.id == '758129827906584587');
                              message.channel.send("Silence.")
                              return message.member.roles.add(role)
                          
                          }*/
                temp = cleanup(temp);
                if (!(temp != "")) return [3 /*break*/, 43];
                for (i = 0; i < inputs.length; i++) {
                    for (j = 0; j < inputs[i].length; j++) {
                        if (temp.includes(inputs[i][j])) {
                            for (k = 0; k < outputs[i].length; k++) {
                                message.channel.send(outputs[i][k]);
                            }
                            return [2 /*return*/];
                        }
                    }
                }
                if (!(temp.length == 1 && temp.includes("e"))) return [3 /*break*/, 42];
                return [4 /*yield*/, message.channel.send("E")];
            case 37:
                sended = _b.sent();
                if (!(message.author.id == "351164483256975360")) return [3 /*break*/, 39];
                return [4 /*yield*/, sleep(1000)];
            case 38:
                _b.sent();
                return [2 /*return*/, sended.edit("You thought")];
            case 39:
                if (!randomOdd(50)) return [3 /*break*/, 41];
                return [4 /*yield*/, sleep(1000)];
            case 40:
                _b.sent();
                return [2 /*return*/, sended.edit("You thought")];
            case 41: return [2 /*return*/];
            case 42:
                if ((temp.split(" ").includes("david") ||
                    temp.split(" ").includes("davids")) &&
                    temp.split(" ").includes("yasuo")) {
                    message.react("🤡");
                }
                if (temp.split(" ").includes("clown")) {
                    message.react("🤡");
                }
                if (temp.match(/Cog+ers/gi)) {
                    message.react("<coggers:919643778074177628>");
                }
                if (temp.split(" ").includes("masteryu")) {
                    message.channel.send("<:masteryu:827007959363223562>");
                }
                if (temp.split(" ").includes("im") && temp.split(" ").includes("god")) {
                    return [2 /*return*/, message.channel.send("You are not god. **I am God**.")];
                }
                if (message.author.id == ownerID) {
                    if (!(temp.split(" ").includes("matthew") ||
                        temp.split(" ").includes("matthewbot"))) {
                    }
                    else {
                        for (i = 0; i < temp.split(" ").length; i++) {
                            if (praise.includes(temp.split(" ")[i])) {
                                return [2 /*return*/, message.channel.send("https:cdn.discordapp.com/attachments/720351714791915523/764105109536768020/unknown.png")];
                            }
                        }
                    }
                }
                if (temp.includes("abdullah")) {
                    if (!temp.includes("supreme") || !temp.includes("leader")) {
                        message.channel.send("You must refer to him as Supreme Leader Abdullah!");
                    }
                    else {
                        message.channel.send("All hail Supreme Leader Abdullah! <:hotabdullahcrop:746455282921636021> ");
                    }
                    return [2 /*return*/];
                }
                if (temp.split(" ").includes("mai") ||
                    temp.split(" ").includes("maisan")) {
                    message.react("809523703138091108").catch(function (err) {
                        console.log("reaction failed in ".concat(message.channel.name, " of ").concat(message.guild.name));
                    });
                }
                if (temp.charAt(0) == "a" &&
                    temp.slice(1).split("y").join("").length == 0 &&
                    temp.length != 1) {
                    return [2 /*return*/, message.channel.send("(☞ﾟヮﾟ)☞ ☜(ﾟヮﾟ☜) **Ayyyyy**")];
                }
                if (temp.split(" ")[temp.split(" ").indexOf("big") + 1] == "brother" ||
                    temp.split(" ").includes("bb")) {
                    bigbrother = [
                        "💖",
                        "❤️",
                        "👏",
                        "👍",
                        "💪",
                        "👁️",
                        "👁‍🗨",
                        "🥳",
                        "📷",
                        "🎉",
                    ];
                    for (i = bigbrother.length - 1; i > 0; i--) {
                        j = Math.floor(Math.random() * (i + 1));
                        temp_1 = bigbrother[i];
                        bigbrother[i] = bigbrother[j];
                        bigbrother[j] = temp_1;
                    }
                    for (i = 0; i < 4; i++) {
                        message.react(bigbrother[i]).catch(function (err) {
                            console.log("reaction failed in ".concat(message.channel.name, " of ").concat(message.guild.name));
                        });
                    }
                }
                if (temp.includes("just do it")) {
                    message.react("🎷");
                }
                if (temp.includes("suck") &&
                    temp.includes("i") &&
                    message.author.id == 306512867232972802) {
                    return [2 /*return*/, message.channel.send("https://i.imgur.com/1pQHxXd.png")];
                }
                _b.label = 43;
            case 43: return [2 /*return*/];
            case 44:
                args = message.content.slice(prefix.length).trim().split(/ +/g);
                commandName_1 = args.shift().toLowerCase();
                console.log(commandName_1 + " from " + message.author.username);
                console.log(args);
                command = null;
                //check if command exists for both prefix and rpgprefix
                if (type == "bot") {
                    command =
                        bot.commands.get(commandName_1) ||
                            bot.commands.find(function (cmd) { return cmd.aliases && cmd.aliases.includes(commandName_1); });
                }
                else {
                    command =
                        bot.rpgcommands.get(commandName_1) ||
                            bot.rpgcommands.find(function (cmd) { return cmd.aliases && cmd.aliases.includes(commandName_1); });
                }
                if (!command) {
                    return [2 /*return*/];
                }
                //nsfw check
                if (command.nsfw && !message.channel.nsfw) {
                    return [2 /*return*/, message.reply("THIS IS A WHOLESOME AND SAFE CHANNEL! THAT COMMAND CANNOT BE USED HERE.")];
                }
                /*checks whether the user has the permissions required for the matthew bot commmand*/
                //if admin, skip this part
                if (command.perms.includes("MATTHEW")) {
                    if (message.author.id != 576031405037977600) {
                        return [2 /*return*/, message.channel.send(new Discord.MessageEmbed()
                                .setTitle("Nice try...")
                                .setColor("RED")
                                .setDescription("Can't do that mate you ain't Matthew"))];
                    }
                }
                if (!(message.channel.type != "DM" ||
                    message.member.permissions.has("ADMINISTRATOR"))) {
                    perms = command.perms;
                    missing = [];
                    for (_i = 0, perms_1 = perms; _i < perms_1.length; _i++) {
                        perm = perms_1[_i];
                        if (!message.member.permissions.has(perm)) {
                            missing.push(perm);
                        }
                    }
                    if (missing.length > 0) {
                        return [2 /*return*/, message.channel.send(new Discord.MessageEmbed()
                                .setTitle("Missing Permissions")
                                .setColor("RED")
                                .setDescription("You are missing the following permissions for the **m!".concat(command.name, "** command: `").concat(missing.join(", "), "`")))];
                    }
                }
                if (!(!command.args.includes(-1) && !command.args.includes(args.length))) return [3 /*break*/, 47];
                return [4 /*yield*/, message.reply("Are you sure that was the right number of arguments?")];
            case 45:
                _b.sent();
                return [4 /*yield*/, message.channel.send("usage: " + command.usage)];
            case 46:
                _b.sent();
                return [2 /*return*/];
            case 47:
                if (type == "bot") {
                    other = [admin, bot, commandName_1, disbut];
                }
                else {
                    other = [rpgadmin, bot, commandName_1, disbut];
                }
                if (command.status == "wip") {
                    return [2 /*return*/, message.channel.send("That command is currently a WIP, please check again later (or pester Matthew to code it faster)")];
                }
                else if (command.status == "closed") {
                    return [2 /*return*/, message.channel.send("That command is currently closed. Either Matthew hasn't started coding, or it isn't needed.")];
                }
                try {
                    command.execute(message, args, other);
                }
                catch (err) {
                    console.error(err);
                }
                return [3 /*break*/, 49];
            case 48:
                err_1 = _b.sent();
                console.log("TEST");
                console.error(err_1);
                return [3 /*break*/, 49];
            case 49: return [2 /*return*/];
        }
    });
}); });
var ignore = ["576031405037977600"];
bot.on("messageReactionAdd", function (reaction, user) {
    return __awaiter(this, void 0, void 0, function () {
        var guildRef, r, e, u, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    if (user.bot) {
                        return [2 /*return*/];
                    }
                    if (!(reaction.emoji instanceof Discord.GuildEmoji)) {
                        return [2 /*return*/];
                    }
                    if (reaction.emoji.guild.id != reaction.message.guild.id) {
                        return [2 /*return*/];
                    }
                    guildRef = db.collection("reactions").doc(reaction.message.guild.id);
                    return [4 /*yield*/, guildRef.get()];
                case 1:
                    r = _a.sent();
                    if (r.exists) {
                        r = r.data();
                    }
                    else {
                        r = { reactions: {}, users: {} };
                    }
                    e = reaction.emoji;
                    u = user;
                    if (e.id in r.reactions) {
                        r.reactions[e.id].count++;
                    }
                    else {
                        r.reactions[e.id] = {};
                        r.reactions[e.id]["name"] = e.name;
                        r.reactions[e.id]["count"] = 1;
                        r.reactions[e.id]["users"] = {};
                    }
                    if (u.id in r.reactions[e.id].users) {
                        r.reactions[e.id].users[u.id]++;
                    }
                    else {
                        r.reactions[e.id].users[u.id] = 1;
                    }
                    if (u.id in r.users) {
                        r.users[u.id].count++;
                    }
                    else {
                        r.users[u.id] = {};
                        r.users[u.id]["name"] = u.username;
                        r.users[u.id]["count"] = 1;
                        r.users[u.id]["reactions"] = {};
                    }
                    if (e.id in r.users[u.id].reactions) {
                        r.users[u.id].reactions[e.id]++;
                    }
                    else {
                        r.users[u.id].reactions[e.id] = 1;
                    }
                    guildRef.set(r);
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    console.log(err_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
bot.on("guildMemberAdd", function (member) { return __awaiter(_this, void 0, void 0, function () {
    var channel, sended, roles, origin, anchor, oldroles;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                filelog(member);
                if (!(member.guild.id == "757770623450611784")) return [3 /*break*/, 3];
                return [4 /*yield*/, member.guild.channels.cache.find(function (c) { return c.id == "843735245399785482"; })];
            case 1:
                channel = _a.sent();
                return [4 /*yield*/, channel.send("<@" + member.id + ">")];
            case 2:
                sended = _a.sent();
                sended.delete();
                _a.label = 3;
            case 3:
                if (!(member.guild.id == "836780126741332009")) return [3 /*break*/, 8];
                return [4 /*yield*/, member.guild.roles.cache];
            case 4:
                roles = _a.sent();
                return [4 /*yield*/, bot.guilds.fetch("757770623450611784")];
            case 5:
                origin = _a.sent();
                return [4 /*yield*/, origin.members.fetch(member.id)];
            case 6:
                anchor = _a.sent();
                return [4 /*yield*/, anchor.roles.cache];
            case 7:
                oldroles = _a.sent();
                oldroles.each(function (r) {
                    member.roles.add(roles.find(function (oldrole) { return oldrole.name == r.name; }));
                });
                _a.label = 8;
            case 8: return [2 /*return*/];
        }
    });
}); });
bot.on("raw", function (packet) { return __awaiter(_this, void 0, void 0, function () {
    var guild, member, channel, message, emoji, reaction;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (packet.t == "TYPING_START" ||
                    packet.t == "MESSAGE_CREATE" ||
                    packet.t == "MESSAGE_REACTION_REMOVE") {
                    return [2 /*return*/];
                }
                filelog(packet);
                if (packet.t != "MESSAGE_REACTION_ADD") {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bot.guilds.fetch(packet.d.guild_id)];
            case 1:
                guild = _a.sent();
                return [4 /*yield*/, guild.members.fetch(packet.d.user_id)];
            case 2:
                member = _a.sent();
                //ignore if bot
                if (member.user.bot) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, guild.channels.cache.get(packet.d.channel_id)];
            case 3:
                channel = _a.sent();
                //if channel message is already cached no need to call twice
                //it'll be detected by messageReactionAdd anyways
                if (channel.messages.cache.has(packet.d.message_id))
                    return [2 /*return*/];
                return [4 /*yield*/, channel.messages.fetch(packet.d.message_id)];
            case 4:
                message = _a.sent();
                emoji = packet.d.emoji.id ? packet.d.emoji.id : packet.d.emoji.name;
                return [4 /*yield*/, message.reactions.cache.get(emoji)];
            case 5:
                reaction = _a.sent();
                //Adds the currently reacting user to the reaction's users collection.
                if (reaction)
                    reaction.users = (packet.d.user_id, member.user);
                bot.emit("messageReactionAdd", reaction, member.user);
                return [2 /*return*/];
        }
    });
}); });
//stalker time!
bot.on("presenceUpdate", function (oldMember, newMember) {
    return __awaiter(this, void 0, void 0, function () {
        var status, channel, edwardRef, e, d, h, username, channel;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!oldMember) {
                        status = "offline";
                    }
                    else {
                        status = oldMember.status;
                    }
                    351132323405889537;
                    if (!(newMember.user.id == "351132323405889537")) return [3 /*break*/, 3];
                    if (!(newMember.guild.id == "712382129673338991")) return [3 /*break*/, 3];
                    return [4 /*yield*/, newMember.guild.channels.cache.find(function (c) { return c.name == "dead-chat"; })];
                case 1:
                    channel = _a.sent();
                    if (!channel) {
                        return [2 /*return*/];
                    }
                    edwardRef = db.collection("extra").doc("edward");
                    return [4 /*yield*/, edwardRef.get()];
                case 2:
                    e = _a.sent();
                    e = e.data();
                    if (!((newMember.status != "offline" && status == "offline") ||
                        newMember.status == "offline")) {
                        return [2 /*return*/];
                    }
                    channel
                        .send(newMember.status != "offline" && status == "offline"
                        ? "Edward has gone on!"
                        : newMember.status == "offline"
                            ? "Edward has gone off."
                            : "")
                        .catch(function (err) {
                        console.log(err);
                        return;
                    });
                    e.status = "online";
                    if (newMember.status != "offline" && status == "offline") {
                        e.totalA = e.totalA + 1;
                    }
                    d = new Date();
                    d.setTime(d.getTime() - 240 * 60 * 1000);
                    h = e["history"];
                    if (h[d.getFullYear()] == undefined) {
                        h[d.getFullYear()] = {};
                    }
                    if (h[d.getFullYear()][d.getMonth()] == undefined) {
                        h[d.getFullYear()][d.getMonth()] = {};
                    }
                    if (h[d.getFullYear()][d.getMonth()][d.getDate()] == undefined) {
                        h[d.getFullYear()][d.getMonth()][d.getDate()] = {};
                    }
                    if (h[d.getFullYear()][d.getMonth()][d.getDate()][d.getHours()] == undefined) {
                        h[d.getFullYear()][d.getMonth()][d.getDate()][d.getHours()] = {};
                    }
                    if (h[d.getFullYear()][d.getMonth()][d.getDate()][d.getHours()][d.getMinutes()] == undefined) {
                        h[d.getFullYear()][d.getMonth()][d.getDate()][d.getHours()][d.getMinutes()] = [];
                    }
                    h[d.getFullYear()][d.getMonth()][d.getDate()][d.getHours()][d.getMinutes()].unshift({
                        epoch: d.getTime() + 240 * 60 * 1000,
                        type: "a",
                        data: newMember.status != "offline" && status == "offline" ? "on" : "off",
                    });
                    e["history"] = h;
                    edwardRef.set(e);
                    return [2 /*return*/];
                case 3:
                    //bot & ignore detector
                    if (newMember.user.bot) {
                        return [2 /*return*/];
                    }
                    username = newMember.user.username;
                    if (newMember.member.nickname) {
                        username = newMember.member.nickname;
                    }
                    return [4 /*yield*/, newMember.guild.channels.cache.find(function (c) { return c.name == "matthew-sees-you"; })];
                case 4:
                    channel = _a.sent();
                    if (!channel) {
                        return [2 /*return*/];
                    }
                    if (newMember.status != "offline" && status == "offline") {
                        if (!ignore.includes(newMember.user.id) && channel) {
                            channel.send("".concat(username, " *I see you* :eyes:"));
                        }
                        console.log("\n".concat(username, " from ").concat(newMember.guild.name, " has gone online.\n"));
                    }
                    else if (newMember.status == "offline") {
                        if (!ignore.includes(newMember.user.id) && channel) {
                            channel.send("*".concat(username, " where are you hiding*? :dagger:"));
                        }
                        console.log("\n".concat(username, " from ").concat(newMember.guild.name, " has gone off.\n"));
                    }
                    return [2 /*return*/];
            }
        });
    });
});
bot.on("guildCreate", function (guild) {
    return __awaiter(this, void 0, void 0, function () {
        var channel;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Joined guild ".concat(guild.name));
                    channel = guild.channels.cache.find(function (channel) {
                        return channel.type === "text" &&
                            channel.permissionsFor(guild.me).has("SEND_MESSAGES");
                    });
                    return [4 /*yield*/, channel.send(new Discord.MessageEmbed()
                            .setTitle("Matthew Bot, at your service!")
                            .setDescription("I'm  Matthew Bot, here to make this server a ~~better~~ exciting place!\n\nHere's the important commands you should probably know.\n\n**m!help** - The help function, get a list of all commands or see a specific command\n**m!cvs** - Gets a covid screening :eyes:\n**m!wordgame - three matthewbot wordgames for the family!")
                            .setFooter("I currently have every single permission bar admin, feel free to remove some :D"))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, channel.send("Hi! I'm Matthew Bot, at your service!")];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, channel.send("I have a bunch of commands that you can see with **m!help**, and if you have any questions you can add my discord with **m!support**")];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
});
bot.on("rateLimit", function (info) {
    console.log("Rate limit hit ".concat(info.timeDifference
        ? info.timeDifference
        : info.timeout
            ? info.timeout
            : "Unknown timeout "));
});
//serverstuff
bot.on("roleCreate", function (r) {
    return __awaiter(this, void 0, void 0, function () {
        var server2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(r.guild.id == "757770623450611784")) return [3 /*break*/, 2];
                    return [4 /*yield*/, bot.guilds.fetch("836780126741332009")];
                case 1:
                    server2 = _a.sent();
                    server2.roles.create({
                        data: {
                            name: r.name,
                            color: r.color,
                            hoist: r.hoist,
                            mentionable: r.mentionable,
                            permissions: r.permissions,
                        },
                    });
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
});
bot.on("roleDelete", function (r) {
    return __awaiter(this, void 0, void 0, function () {
        var server2, roles, role;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(r.guild.id == "757770623450611784")) return [3 /*break*/, 3];
                    return [4 /*yield*/, bot.guilds.fetch("836780126741332009")];
                case 1:
                    server2 = _a.sent();
                    return [4 /*yield*/, server2.roles.cache];
                case 2:
                    roles = _a.sent();
                    role = roles.find(function (role) { return role.name == r.name; });
                    role.delete();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
});
bot.on("roleUpdate", function (oldRole, newRole) {
    return __awaiter(this, void 0, void 0, function () {
        var server2, roles, role;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(oldRole.guild.id == "757770623450611784")) return [3 /*break*/, 4];
                    console.log("Cult roleUpdate");
                    return [4 /*yield*/, bot.guilds.fetch("836780126741332009")];
                case 1:
                    server2 = _a.sent();
                    return [4 /*yield*/, server2.roles.cache];
                case 2:
                    roles = _a.sent();
                    return [4 /*yield*/, roles.find(function (role) { return role.name == oldRole.name; })];
                case 3:
                    role = _a.sent();
                    role.setColor(newRole.color);
                    role.setHoist(newRole.hoist);
                    role.setMentionable(newRole.mentionable);
                    role.setName(newRole.name);
                    role.setPermissions(newRole.permissions);
                    role.setPosition(newRole.rawPosition);
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
});
var express = require("express");
var bodyParser = require("body-parser");
console.log("imported express, body-parser  " + timePast());
var router = express.Router();
var server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true,
}));
server.use(express.static("website"));
server.get("/", function (req, res) {
    res.send("Hello World!");
});
server.all("/", function (req, res) {
    res.sendFile(__dirname + "/website/index.html");
});
function keepAlive() {
    server.listen(3000, function () {
        console.log("Server is Ready at " + new Date().toString());
    });
}
keepAlive();
console.log("bot login");
bot.login(token).then(function () { return __awaiter(_this, void 0, void 0, function () {
    var humantraffickingicon, matthew;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                humantraffickingicon = setInterval(function () { return nameChange(); }, 700000);
                covidScheduleSetup();
                return [4 /*yield*/, bot.users.fetch("576031405037977600")];
            case 1:
                matthew = _a.sent();
                matthew.send("Bot started!");
                console.log("Setup finished at " + timePast());
                return [2 /*return*/];
        }
    });
}); });
function nameChange() {
    return __awaiter(this, void 0, void 0, function () {
        var dirs, guild, e_2, names, name, icon;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dirs = fs.readdirSync("./amongus");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, bot.guilds.fetch("757770623450611784")];
                case 2:
                    guild = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    console.error(e_2);
                    return [2 /*return*/];
                case 4:
                    names = [
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
                    name = names[Math.floor(Math.random() * names.length)];
                    icon = dirs[Math.floor(Math.random() * dirs.length)];
                    return [4 /*yield*/, guild.setIcon("./amongus/".concat(icon))];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, guild.setName(name).catch(function (error) {
                            console.error(error);
                        })];
                case 6:
                    _a.sent();
                    console.log("Cult Server Name: ".concat(name, " Icon: ").concat(icon));
                    return [2 /*return*/];
            }
        });
    });
}
function syncEmotes() {
    return __awaiter(this, void 0, void 0, function () {
        var e, emojis, emojis, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e = JSON.parse(fs.readFileSync("serveremotes.json").toString());
                    return [4 /*yield*/, bot.emojis.cache];
                case 1:
                    emojis = _a.sent();
                    emojis = emojis.array();
                    for (i = 0; i < emojis.length; i++) {
                        e[emojis[i].name] = emojis[i].id;
                    }
                    fs.writeFileSync("serveremotes.json", JSON.stringify(e, null, 2));
                    return [2 /*return*/];
            }
        });
    });
}
function botUpdates(message) {
    return __awaiter(this, void 0, void 0, function () {
        var guilds;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bot.guilds.cache];
                case 1:
                    guilds = _a.sent();
                    guilds.forEach(function (g) { return __awaiter(_this, void 0, void 0, function () {
                        var channels, channel;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (g.id == "720351714791915520") {
                                        return [2 /*return*/];
                                    }
                                    return [4 /*yield*/, g.channels.cache];
                                case 1:
                                    channels = _a.sent();
                                    return [4 /*yield*/, channels.find(function (c) { return c.name == "matthew-bot-updates"; })];
                                case 2:
                                    channel = _a.sent();
                                    if (channel) {
                                        channel.send(message).catch();
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    });
}
function sendCovid(i) {
    var _this = this;
    console.log("sending covid screen");
    console.log(bot.covidtimes);
    var guilds = bot.covidtimes[i];
    var bucket = admin.storage().bucket();
    var content;
    var screenie = bucket.file("screenie.png");
    var localFilename = "./screenie.png";
    var a = fs.createWriteStream(localFilename);
    screenie
        .createReadStream()
        .on("error", function (err) { })
        .on("response", function (response) {
        // Server connected and responded with the specified status and headers.
    })
        .on("end", function () {
        // The file is fully downloaded.
    })
        .pipe(a);
    a.on("finish", function () { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            guilds.forEach(function (guildid) { return __awaiter(_this, void 0, void 0, function () {
                var guild, channel;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, bot.guilds.fetch(guildid)];
                        case 1:
                            guild = _a.sent();
                            return [4 /*yield*/, guild.channels.cache];
                        case 2:
                            channel = _a.sent();
                            channel = channel.find(function (c) { return c.name == "matthew-bot-screening"; });
                            if (channel) {
                                channel.send("Your daily scheduled covid screening :D");
                                channel.send({ files: ["./screenie.png"] });
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); });
}
function covidScheduleSetup() {
    return __awaiter(this, void 0, void 0, function () {
        "\n  tempguilds = await bot.guilds.cache\n  tempguilds = tempguilds.map(g => g.id)\n  var job1 = new CronJob('0 15 8 * * 1-5', () => {sendCovid(tempguilds)}, null, true, 'America/New_York');\n  var job2 = new CronJob('0 45 11 * * 1-5', () => {sendCovid(tempguilds)}, null, true, 'America/New_York');\n  job1.start();\n  job2.start();\n  ";
        return __generator(this, function (_a) {
            bot.reloadCovidSchedule = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var covidRef, times, snap, counter, _loop_1, i;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log("reloading Covid Schedule");
                                return [4 /*yield*/, db.collection("covidscreening")];
                            case 1:
                                covidRef = _a.sent();
                                times = {};
                                return [4 /*yield*/, covidRef.get()];
                            case 2:
                                snap = _a.sent();
                                snap.forEach(function (guild) {
                                    var data = guild.data();
                                    var crons = data.screencrons;
                                    for (var _i = 0, crons_1 = crons; _i < crons_1.length; _i++) {
                                        var i = crons_1[_i];
                                        times[i] ? times[i].push(guild.id) : (times[i] = [guild.id]);
                                    }
                                });
                                bot.covidtimes = times;
                                console.log(bot.covidtimes);
                                bot.covidCrons = [];
                                counter = 0;
                                _loop_1 = function (i) {
                                    var p = i;
                                    console.log(bot.covidtimes[p]);
                                    bot.covidCrons.push(new CronJob(p, function () {
                                        sendCovid(p);
                                    }, null, true, "America/New_York"));
                                    bot.covidCrons[counter].start();
                                    counter++;
                                };
                                for (i in bot.covidtimes) {
                                    _loop_1(i);
                                }
                                console.log("Covid schedule reloaded " + timePast());
                                return [2 /*return*/];
                        }
                    });
                });
            };
            bot.reloadCovidSchedule();
            return [2 /*return*/];
        });
    });
}
