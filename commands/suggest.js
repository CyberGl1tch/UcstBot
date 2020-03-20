const Discord = require("discord.js");
const botconfig = require("../configs/botconfig.json");
const error = require(`../utils/error.js`)
const emojis = require("../configs/emojis.json");
const time = require("../utils/time.js");
module.exports.run = async (bot, message, args) => {
    
    message.delete(200);
    if(args.length < 1) {
        error.run(bot,"Provide a suggestion\n\n**Usage: **!suggest <text> ",message.channel)
        return;
    }
    let complete = bot.emojis.get(emojis.tickmark)
    let usersToSendMessage = ["182434258508316672","233691963143094284"]
    let suggestion = args.join(" ")
    let uicon = message.author.displayAvatarURL;

    let suggestionembed = new Discord.RichEmbed()
    .setColor(botconfig.color)
    .setAuthor(`${message.author.tag} Submit a Suggestion`,uicon)
    .addField("Suggestion", `⮚${suggestion}`)
    .addField(`Created at: `,time.EuropeTime())
    .setFooter(`Suggestion user ID: ${message.author.id}`)
    .setTimestamp();
    let succeed = new Discord.RichEmbed()
    .setColor(botconfig.color)
    .setDescription(`${complete} Your suggestion delivered successfully ${message.author} ${complete}`)
    .setTimestamp();
    for(var id in usersToSendMessage){
        let tmpuser = await message.guild.members.get(usersToSendMessage[id]);
        try{
          await tmpuser.send(suggestionembed)
          
        }catch(e){
            
        }
    }
    await message.channel.send(succeed)
}

module.exports.help = {
    name: "suggest",
    aliases: []
}