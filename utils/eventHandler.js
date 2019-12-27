const Discord = require("discord.js");
const fs = require("fs");


module.exports.run = function (bot, folderpath) {
fs.readdir(`${folderpath}`, (err, files) => {

  if(err) console.error(err);

  let jsfiles = files.filter(f => f.split(".").pop() === "js")
  if(jsfiles.length <= 0) {
    console.log("Coulnd't find event.");
    return;
    }

   console.log(`Loading ${jsfiles.length} events!`);
    
   jsfiles.forEach((f, i) =>{
     let props1 = require(`.${folderpath}${f}`);
     console.log(`${i}: ${f} loaded!`);
     i = i+1 
       bot.events.set(props1.run(bot), props1);
   });
     console.log(`All Events Loaded Successfully`);
});;


}