const Discord = require("discord.js");
const botconfig = require("../configs/botconfig.json");

module.exports.run = async (bot, message, args) => {
    message.delete(200);
      function checkBots(guild) {
      let botCount = 0; 
      guild.members.forEach(member => { 
        if(member.user.bot) botCount++; 
      });
      return botCount; 
    }
  
    const verificationLevel = message.guild.verificationLevel;
    const verificationLevels = ['None', 'Easy', 'Medium', 'High', 'Extreme']
    let cembed = new Discord.RichEmbed()
     .setThumbnail(`${message.guild.iconURL}`, true)
     .setFooter(botconfig.version,botconfig.logo)
     .setTimestamp()
     .addField("**Server**", `Name: ${message.guild.name}\nID: ${message.guild.id}\nServer Region: ${message.guild.region}`, true)
     .addField("**Owner**", `Tag: ${message.guild.owner.user.tag}\nID: ${message.guild.owner.user.id}\nStatus: ${message.guild.owner.user.presence.status}`, true)
     .addField("**Channels**", `${message.guild.channels.filter(channel => channel.type == 'voice').size} Voice\n${message.guild.channels.filter(channel => channel.type == 'text').size} Text\n${message.guild.channels.filter(channel => channel.type == 'category').size} Categorys`, true)
     .addField("**Members**",`Users: ${message.guild.members.filter(m => !m.user.bot).size}\nBots: ${checkBots(message.guild)}`, true)
     .addField("**Verification level**", verificationLevels[verificationLevel], true)
     .addField("**Roles**", `${message.guild.roles.size}`, true)
      .setColor(botconfig.color)
       message.channel.send(cembed);
  
}

module.exports.help = {
    name: "serverinfo",
    aliases: []
}