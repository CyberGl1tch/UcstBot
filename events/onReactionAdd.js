const Discord = require("discord.js");
const botconfig = require("../configs/botconfig.json");
const messages = require(`../configs/toFetchMessages.json`)
const notifysquad = require(`../configs/notifysquad.json`)
const ctf = require(`../utils/sendEventFullInfo.js`)
const emojis = require("../configs/emojis.json");
const fs = require("fs");


module.exports.run = function (bot, options) {
    bot.on("messageReactionAdd", async (reaction,user) => {
        let notify = bot.emojis.get(emojis.notify)
        

        if(user.id === bot.user.id) return
        /*
             This section is for notification
             squad embed!

        */
        if(messages["5"].hasOwnProperty('channelID') && messages["5"].channelID != "" ){
            if(reaction.message.id === messages["5"].messageID){
                reaction.remove(user)
                let target =notifysquad[user.id];
                //Checking if user exist in notify squad 
                if(!target){
                    let noton = new Discord.RichEmbed()
                    .setColor(botconfig.color)
                    .setDescription(`${notify} **You have joined our notification squad!**${notify}\n\nThat means that you will get informed\n whenever __CTFTtime__ uploads a new __Challenge__!`)
                    .setFooter(botconfig.version)
                    .setTimestamp();
                    try{
                        await user.send(noton)
                        notifysquad[user.id]={
                            name: user.username
                        }
                    }catch(e){
                        return
                    }

                }else{
                    let notoff = new Discord.RichEmbed()
                    .setColor(`000000`)
                    .setDescription(`${notify} **You will no longer receive notifications!**${notify}`)
                    .setFooter(botconfig.version)
                    .setTimestamp();
                    try{
                        await user.send(notoff)
                        delete notifysquad[user.id];
                    }catch(e){
                        return
                    }
                    
                }
                fs.writeFile("./configs/notifysquad.json", JSON.stringify(notifysquad,null,4), err =>{
                    if(err) throw err;
                })
                

            }
        }

         /*
             This section is about sending
             full info of a challenge in specific
             user
         */
        for (var id in messages) {
            if(messages[id].hasOwnProperty('channelID') && messages[id].channelID != ""){
                if(reaction.message.id === messages[id].messageID){
                    if(messages[id].reason !== "interval") return;
                    reaction.remove(user)
                    ctf.sendFullInfo(bot,parseInt(id),user)

                }
                
                
            }
        }

        
    });
}