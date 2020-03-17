const Discord = require("discord.js");
const botconfig = require("../configs/botconfig.json");
const emojis = require("../configs/emojis.json");
const ctf = require("../utils/API.js");
const letterid = require(`../configs/letters.json`);
const toemojis = require(`../utils/toEmojis.js`)
const pointsJSON = require("../configs/points.json");
const notifysquad = require(`../configs/notifysquad.json`)



module.exports.run = async (bot, message, args) => {
    let target=message.guild.member(message.mentions.users.first() || bot.users.find(user => user.username === args[0]));
    let profile = new Discord.RichEmbed()
    .setColor(botconfig.color)
    .setAuthor(`${message.author.username}`,`${message.author.displayAvatarURL}`)
    .addField('User', target,true)
    .addField('Points ', getUserPoints(target),true)
    .addField('Joined Category', 'comming soon',true)
    .setFooter(botconfig.version, botconfig.icon)
    .setTimestamp();
    message.channel.send(profile)
 


}
function getUserPoints(user){
    let points;
    let tmp = pointsJSON.users[user.id]
    if(tmp){
        points = pointsJSON.users[user.id].points
    }else{
        points =0
    }
    return points

}

module.exports.help = {
    name: "profile",
    aliases: []
}