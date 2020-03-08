const Discord = require("discord.js");
const botconfig = require("../configs/botconfig.json");
const emojis = require("../configs/emojis.json");
const ctf = require("../utils/API.js");
const toemojis = require(`./toEmojis.js`)
const messages = require(`../configs/toFetchMessages`)

module.exports.run = function (bot) {
    setInterval(async function() {
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
                    .setFooter(`Last Update: ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getUTCSeconds()}`)
                    let cyclemsg = await bot.channels.get(messages[id].channelID).fetchMessage(messages[id].messageID)
                  //  cyclemsg.edit("hey")
                    cyclemsg.edit(cyclectf)
                   // console.log(`${ctfmap[`title_${arg}`]} --- ${arg}`)

            }
        }

    },1 *60 *1000) // Interval 1 minute
}