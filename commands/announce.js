const Discord = require("discord.js");
const botconfig = require("../configs/botconfig.json");
const emojis = require("../configs/emojis.json");
const error = require(`../utils/error.js`)

module.exports.run = async (bot, message, args) => {
if(!message.member.hasPermission('ADMINISTRATOR')){
    error.run(bot,"You dont have permission to use that!",message.channel)
    return
} 
message.delete(200)
let anchannel = message.mentions.channels.first()



if(!anchannel){
  error.run(bot,`Required argument missing!\n\n Usage !announce <channel> <text> | [Image link]`,message.channel)
  return;
}
let cmsg = args.join(" ").split(" ")
cmsg.shift()
cmsg = cmsg.join(" ").split("|");



if(!cmsg[0]){
error.run(bot,`Required argument missing!\n\n Usage !announce <channel> <text> | [Image link]`,message.channel)
  return;
}

let announce = bot.emojis.get(emojis.bell)
let sayembed = new Discord.RichEmbed()
.setColor(botconfig.color)
.setTitle(`**UCST Announcements**`)
.setFooter(botconfig.version,botconfig.logo)
.setTimestamp();


let none = cmsg[1]
if(none){
    await sayembed.setDescription(`${cmsg[0]}\n\n${announce} Announcement by: ${message.author}`)
    await sayembed.setImage(cmsg[1]);
  
  }
  else{
      await sayembed.setDescription(`${cmsg[0]}\n\n${announce} Announcement by: ${message.author}`)
    
  }

    try{
      await anchannel.send(sayembed)
      let tmp = await anchannel.send(`@everyone`)
      tmp.delete(100)
    }catch(er){
      error.run(bot,`Bad Image Link\n\n Usage !announce <channel> <text> | [Image link]`,message.channel)
      return;
    }
}

module.exports.help = {
    name: "announce",
    aliases: []
}
  