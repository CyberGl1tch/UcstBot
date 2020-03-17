const Discord = require("discord.js");
const botconfig = require("../configs/botconfig.json");
const channelsinfo = require("../configs/channelsinfo.json");
const error = require(`../utils/error.js`)
const emojis = require("../configs/emojis.json");
const fs = require("fs");
const fetchmessages = require(`../configs/toFetchMessages.json`)
const updater = require(`../utils/intervalUpdater.js`)

module.exports.run = async (bot, message, args) => {
      //Checking if bot has permission manage channels
      if(!message.guild.me.hasPermission("MANAGE_CHANNELS") ||!message.guild.me.hasPermission("MANAGE_MESSAGES") ){
        error.run(bot,"Lack of permissions ",message.channel)
        return;
    }
    message.delete(200);
    let moreinfo = bot.emojis.get(emojis.moreinfo)
    let loading = bot.emojis.get(emojis.loading)
    let complete = bot.emojis.get(emojis.tickmark)
    let notify = bot.emojis.get(emojis.notify)
    let setup = new Discord.RichEmbed()
    .setColor(botconfig.color)
    .setDescription(`Wait until we are setting up your new channels 😁\n\n**System: **Creating Category/Channels \n**Status:** ${loading}`)
    .setFooter(botconfig.version)
    .setTimestamp();
    let notifyembed = new Discord.RichEmbed()
    .setColor(botconfig.color)
    .setDescription(`Hey! Want to get **Notified** when a new CTF challenge created!\n Come join our Discord Notification Squad!\n\n**Note: **Just react to the emoji below if you want to receive notifications!\nYou are able to __cancel__ notifications every time just react below again below!\n\n**You must have** \`Allow Direct Messages from server members\` **enabled**\nRight Click the __server icon__ > __Privacy Settings__ > __enable__`)
    .setFooter(botconfig.version)
    .setTimestamp();

    


    let tmp = message.guild.channels.find(c => c.name == channelsinfo.ctftimeCategory)
    if(tmp){
        error.run(bot,"Setup has already been initialized",message.channel)
        return;
    }
  let loadtmp = await message.channel.send(setup)

  //Creating channels and category
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

  //Saving messages into json for feature fetch
  setup.setDescription(`Wait until we are setting up your new channels 😁\n\n**System: **Updating Messages \n**Status:** ${loading}`)
  await loadtmp.edit(setup)
  //Save new Messages into json file
  for (i = 0; i <= 4; i++) {
    let tmpmessage = await ctftimech1.send(i)
    tmpmessage.react(moreinfo)
    fetchmessages[i]={
        messageID: tmpmessage.id,
        channelID: tmpmessage.channel.id,
        reason: "interval"
    }
  }
  let notifymsg = await ctftimech2.send(notifyembed)
  notifymsg.react(notify)


  fetchmessages["5"]={
    messageID: notifymsg.id,
    channelID: notifymsg.channel.id,
    reason: "notifysquad"
}
  fs.writeFile("./configs/toFetchMessages.json", JSON.stringify(fetchmessages,null,4), err =>{
    if(err) throw err;
})
//Update all messages With the api
await updater.updateMessages(bot);
//Inform users
await setup.setDescription(`Setup completed successfully.\n\n**Status:** ${complete}`)
await loadtmp.edit(setup)


}

module.exports.help = {
    name: "setup",
    aliases: []
}