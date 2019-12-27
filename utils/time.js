const Discord = require("discord.js");
const fs = require("fs");


module.exports.run = function () {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let temp = new Date()
    let time = `**Date:** ${days[temp.getDay()]} ${temp.getDate()} ${months[temp.getMonth()]} ${temp.getFullYear()}\n**Time:** ${temp.getHours()}:${temp.getMinutes()}:${temp.getSeconds()}`
    return time;

}