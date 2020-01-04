const Discord = require("discord.js");
const botconfig = require("../configs/botconfig.json");
const ctf = require("../utils/API.js");
const time = require("../utils/time.js");
const toemojis = require(`./toEmojis.js`)



function sendFullInfo(bot,arg,user){

    let ctfmap = ctf.getUpcommingCTF();

    arg = 4-arg
    var newDate = new Date();
    let title = toemojis.run(bot,"Ctf Time Info")
    let ctfinfo = new Discord.RichEmbed()
        .setDescription(`${title}\n\n \>\ **__Ctf Title__**\n\`${ctfmap[`title_${arg}`] ? ctfmap[`title_${arg}`] : "*No Title Presented*" }\`\n\n\>\ **__Ctf Description__**\n${ctfmap[`description_${arg}`] ? ctfmap[`description_${arg}`] : "*No Description presented*" }\n\n\>\ **__Start Date__**\n${ctfmap[`start_${arg}`] ? time.BeautifyTime(ctfmap[`start_${arg}`]) : "*No Start Date presented*" }\n\n\>\ **__Finish Date__**\n${ctfmap[`finish_${arg}`] ? time.BeautifyTime(ctfmap[`finish_${arg}`]) : "*No Finish Date presented*" }\n\n\>\ **__Event Duration__**\n**Days:** ${ctfmap[`duration_${arg}`].days}  /  **Hours:** ${ctfmap[`duration_${arg}`].hours}\n\n\>\ **__Participants__**\n${ctfmap[`participants_${arg}`]}\n\n\>\ **__Format__**\n${ctfmap[`format_${arg}`] ? ctfmap[`format_${arg}`] : "*No format presented*" }\n\n\>\ **__CTF Time URL__**\n[Click Me link](${ctfmap[`ctftime_url_${arg}`]})`)
        .setColor(botconfig.color)
        .setThumbnail(`${ctfmap[`logo_${arg}`] ? ctfmap[`logo_${arg}`] : botconfig.error }`)
        .setFooter(`Last Update: ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getUTCSeconds()}`)
        try{ 
             user.send(ctfinfo)
        }catch(e){

        }

}


module.exports.sendFullInfo = sendFullInfo;

