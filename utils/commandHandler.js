const Discord = require("discord.js");
const fs = require("fs");


module.exports.run = function (bot, folderpath) {
fs.readdir(`${folderpath}`,(err, files) => {
  //console.log(files)
    if(err) console.log(err);
  
    let jsfile = files.filter(f => f.split(".").pop() === "js")
  
    if(jsfile.length <= 0){
      console.log("Could not find commands.");
      return;
    }
    console.log(`Loading ${jsfile.length} Commands`);
    
    jsfile.forEach((f,i) =>{
        let props = require(`.${folderpath}${f}`);
      
        console.log(`${i}: ${f} loaded!`);
        i = i+1
        bot.commands.set(props.help.name, props);
        props.help.aliases.forEach(alias =>{
        bot.aliases.set(alias, props.help.name);
        });
      });
      console.log(`All Commands Loaded Successfully\n`);
    });
    

}