const Discord = require("discord.js");
const fs = require("fs");


module.exports.run = function (bot, options) {

    bot.on("ready", async () => {
        console.log(`${bot.user.username} is online!`);
        console.log(`Bot is online in ${bot.guilds.size} guilds`)
      
            bot.user.setPresence({
                  game: {
                      name: "Under Maintenance",
                      type: 1
                  }
              });
      });
 

   
 }
