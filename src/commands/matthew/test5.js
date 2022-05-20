const { prefix, token } = require("@config");
const fs = require('fs');
const Discord = require('discord.js');
const ChessWebAPI = require('chess-web-api')
module.exports = {
	args: [-1],
	name: "test5",
	description: "Test5",
	usage: `${prefix}test5`,
	perms: ["MATTHEW"],
	reload: true,
	async execute(message, args, other) {
		var admin = other[0]
		var bot = other[1]
    let db = admin.firestore()
		var commandName = other[2]
		var serverQueue = other[3]
    let covids = await db.collection('covidscreening')

    let guilds = await bot.guilds.cache
    guilds.forEach(async g => {
      let channels = await g.channels.cache
      if (channels.find(c => c.name == "matthew-bot-screening")) {
        let covidoc = covids.doc(g.id)
        let covidData = await covidoc.get()
        covidData = covidData.data()
        covidoc.set({
          screencrons: ["0 15 8 * * 1-5","0 45 11 * * 1-5"]
        })
      }
      
    })
		
	}
};	


