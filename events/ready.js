
const fetchMessages = require("../utils/fetchMessages.js");
const ctfupdater = require("../utils/intervalUpdater.js");
module.exports.run = function (bot, options) {

    bot.on("ready", async () => {
        fetchMessages.run(bot);
        ctfupdater.run(bot);
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
