const messages = require(`../configs/toFetchMessages.json`)
const ctf = require(`../utils/sendEventFullInfo.js`)

module.exports.run = function (bot, options) {
    bot.on("messageReactionAdd", async (reaction,user) => {

        if(user.id === bot.user.id) return
        for (var id in messages) {
            if(messages[id].hasOwnProperty('channelID') && messages[id].channelID != ""){
                if(reaction.message.id === messages[id].messageID){
                    reaction.remove(user)
                    ctf.sendFullInfo(bot,parseInt(id),user)

                }
                
                
            }
        }

        
    });
}