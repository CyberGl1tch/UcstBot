const Discord = require("discord.js");
const botconfig = require("../configs/botconfig.json");
const pointsJSON = require("../configs/points.json");
const error = require(`../utils/error.js`);
const fs = require("fs");

/*
    This command do 3 things:
        1) update user points.
        2) check user points.
        3) create new user.
*/

module.exports.run = async(bot,message,args) => {
    /*
        This block of code 
        communicate with 
        the discord server.
    */

    if (args.length<3) {
        // This line returns an error.
        error.run(bot,"Wrong usage of command!\n\n **@Usage: **!points <remove/add> <user> <pointamount> ",message.channel)
        return
    }
    if (args[0].toLowerCase()=="remove" || args[0].toLowerCase()=="add") {
        let option=args[0]; // remove / add
        let user=args[1]; // username
        // check if the point value is number.
        if (!isNaN(parseInt(args[2]))) {
            let pointValue=parseInt(args[2]); // point value.
            // getting the target.
            let target=message.guild.member(message.mentions.users.first() || bot.users.find(user => user.username === args[1]));
            try {
                if (!(pointsJSON.users[target.id])) {
                    /*
                        Inside this statement we
                        create new user, because
                        he/she doesn't exeists in
                        the json.
                    */
                    let value;
                    if (option=="add") {
                        value=parseInt(args[2]);
                    }
                    else {
                        value=0;
                    }
                    pointsJSON.users[target.id]={
                        name : args[1],
                        points : value
                    }
                }
                else {
                    /*
                        Inside this statement we
                        do the add/remove.
                    */
                    let targetCurrentPoints=pointsJSON.users[target.id].points;
                    let targetNewPoints=0;
                    //let action="";
                    if (option=="add") {
                        targetNewPoints=targetCurrentPoints+pointValue;
                        action="recieved";
                    }
                    else {
                        /*
                              Removes the points
                        */
                        if (targetCurrentPoints>pointValue) {
                            targetNewPoints=targetCurrentPoints-pointValue;
                        }
                        else {
                            targetNewPoints=0;
                        }
                        action="lose";
                    }
                    pointsJSON.users[target.id].points=targetNewPoints;
                    
                }
                // write the new data
                fs.writeFile("./configs/points.json", JSON.stringify(pointsJSON,null,4), err =>{
                    if(err) throw err;
                })
                // Send a complite messege.
                let embedForm=new Discord.RichEmbed()
                    .setColor(botconfig.color)
                    .setDescription('The user '+args[1]+" has "+action+" "+pointValue+" points");
                message.channel.send(embedForm);
            }
            catch(e) {
                // this returns if the user is not in the server.
                error.run(bot,"The user "+args[1]+" is not in this server",message.channel);
                if(e) throw e;
            }
        }
        else {
            // this returns if the user use string instead of number.
            error.run(bot,"The point value must be a number!",message.channel)
            return
        }
    }
    else {
        // this returns if the user use less arguments.
        error.run(bot,"This is not an option\n\n **@Usage: **!points <remove/add> <user> <pointamount>",message.channel)
        return
    }
}

module.exports.help = {
    name : "points",
    aliases: []
}
