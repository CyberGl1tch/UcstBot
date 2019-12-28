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
function informationsAboutCTF(ctfInfos,json,infoToShow){
	/*
		This function get's
		1) One list that is the information we want from the API
		2) The json that have the information we need.
		3) how many things to show.

	*/
	let informationCTFList=ctfInfos; // The informations
	let jsonFormat=json; // the json
	let infoCTFMap={}; // create an empty map variable
	let show=infoToShow;
	// getting data
	for (let aboutCTF=0;aboutCTF<show;aboutCTF++){
			// Getting one by one all the informations
			for (let info=0;info<informationCTFList.length;info++){
				// We add  all the informations about the CTF's to map variable
				infoCTFMap[`${informationCTFList[info]}_${aboutCTF}`]=jsonFormat[aboutCTF][informationCTFList[info]];
			}
	}
	return infoCTFMap; // returns the map variable
}
function getUpcommingCTF(){
	/* 
		This function returns
		the informations about	
		the upcoming CTFs events.
		The information is given by the API: https://ctftime.org/api/
	*/
	let upCTFinfo=['start','finish','duration','title','logo','format','id','participants','description']; // These are the informations we want from the API.
	let getUpcomming=httpGet("https://ctftime.org/api/v1/events/?limit=5&start="+nowTimeStamp+"");
	let jsonFormat=JSON.parse((getUpcomming.replace(/<b[^>]*>/g, '')).replace(/<i[^>]*>/g, '__')); // make the json.	
	let eventsToShow=5; // how many events to show
	let upMap=informationsAboutCTF(upCTFinfo,jsonFormat,eventsToShow); // call the function to get the informations about CTF events
	console.log(upMap);
}
function topCTFTeams(year){
	/*
		This Function takes
		year and returns
		the top CTF teams for 
		the input year.
		The information is given by the API: https://ctftime.org/api/
	*/
	let teamInfos=['team_name','points','team_id'];
	let getTopTeams=httpGet("https://ctftime.org/api/v1/top/"+year+"/");
	let jsonFormat=JSON.parse(getTopTeams); // make the json.
	let ctfYear=jsonFormat[year];
	let teamToShow=10;
	let mapOfCTF=informationsAboutCTF(teamInfos,ctfYear,teamToShow);
	console.log(mapOfCTF);
	return mapOfCTF;
}