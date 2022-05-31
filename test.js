const fs = require("fs");
const emoji = require("./src/constants/emojiCharacters.js")

fs.writeFileSync("./src/constants/emojiCharacters.json",JSON.stringify(emoji));