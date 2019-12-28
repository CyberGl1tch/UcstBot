let letterid = require(`../configs/letters.json`);


module.exports.run = function (bot,string) {
//Tranform a string into an emoji string
    let x = string.split("").map(c =>
    `${bot.emojis.get(letterid[`${c}`.toLowerCase()])}`
    ).join("")
    return x;

}