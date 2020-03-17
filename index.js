const botconfig = require("./configs/botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");
const cmdHandler = require("./utils/commandHandler.js");
const eventHandler = require("./utils/eventHandler.js");
bot.commands = new Discord.Collection();
bot.events = new Discord.Collection();
bot.aliases = new Discord.Collection();


    cmdHandler.run(bot,"./commands/")
    eventHandler.run(bot,"./events/")
      bot.on("message", async message => {

        if (message.channel.type === 'dm' ){
          return;
        
        }
        
        let prefix = botconfig.prefix;
        let args = message.content.slice(prefix.length).trim().split(` `)
        let cmd = args.shift().toLowerCase()
        let commandfile
        if(!message.content.startsWith(prefix)) return;
        if(bot.commands.has(cmd)){
          commandfile = bot.commands.get(cmd)
        }else{
          commandfile = bot.commands.get(bot.aliases.get(cmd))
        }
        if(commandfile) commandfile.run(bot,message,args,prefix);
        

      });



bot.login(botconfig.token);