
module.exports.BeautifyTime = BeautifyTime
module.exports.EuropeTime = EuropeTime
function BeautifyTime(timebefore){    
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let temp = new Date(timebefore)
    let time = `**Date:** ${days[temp.getDay()]} ${temp.getDate()} ${months[temp.getMonth()]} ${temp.getFullYear()}\n**Time:** ${temp.getUTCHours()<10 ? "0"+temp.getUTCHours() : temp.getUTCHours() }:${temp.getUTCMinutes()<10 ? "0"+temp.getUTCMinutes() : temp.getUTCMinutes()}:${temp.getSeconds()}`
    return time;
}
function EuropeTime(timenow){    
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let temp1 = new Date().toLocaleString("en-US", {timeZone: "Europe/Athens"});
    temp1 = temp1.replace("AM","").trim()
    let list = temp1.split(",")
    let date = list[0].trim().split("/")
    let hour = list[1].trim().split(":")
    //console.log(date)
    //console.log(hour)
    let time = `**Date:** ${days[date[0]]} ${date[0]} ${months[date[1]]} ${date[2]}\n**Time:** ${parseInt(hour[0])<10 ? "0"+parseInt(hour[0]) : parseInt(hour[0]) }:${parseInt(hour[1])<10 ? "0"+parseInt(hour[1]) : parseInt(hour[1])}:${parseInt(hour[2])}`
    return time;
}

