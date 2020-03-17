const Discord = require("discord.js");
const botconfig = require("../configs/botconfig.json");
const channelsinfo = require("../configs/channelsinfo.json");
const error = require(`../utils/error.js`)
const emojis = require("../configs/emojis.json");
const fs = require("fs");
const fetchmessages = require(`../configs/toFetchMessages.json`)
const updater = require(`../utils/intervalUpdater.js`)

module.exports.run = async (bot, message, args) => {
    message.delete(200);
    let moreinfo = bot.emojis.get(emojis.moreinfo)
    let loading = bot.emojis.get(emojis.loading)
    let complete = bot.emojis.get(emojis.tickmark)
    let setup = new Discord.RichEmbed()
    .setColor(botconfig.color)
    .setDescription(`Wait until we are setting up your new channels 😁\n\n**Status:** ${loading}`)
    .setFooter(botconfig.version)
    .setTimestamp();
    

    if(!message.guild.me.hasPermission("MANAGE_CHANNELS")){
        error.run(bot,"Lack of permission manage channels ",message.channel)
       // loadtmp.delete();
        return;
    }
    let tmp = message.guild.channels.find(c => c.name == channelsinfo.ctftimeCategory)
    if(tmp){
        error.run(bot,"Channels already exist ",message.channel)
       //loadtmp.delete();
        return;
    }
    let loadtmp = await message.channel.send(setup)
  let ctftimecat = await message.guild.createChannel(channelsinfo.ctftimeCategory,{
     type: "category"
   })
  let ctftimech1 = await message.guild.createChannel(channelsinfo.ctftimeChannel1,{
    type: "text"
  })
  let ctftimech2 = await message.guild.createChannel(channelsinfo.ctftimeChannel2,{
    type: "text"
  })
  ctftimech1.setParent(ctftimecat)
  ctftimech2.setParent(ctftimecat)
  
  for (i = 0; i <= 4; i++) {
    let tmpmessage = await ctftimech1.send(i)
    tmpmessage.react(moreinfo)
    fetchmessages[i]={
        messageID: tmpmessage.id,
        channelID: tmpmessage.channel.id,
        reason: "interval"

    }
  }
  fs.writeFile("./configs/toFetchMessages.json", JSON.stringify(fetchmessages,null,4), err =>{
    if(err) throw err;
})
await updater.updateMessages(bot);
let setupcomplete = new Discord.RichEmbed()
.setColor(botconfig.color)
.setDescription(`Setup completed successfully.\n\n**Status:** ${complete}`)
.setFooter(botconfig.version)
.setTimestamp();
await loadtmp.edit(setupcomplete)


}

module.exports.help = {
    name: "setup",
    aliases: []
}