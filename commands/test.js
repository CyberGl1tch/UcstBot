const Discord = require("discord.js");
const botconfig = require("../configs/botconfig.json");
const emojis = require("../configs/emojis.json");
const ctf = require("../utils/API.js");
const letterid = require(`../configs/letters.json`);
const toemojis = require(`../utils/toEmojis.js`)
const notifysquad = require(`../configs/notifysquad.json`)



module.exports.run = async (bot, message, args) => {
 for(var id in notifysquad){
     let memberToNotify = bot.users.get(id)
     memberToNotify.send("kakaristikes")
     //console.log(bot.users.get(id).username)
 }

    /*let arg = 2;
let ctfmap = ctf.getUpcommingCTF();
let moreinfo = bot.emojis.get(emojis.moreinfo)
//console.log(ctfmap[`start_0`])
var newDate = new Date();
let title = toemojis.run(bot,"Ctf Time Info")
let ctf1 = new Discord.RichEmbed()
    .setDescription(`${title}\n\n \>\ **__Ctf Title__**\n\`${ctfmap[`title_${arg}`] ? ctfmap[`title_${arg}`] : "*No Title Presented*" }\`\n\n\>\ **__Ctf Description__**\n${ctfmap[`description_${arg}`] ? ctfmap[`description_${arg}`] : "*No Description presented*" }\n\n${moreinfo} If you want more info about this **__CTF Event__** React bellow ${moreinfo}`)
    .setColor(botconfig.color)
    .setThumbnail(`${ctfmap[`logo_${arg}`] ? ctfmap[`logo_${arg}`] : botconfig.error }`)
    .setFooter(`Last Update: ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getUTCSeconds()}`)
let msg = await message.channel.send(ctf1)
msg.react(moreinfo);*/
//console.log( bot.users.find(user => user.username === "magas8"))


}

module.exports.help = {
    name: "test",
    aliases: []
}