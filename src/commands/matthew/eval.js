module.exports = {
    args: [-1],
    aliases: ["evaluate"],
    name: "eval",
    description: "Evaluates string",
    usage: `${prefix}eval`,
    perms: ["MATTHEW"],
    async execute(message, args, other) {
        var admin = other[0];
        var bot = other[1];
        var commandName = other[2];
        eval("(async () => {" + args.join(" ") + "})()");
    }
};
