const { prefix, token } = require(require.resolve("@root/config.json"));
const fs = require('fs');
const Discord = require('discord.js');
const nhentai = require('nhentai');
const api = new nhentai.API()

module.exports = {
	args: [-1],
	name: "nhentai",
	description: "You horny bastard.",
	usage: `${prefix}nhentai {option}`,
	perms: [],
	nsfw: true,
	async execute(message, args, other) {
		var admin = other["admin"]
		var bot = other["bot"]
		var commandName = other["commandName"]

		async function makeEmbed(doujin,show) {
			var temp;
			if (doujin.titles.english) {
				temp = doujin.titles.english

				if (doujin.titles.japanese) {
					temp += ", " + doujin.titles.japanese
				}
			}
			else if (doujin.titles.japanese) {
				temp = doujin.titles.japanese
			}
			
			var parodies = doujin.tags.all.filter(tag => tag.type=='parody').sort((a,b) => (a.count > b.count) ? -1 : (a.count < b.count) ? 1 : 0).map(tag=>tag.name + ` (${tag.count})`)
			var characters = doujin.tags.all.filter(tag => tag.type=='character').sort((a,b) => (a.count > b.count) ? -1 : (a.count < b.count) ? 1 : 0).map(tag=>tag.name + ` (${tag.count})`)
			var tags = doujin.tags.all.filter(tag => tag.type=='tag').sort((a,b) => (a.count > b.count) ? -1 : (a.count < b.count) ? 1 : 0).map(tag=>tag.name + ` (${tag.count})`)
			var artists = doujin.tags.all.filter(tag => tag.type=='artist').sort((a,b) => (a.count > b.count) ? -1 : (a.count < b.count) ? 1 : 0).map(tag=>tag.name + ` (${tag.count})`)
			var languages = doujin.tags.all.filter(tag => tag.type=='language').sort((a,b) => (a.count > b.count) ? -1 : (a.count < b.count) ? 1 : 0).map(tag=>tag.name + ` (${tag.count})`)
			var groups = doujin.tags.all.filter(tag => tag.type=='language').sort((a,b) => (a.count > b.count) ? -1 : (a.count < b.count) ? 1 : 0).map(tag=>tag.name + ` (${tag.count})`)
			var categories = doujin.tags.all.filter(tag => tag.type=='category').sort((a,b) => (a.count > b.count) ? -1 : (a.count < b.count) ? 1 : 0).map(tag=>tag.name + ` (${tag.count})`)
			var options = {year: 'numeric', month: 'long', day: 'numeric' };
			var uploaded = new Intl.DateTimeFormat('en-US', options).format(doujin.uploadDate)
			console.log(uploaded)
			

			var embed = new Discord.MessageEmbed()
				
			.setColor("#00FF00")
			.setTitle(doujin.titles.pretty)
			if (temp) embed.setDescription(`**#${doujin.id}\n\n` + "AKA**: " + temp)
			console.log(parodies)
			embed.addFields(
				{name: "**parodies**", value: parodies.length ? parodies.join(" , ") : "none"},
				{name: "**characters**", value: characters.length ? characters.join(" , ") : "none"},
				{name: "**tags**", value: tags.length ? tags.join(" , ") : "none"},
				{name: "**artists**", value: artists.length ? artists.join(" , ") : "none"},
				{name: "**groups**", value: groups.length ? groups.join(" , ") : "none"},
				{name: "**categories**", value: categories.length ? categories.join(" , ") : "none"},
				{name: "**languages**", value: languages.length ? languages.join(" , ") : "none"},
				{name: "**pages**", value: doujin.length},
				{name: "**uploaded on**", value: uploaded},
				{name: "**favourites**", value: doujin.favorites}
				
			)
			.setURL(doujin.url)
			.setFooter("Tip: Add an s to your command (m!nhentai get 177013 s) to show the thumbnail! WARNING: POTENTIALLY NSFW")
			if (show) {
				embed.setImage(doujin.cover.url)
			}
			console.log(embed)
			return embed
		}

		async function readPage(sended,doujin,page,channel) {
			var embed = new Discord.MessageEmbed()
			.setColor("#00FF00")
			.setTitle(doujin.titles.pretty)
			.setDescription("**#" + doujin.id + "**")
			.setURL(doujin.url)
			.setImage(doujin.pages[page].url)
			.setFooter(`page ${page+1}/${doujin.length}`)
			const filter = (reaction, user) => {
				return (reaction.emoji.name === '⬅️' || reaction.emoji.name === '➡️' || reaction.emoji.name === '❌' || reaction.emoji.name === '⏩' || reaction.emoji.name === '⏪') && !user.bot ;
			};
			var sended = await sended.edit(embed)
			
			
			
			
			
			const collector = await sended.createReactionCollector(filter, { time: 100000 });
			
			collector.on('collect', async (reaction, user) => {
				await sended.reactions.resolve(reaction).users.remove(user.id)
				console.log("removed")
				if (reaction.emoji.name == '⬅️') {
					console.log("arrow left")
					if (page != 0) {
						collector.stop()
						readPage(sended,doujin,page-1,channel)
					}
				}
				else if (reaction.emoji.name == '➡️') {
					if (page != doujin.length - 1) {
						collector.stop()
						readPage(sended,doujin,page+1,channel)
					}
				}
				else if (reaction.emoji.name == '⏪') {
					console.log("hey")
					if (page >= 10) {
						collector.stop()
						readPage(sended,doujin,page-10,channel)
					}
				}
				else if (reaction.emoji.name == '⏩') {
					if (page <= doujin.length - 10) {
						collector.stop()
						readPage(sended,doujin,page+10,channel)
						
					}
				}
				else if (reaction.emoji.name == '❌') {
					console.log('delete2')
					collector.stop()
					sended.delete()
				}
				

			});

			collector.on('end', collected => {
			});
		}

		async function showDoujin(number,show) {
			var embed;
			var doujin = await api.fetchDoujin(number)
			console.log(doujin)
			if (show) {
				embed = await makeEmbed(doujin,true)
			}
			else {
				embed = await makeEmbed(doujin,false)
			}
				
			
			console.log(embed)
			var sended = await message.channel.send(embed);
			await sended.react('📖')
			await sended.react('❌')


			const filter = (reaction, user) => {
				return (reaction.emoji.name === '📖' || reaction.emoji.name === '❌') && !user.bot 
			};

			const collector = sended.createReactionCollector(filter, { time: 100000 });

			collector.on('collect', async (reaction, user) => {
				if (reaction.emoji.name == '📖') {
					sended.reactions.removeAll()
					var embed = new Discord.MessageEmbed()
					.setColor("#00FF00")
					.setTitle(doujin.titles.pretty)
					.setDescription("**#" + doujin.id + "**")
					.setURL(doujin.url)
					.setImage(doujin.pages[0].url)
					.setFooter(`page ${1}/${doujin.length}`)
					await sended.edit(embed)
					await sended.react('⏪')
					await sended.react('⬅️')
					await sended.react('➡️')
					await sended.react('⏩')
					await sended.react('❌')
					readPage(sended,doujin,0,message.channel)
					collector.stop()
				}
				else if (reaction.emoji.name == '❌') {
					
					sended.delete()
				}
			});

			collector.on('end', collected => {
			});
		}

		async function showSearch(sended,search,page,type) {
			
			var results = await api.search(search.join(" "),page,type)
			var embed = new Discord.MessageEmbed()
			.setColor("#00FF00")
			var desc = "unknown";
			
			switch (type) {
				case "popular":
					desc = "popular: all-time"
					break;
				case "popular-week":
					desc = "popular: week"
					break;
				case "popular-today":
					desc = "popular: today"
					break;
				case "":
					desc = "recent"
					break;
			}
			embed.setTitle("Results for: " + search)
			
			var doujins = "\n"
			for (i=0;i<results.doujins.length;i++) {
				var temp = results.doujins[i]
				var title = temp.titles.pretty
				if (temp == "") {
					title = temp.titles.english
				}
				if (temp == "") {
					title = temp.titles.japanese
				}
				doujins += `${title} **#${temp.id}**\n`
			}
			embed.setDescription("**" + desc + "** \n\n**doujins**:" + (doujins.length == 0 ? "no result!" : doujins))
			embed.setFooter(`page ${page}/${results.numPages}.    Want me to improve the search function? Pay me!`)
			var sended = await sended.edit(embed)

			const filter = (reaction, user) => {
				return (reaction.emoji.name === '⬅️' || reaction.emoji.name === '➡️' || reaction.emoji.name === '❌' || reaction.emoji.name === '⏩' || reaction.emoji.name === '⏪') && !user.bot ;
			};

			await sended.react('⏪')
			await sended.react('⬅️')
			await sended.react('➡️')
			await sended.react('⏩')
			await sended.react('❌')

			const collector = sended.createReactionCollector(filter, { time: 100000 });

			collector.on('collect', async (reaction, user) => {
				await sended.reactions.resolve(reaction).users.remove(user.id)
				console.log("removed")
				if (reaction.emoji.name == '⬅️') {
					console.log("arrow left")
					if (page != 0) {
						collector.stop()
						showSearch(sended,search,page-1,type)
					}
				}
				else if (reaction.emoji.name == '➡️') {
					if (page != results.numPages - 1) {
						collector.stop()
						showSearch(sended,search,page+1,type)
					}
				}
				else if (reaction.emoji.name == '⏪') {
					console.log("hey")
					if (page >= 10) {
						collector.stop()
						showSearch(sended,search,page-10,type)
					}
				}
				else if (reaction.emoji.name == '⏩') {
					if (page <= results.numPages - 10) {
						collector.stop()
						showSearch(sended,search,page+10,type)
						
					}
				}
				else if (reaction.emoji.name == '❌') {
					console.log('delete2')
					collector.stop()
					sended.delete()
				}
				

			});

			collector.on('end', collected => {
			});
		}




		if (args[0] == "get") {
			if (!api.doujinExists(args[1])) {
				return message.channel.send("Cannot find nhentai page.")
			}
			args[2]=="s" ? showDoujin(args[1],true) : showDoujin(args[1],false)
		}
		else if (args[0] == "search") {
			var sort;
			if (args[1] == "alltime") {
				sort = "popular"
			}
			else if (args[1] == "today") {
				sort = "popular-today"
			}
			else if (args[1] == "week") {
				sort = "popular-week"
			}
			else if (args[1] == "recent") {
				sort = ""
			}
			else {
				return message.channel.send("Usage: m!nhentai search <alltime, today, week, recent> (tags here)")
			}
			var embed = new Discord.MessageEmbed()
			.setColor('#26abFF')
			.setDescription("<a:loading:745769231295184959> Getting results...")
			
			var sended = await message.channel.send(embed)
			showSearch(sended,args.splice(2,args.length-2),1,sort)
			
		}
		else if (args[0] == "random") {
			var id = await api.randomDoujinID()
			args[1]=="s" ? showDoujin(id,true) : showDoujin(id,false)
			
		}
		else if (args[0] == "home" || args[0] == "homepage") {
			var doujins = await api.fetchHomepage(1,"popular-today")
			console.log(doujins)
		}
		else if (args[0] == "test") {
			var doujin = await api.fetchDoujin(args[1])
			console.log(doujin)
		}
		else {
			return message.channel.send("**Available commands:** get, search, home, read")
		}
		

		
	}
};	