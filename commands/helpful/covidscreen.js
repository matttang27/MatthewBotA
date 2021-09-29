const { prefix, ownerID } = require("../../config.json");
const fs = require('fs');
const Discord = require('discord.js');
const puppeteer = require('puppeteer');
module.exports = {
	args: [0,1,2],
	name: "covidscreen",
	aliases: ["cvs"],
	description: "Dms you a picture of a covid screening result!",
	usage: `${prefix}covidscreen <opt. device | x pixels> <y pixels>`,
	perms: 4,
	async execute(message, args, other) {
		puppeteer.devices['1920x1080'] = {
			name: 'Desktop 1920x1080',
			userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36',
			viewport: {
				width: 1920,
				height: 1080
			}
		}
		puppeteer.devices['1024x768'] = {
			name: 'Desktop 1024x768',
			userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36',
			viewport: {
				width: 1024,
				height: 768
			}
		}

		var admin = other[0]
		var bot = other[1]
		var commandName = other[2]
		var t1 = Date.now();
		let device;
		if (args.length == 0) {
			device = puppeteer.devices['iPhone 6']
		}
		else if (args.length == 1) {
			if (args[0] == "options") {
				var string = ""
				for (i in puppeteer.devices) {
					let temp = puppeteer.deviecs[i]
					string += temp.name + ` (${temp.viewport.x},${temp.viewport.y})\n`
				}
				return message.channel.send(new Discord.MessageEmbed()
				.setTitle("List of puppeteer devices:")
				.setDescription(string)
				.setColor("AQUA")
				.setFooter("m!covidscreening options"))
			}
			device = puppeteer.devices[args[0]]
			if (device == undefined) {
				return message.channel.send(new Discord.MessageEmbed()
				.setTitle("Device not on list")
				.setColor("RED")
				.setDescription("Type m!covidscreening devices for a list of devices, or m!covidscreening <x> <y> for a custom device size")
				)
			}
		}
		else {
			if (!isNan(args[0]) && !isNan(args[1])) {
				device = {
					name: `${args[0]}x${args[1]}`,
					userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36',
					viewport: {
						width: args[0],
						height: args[1]
					}
				}
			}
			else {
				return message.channel.send(new Discord.MessageEmbed()
				.setTitle("Invalid Dimensions")
				.setDescription("Your arguments weren't numbers....")
				.setColor("RED"))
			}
		}
		var sended = await message.channel.send(startEmbed(device))
		const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
			const page = await browser.newPage();
			await page.emulate(device);
			await page.goto("https://covid-19.ontario.ca/school-screening/");
			await sleep(2000)
			let elements;
			elements = await page.$x('//*[@id="reach-skip-nav"]/div/div/div[3]/div[1]/button')
			await elements[0].click() 
			await page.waitForNavigation();
			await page.click('#student');
			elements = await page.$x('//*[@id="main-content"]/div/div/div/div[2]/button')
			await elements[0].click() 
			await page.waitForNavigation();
			elements = await page.$x('//*[@id="reach-skip-nav"]/div/div/div/div[2]/button[2]')
			await elements[0].click()
			await page.waitForNavigation();
			elements = await page.$x('//*[@id="reach-skip-nav"]/div/div/div/div[2]/button[1]')
			await elements[0].click()
			await page.waitForNavigation();
			elements = await page.$x('//*[@id="reach-skip-nav"]/div/div/div/div[2]/button[1]')
			await elements[0].click()
			await page.waitForNavigation();
			await page.click('#none_of_the_above')
			elements = await page.$x('//*[@id="reach-skip-nav"]/div/div/div/div[2]/button')
			await elements[0].click()
			await page.waitForNavigation();
			elements = await page.$x('//*[@id="reach-skip-nav"]/div/div/div/div[2]/button[1]')
			await elements[0].click()
			await page.waitForNavigation();
			await page.screenshot({path: 'covidcheck.png'});
			await browser.close();
			message.author.send(`<@${message.author.id}>, here's your covid check`, {files: ['./covidcheck.png']})
			sended = await sended.edit(endEmbed());
			
		function startEmbed(device) {
			return new Discord.MessageEmbed()
			.setTitle("Simulating covid screen...")
			.setColor("AQUA")
			.setDescription(`Puppeteer is currently simulating a covid screen test that will shortly be sent to you in DMs.\nDevice Used:\n${device.name} (${device.viewport.width}x${device.viewport.height})`)
			.setFooter("Matthew Bot m!covidscreen in progress! Use m!covidscreen devices for a list of devices available")
			.setTimestamp()
		}
		function endEmbed() {
			return new Discord.MessageEmbed()
			.setTitle("Finished Covid Screen!")
			.setColor("GREEN")
			.setDescription(`A screenshot should have been sent to your DM. If it doesn't work, try sending me a message first`)
			.setFooter(`Time taken: ${(Date.now()-t1)/1000} seconds`)
			.setTimestamp()
		}
	}

};	

