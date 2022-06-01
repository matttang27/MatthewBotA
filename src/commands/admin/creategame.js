const { prefix, token } = require(require.resolve("@root/config.json"));

module.exports = {
	args: [-1],
	category: "TOS",
	name: "creategame",
	aliases: ["create","crgame","cg","crg"],
	description: "Starts a game",
	usage: `${prefix}start <gamemaster1> <gamemaster2> ...`,
	perms: ["MATTHEW"],
	status: "wip",
	async execute(message, args, other) {

		const db = other["db"];
		const firestore = other["admin"].firestore



		if (args.length == 0) {
			return message.reply("Please add a gamemaster")
		}
		//I just copy pasted this regex sh*t ok I don't understand anything
		var temp = args;
		args = args.map(args => args.replace(/[\\<>@#&!]/g, ""));
		
		console.log(args);


		//gets the game number from the games field in doc 0
		let games = {}
		var gamenum = await db.collection('games').doc('0').get()

		gamenum = gamenum.data()
		gamenum = gamenum.games + 1
		gamenum = gamenum.toString()



		var gamemasters = []

		for (i=0;i<args.length;i++) {
			gamemasters.push(args[i])
		}

		//sends an annoucement for registration
		message.channel.send(`A Game has been created! \n\n**GameID:** ${gamenum} \n**Gamemasters:** ${temp}\n\n`)

		let sent = await message.channel.send(`@everyone Please react on this message if you would like to participate`)


		//creates a doc in collection with details
		const game = await db.collection('games').doc(gamenum).set({
			guildId: message.guild.id,
			gameMasters: gamemasters,
			timeCreated: firestore.Timestamp.fromDate(new Date()),
			signUp: sent.id,
			gameNum: gamenum,
			channelId: message.channel.id
		})
		.catch((err) => console.log(err))

		//modifies the doc 0 to add 1 to the counter
		const updateGame = await db.collection('games').doc('0').set({
			games: parseInt(gamenum)
		})
		
		
	},
};