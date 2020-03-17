const Discord = require("discord.js");
const botconfig = require("../configs/botconfig.json");
const emojis = require("../configs/emojis.json");
const fs = require("fs");



module.exports.run = function (bot, message, channel) {
    let questionmark = bot.emojis.get(emojis.questionmark)
    let error = new Discord.RichEmbed()
     .setColor(botconfig.color)
     .setDescription(`${questionmark} ${message}`)
     .setFooter(botconfig.version)
     .setTimestamp();
     channel.send(error)

}