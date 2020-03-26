const Discord = require("discord.js");
const botconfig = require("../configs/botconfig.json");
const error = require(`../utils/error.js`)
const emojis = require("../configs/emojis.json");


module.exports.run = async (bot, message, args) => {
    
    message.delete(200);
    let complete = bot.emojis.get(emojis.tickmark)
    if (args.length<2) {
        // This line returns an error.
        error.run(bot,"Wrong usage of command!\n\n **Usage: **!newchannel <category> <channelname>",message.channel)
        return
    }
    if(!message.guild.me.hasPermission("MANAGE_CHANNELS") ||!message.guild.me.hasPermission("MANAGE_MESSAGES") ){
        error.run(bot,"Lack of permission ",message.channel)
        return;
    }
    let parrent = await message.guild.channels.find(c=> c.name == args[0])
    console.log(args[0])
    if(!parrent){
        error.run(bot,`Unknown Category **${args[0]}**\n\n **Usage: **!newchannel <category> <channelname> `,message.channel)
        return;
    }
    let htbactiverole = message.guild.roles.get("690643324972826686")
    if(!htbactiverole){
        error.run(bot,`Cant find htb-active role contact with bot administrator! `,message.channel)
        return;
    }
    let newchannel = await message.guild.createChannel(`${args[1]}`,{
        type: "text"
    })
  await  newchannel.overwritePermissions(message.guild.id, {
        SEND_MESSAGES: false,
        VIEW_CHANNEL: false
      })
  await newchannel.overwritePermissions(htbactiverole.id, {
        SEND_MESSAGES: true,
        VIEW_CHANNEL: true
      })
      newchannel.setParent(parrent)
      let succeed = new Discord.RichEmbed()
      .setColor(botconfig.color)
      .setDescription(`${complete} New channel created successfully ${complete}\n\n**Channel: ** ${newchannel}`)
      .setTimestamp();
      message.channel.send(succeed)
}

module.exports.help = {
    name: "newchannel",
    aliases: ["channel"]
}