const Discord = require("discord.js");
const botconfig = require("../configs/botconfig.json");
const emojis = require("../configs/emojis.json");
const ctf = require("../utils/API.js");
const fs = require("fs");
const toemojis = require(`./toEmojis.js`)
const messages = require(`../configs/toFetchMessages`)
const latest = require(`../configs/latestctf.json`)
const time = require("../utils/time.js");
const notifysquad = require(`../configs/notifysquad.json`)
const fullinfo = require(`../utils/sendEventFullInfo.js`)
module.exports.updateMessages = updateMessages;

module.exports.run = function (bot) {
    setInterval(async function() {
        updateMessages(bot);
    },3 *60 *1000) // Interval 1 minute



}
async function updateMessages(bot){
    /*
        Checking if ctfTime is online
        else cancel the event
    */
    let isOnline = ctf.isSiteOnline();
    if(!isOnline){
        return;
        console.log("Site is Down")
    }

    /*
        Updating all messages that are in
        json with the new infos
    */
    for (var id in messages) {
        if(messages[id].hasOwnProperty('channelID') && messages[id].channelID != "" && messages[id].reason === 'interval'){
            let arg = 4-id;
            let ctfmap = ctf.getUpcommingCTF();
            let moreinfo = bot.emojis.get(emojis.moreinfo)
            //console.log(ctfmap[`start_0`])
            var newDate = new Date();
            let title = toemojis.run(bot,"Ctf Time Info")
            let cyclectf = new Discord.RichEmbed()
                .setDescription(`${title}\n\n \>\ **__Ctf Title__**\n\`${ctfmap[`title_${arg}`] ? ctfmap[`title_${arg}`] : "*No Title Presented*" }\`\n\n\>\ **__Ctf Description__**\n${ctfmap[`description_${arg}`] ? ctfmap[`description_${arg}`] : "*No Description presented*" }\n\n${moreinfo} If you want more info about this **__CTF Event__** React bellow ${moreinfo}`)
                .setColor(botconfig.color)
                .setThumbnail(`${ctfmap[`logo_${arg}`] ? ctfmap[`logo_${arg}`] : botconfig.error }`)
                .setFooter(`Last Update: ${time.EuropeTimeOnly()}`)
                let tmpmsg = await bot.channels.get(messages[id].channelID)
                if(!tmpmsg){
                    return;
                }
                let cyclemsg = await tmpmsg.fetchMessage(messages[id].messageID)

                cyclemsg.edit(cyclectf)
               // console.log(`Up-Dated ${cyclemsg.channel.name}`)

        }
    }

    /*
        Checking for new ctf
        if new send pm in notification
        squad users
    */
    let latestctfmap = await ctf.GetLatestCTF();
   
    if(latestctfmap[`title_0`] !== latest["CtfTime"].latestTitle){
        for(var id in notifysquad){
            let memberToNotify = bot.users.get(id)
            try{
             await fullinfo.sendFullInfo(bot,0,memberToNotify)// the id here is 0 cause first in full maps is the latest in the full map
            }catch(e){

            }
            
        }

        latest["CtfTime"] ={
            latestTitle: latestctfmap[`title_0`]
        }
    
        fs.writeFile("./configs/latestctf.json", JSON.stringify(latest,null,4), err =>{
            if(err) throw err;
        }) 
    }

}