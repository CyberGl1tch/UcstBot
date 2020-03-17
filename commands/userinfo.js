const Discord = require("discord.js");
const botconfig = require("../configs/botconfig.json");
const error = require(`../utils/error.js`);

module.exports.run = async (bot, message, args) => {
    message.delete(200);
    let user = message.mentions.users.first();
    let member = message.mentions.members.first() || message.guild.members.get(message.author.id);
      if(!user || !member){
      error.run(bot,`User not Found!\n\n Usage !userinfo <user>`,message.channel)
      return
    }
   
    let datecreated = user.createdAt
    let datejoined = member.joinedAt 
  
    let date2 = new Date(new Date() - (message.member.joinedAt / 1000))
      let diff = Date.now() - datejoined
      let final = parseInt(diff)/86400000 

  
  
  
    let userembed = new Discord.RichEmbed()
    .setAuthor(`${user.username}`, user.displayAvatarURL)
    .setColor(botconfig.color)
    .setTimestamp()
    .setFooter(botconfig.version,botconfig.logo)
    .addField("**Username:**", `${user.username}#${user.discriminator}`, true)
    .addField("**Id:**", user.id, true)
    .addField("**Nickname:**", member.displayName, true)
    .addField("**Status:**", user.presence.status, true)
    .addField("**Is Bot:**", user.bot, true)
    .addField("**Game:**", user.presence.game, true)
    .addField("**Account Created At:**", `${datecreated.getDate()}/${datecreated.getMonth()+1}/${datecreated.getFullYear()}`, true)
    .addField("**Joined the Server:**", `${final.toFixed(0)} Days before\n At **${datejoined.getDate()}/${datejoined.getMonth()+1}/${datejoined.getFullYear()}** `, true)
    .addField(`**Roles:**`, `${member.roles.size}`, true)
    message.channel.send(userembed)

}

module.exports.help = {
    name: "userinfo",
    aliases: []
}