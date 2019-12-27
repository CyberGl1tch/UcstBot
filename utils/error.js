const Discord = require("discord.js");
const fs = require("fs");



module.exports.run = function (bot, message, channel) {
    let error = new Discord.RichEmbed()
     .setColor(info.color)
     .setDescription(`${message}`)
     .setFooter(info.version)
     .setTimestamp();
     channel.send(error)

}