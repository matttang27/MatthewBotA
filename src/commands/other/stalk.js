const { prefix, token } = require(require.resolve("@root/config.json"));
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	args: [0, 1],
	name: "stalk",
	description: "Edward Stalking",
	usage: `${prefix}stalk`,
	perms: ["MATTHEW"],
	status: 'closed',
	async execute(message, args, other) {
		var admin = other["admin"]
		var bot = other["bot"]
		var commandName = other["commandName"]
		var user = await bot.users.fetch("351132323405889537")
		var embed = new Discord.MessageEmbed()
			.setColor('#26abFF')
			.setDescription("<a:loading:745769231295184959> loading...")

		var sended = await message.channel.send({ embeds: [embed]})
		var e = JSON.parse(fs.readFileSync('edward.json').toString());

		if (args[0] == "h" || args[0] == "history") {
			var pages = []
			h = e.history;
			var year, month, day, hour, minute; current1 = Object.keys(h);
			for (i1 = current1.length - 1; i1 >= 0; i1--) {
				year = current1[i1]; 
				current2 = Object.keys(h[year]);
				for (i2 = current2.length - 1; i2 >= 0; i2--) {
					month = current2[i2]; 
					current3 = Object.keys(h[year][month]);
					for (i3 = current3.length - 1; i3 >= 0; i3--) {
						day = current3[i3]; 
						current4 = Object.keys(h[year][month][day]);
						for (i4 = current4.length - 1; i4 >= 0; i4--) {
							hour = current4[i4]; 
							current5 = Object.keys(h[year][month][day][hour]);
							for (i5 = current5.length - 1; i5 >= 0; i5--) {
								minute = current5[i5]
								for (i6 = h[year][month][day][hour][minute].length - 1; i6 >= 0; i6--) {
									pages.push(h[year][month][day][hour][minute][i6])
								}
							}
						}
					}
				}
			}
			console.log(pages)



			var embed = new Discord.MessageEmbed()
				.setTitle("EDWARD SY History")
				.setThumbnail(user.displayAvatarURL())
		}
		else if (args[0] == "pr" || args[0] == "profile") {
			var embed = new Discord.MessageEmbed()
				.setTitle("EDWARD SY")
				.setDescription("Edward's Sy profile.")
				.setThumbnail(user.displayAvatarURL())
				.addFields([
					{ name: "status", value: e.status == "online" ? "online 🟢" : "offline 🔴" },
					{ name: "Total times on:", value: e.totalA, inline: true },
					{ name: "Total messages", value: e.totalM, inline: true }
				])
				.setTimestamp(Date.now())

			var settings = {
				labels: ["1", "2", "3"],
				data: {
					messages: [1, 50, 5],
					activity: [1, 2, 3]
				},
				type: "Week",
				xlabel: "Day"
			}
			for (i = 0; i < new Date().getDay(); i++) {
				settings.labels.append(i)
			}

			const chart = {
				type: 'line',
				data: {
					labels: settings.labels,
					datasets: [{
						label: 'Messages',
						data: settings.data.messages,
						yAxisID: 'A'
					}, {
						label: 'Times On',
						data: settings.data.activity,
						yAxisID: 'B'
					}]
				},
				options: {
					title: {
						display: true,
						text: `Actions this ${settings.type}`
					},
					scales: {
						xAxes: [{
							gridLines: {
								color: 'rgba(0, 0, 0, 0.1)'
							},
							scaleLabel: {
								display: true,
								labelString: settings.xlabel
							}
						}],
						yAxes: [
							{
								id: 'A',
								type: 'linear',
								position: 'left',
								ticks: {
									beginAtZero: true,
									precision: -1
								},
								scaleLabel: { display: true, labelString: "Messages" }
							}, {
								id: 'B',
								type: 'linear',
								position: 'right',
								ticks: {
									beginAtZero: true,
									precision: 0
								},
								scaleLabel: { display: true, labelString: "Times On" }
							}]
					}
				}
			}
			const encodedChart = encodeURIComponent(JSON.stringify(chart));
			const chartUrl = `https://quickchart.io/chart?c=${encodedChart}`;
			console.log(chartUrl)
			embed.setImage(chartUrl)
			sended.edit(embed)
		}


	}
};	