const Discord = require("discord.js");
const botconfig = require("../configs/botconfig.json");
const emojis = require("../configs/emojis.json");
module.exports.run = async (bot, message, args) => {
    message.delete(200);
    const emoji = bot.emojis.get(emojis.questionmark);


    let botembed = new Discord.RichEmbed()
    .setColor(botconfig.color)
    .setTitle("Help Menu")
    .setDescription(`Current prefix: **${botconfig.prefix}**\n\n   ‍   ‍  ‍      ‍      ‍      ‍      ‍      ‍      ‍      ‍      ‍      ‍      ‍    ‍     ‍     ‍       ‍      ‍      ‍      ‍      ‍      ‍      ‍      ‍      ‍      ‍      ‍      ‍      ‍        ‍      ‍      ‍      ‍      ‍      ‍      ‍      ‍      ‍   ${emoji} **__Commands__** ${emoji}`)
    .addField(`**User Commands**`, ` \`help\` \n \`serverinfo\` \n \`userinfo\`  \n \`botinfo\` \n \`suggest\`\n \`profile\` \n \`ping\`  \n Coming Soon..  `,true)
    .addField(`**Administrator Commands**`, `\`announce\`  \n \`points\`  \n Coming Soon..`,true)
    .addField(`**Setup Commands**`, `\`setup\``,true)
    .setFooter(botconfig.version,botconfig.logo)
    .setTimestamp();
  message.channel.send(botembed)
}

module.exports.help = {
    name: "help",
    aliases: []
}