
module.exports.BeautifyTime = BeautifyTime
function BeautifyTime(timebefore){    
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let temp = new Date(timebefore)
    let time = `**Date:** ${days[temp.getDay()]} ${temp.getDate()} ${months[temp.getMonth()]} ${temp.getFullYear()}\n**Time:** ${temp.getUTCHours()<10 ? "0"+temp.getUTCHours() : temp.getUTCHours() }:${temp.getUTCMinutes()<10 ? "0"+temp.getUTCMinutes() : temp.getUTCMinutes()}:${temp.getSeconds()}`
    return time;
}

