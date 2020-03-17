const Discord = require("discord.js");
const botconfig = require("../configs/botconfig.json");

module.exports.run = async (bot, message, args) => {
    
    message.delete(200);
    let msgping1 = new Date();
    let botping = new Date() - message.createdAt;
    let msgping2 = new Date() - msgping1;
    let pingembed = new Discord.RichEmbed()
        .setColor(botconfig.color)
        .setAuthor(`${message.author.username}`,`${message.author.displayAvatarURL}`)
        .addField('API Ping : ', Math.floor(bot.ping) + 'ms')
        .addField('Bot Ping : ', Math.floor(botping) + 'ms')
        .addField('Average Ping : ', '~' + Math.round(msgping2) + 'ms')
        .setFooter(botconfig.version, botconfig.icon)
        .setTimestamp();
  message.channel.send(pingembed)
}

module.exports.help = {
    name: "ping",
    aliases: []
}