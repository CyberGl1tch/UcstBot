// CTF Iformations
// Modules: xmlhttprequest
// npm install xmlhttprequest
const request=require("xmlhttprequest");
const nowTimeStamp=Date.now();
function httpGet(URL)
{
	/*
		This function makes a get
		request to a specific	
		API and return the content.
	*/
    var xmlHttp=new request.XMLHttpRequest();
    try{
    	xmlHttp.open("GET",URL,false); // false for synchronous request
    	xmlHttp.send(null);
    	return xmlHttp.responseText; // return the content of the API
    }
    catch(e){
		return false;
	}
}
function getUpcommingCTF(){
	/* 
		This function get's 
		the informations about	
		the upcoming CTFs events.
		The information is given by the API: https://ctftime.org/api/
	*/
	let upCTFinfo=['start','finish','duration','title','logo','format','id','participants','description']; // These are the informations we want from the API.
	let getUpcomming=httpGet("https://ctftime.org/api/v1/events/?limit=5&start="+nowTimeStamp+"");
	let jsonFormat=JSON.parse(getUpcomming.replace(/<\/?[^>]+(>|$)/g, "")); // make the json.
	let upCTFMapInfo={};
	let eventsToShow=5;
	// Getting data.
	for (let event=0;event<eventsToShow;event++){
		// Getting one by one all the informations
		for (let info=0;info<upCTFinfo.length;info++){
			// We create a map that have all the informations about the CTF's.
			upCTFMapInfo[`${upCTFinfo[info]}_${event}`]=jsonFormat[event][upCTFinfo[info]];
	 	}
	}
	return upCTFMapInfo;
}
getUpcommingCTF();
