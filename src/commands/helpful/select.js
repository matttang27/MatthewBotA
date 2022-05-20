<<<<<<< HEAD
const { prefix, token } = require("../../../config.json");

=======
>>>>>>> 9e79397123384be9c02f670d44438c53f18e283e
module.exports = {
    args: [-1],
    name: "select",
    description: "Selects from a bunch of inputs",
    usage: `${prefix}select selection`,
    example: `${prefix}select One Two`,
    perms: [],
    async execute(message, args, other) {
        if (args.length == 0) {
            return message.reply("I select.... nothing! Whew, that was a hard choice!");
        }
        var selected = args[Math.floor(Math.random() * args.length)];
        console.log(args, selected);
        message.channel.send(`After careful consideration I have picked... ${selected}!`);
    }
};
