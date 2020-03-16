// CTF Iformations
// Modules: xmlhttprequest , cheerio 
// npm install xmlhttprequest
// npm install cheerio
const request=require("xmlhttprequest");
const cheerio=require('cheerio');
const nowTimeStamp=Date.now();
module.exports.getUpcommingCTF=getUpcommingCTF;
module.exports.isSiteOnline=isSiteOnline;

function httpGet(URL){
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
function informationsAboutCTF(ctfInfos,json,infoToShow,expectetion=false){
	/*
		This function get's
		1) One list that includes the information we want from the API
		2) The json that have the information we need.
		3) how many things to show.

	*/
	let informationCTFList=ctfInfos; // The informations
	let jsonFormat=json; // the json
	let informationMap={}; // create an empty map variable
	let informationShow=infoToShow;
	// getting data
	for (let specificCTF=0;specificCTF<informationShow;specificCTF++){
			// Getting one by one all the informations
			for (let info=0;info<informationCTFList.length;info++){
				// We add  all the informations about the CTF's to map variable
				if (expectetion==false){
					informationMap[`${informationCTFList[info]}_${specificCTF}`]=jsonFormat[specificCTF][informationCTFList[info]];
				}
				else {
					informationMap[`${informationCTFList[info]}_${specificCTF}`]=jsonFormat[informationCTFList[info]];
				}
			}
	}
	return informationMap; // returns the map variable
}
function getUpcommingCTF(){
	/* 
		This function returns
		the informations about	
		the upcoming CTFs events.
		The information is given by the API: https://ctftime.org/api/
	*/
	let upcommingCTFinfo=['start','finish','duration','title','logo','format','id','participants','description','ctftime_url']; // These are the informations we want from the API.
	let getUpcomming=httpGet("https://ctftime.org/api/v1/events/?limit=5&start="+nowTimeStamp+"");
	let jsonFormat=JSON.parse((getUpcomming.replace(/<b[^>]*>/g,'')).replace(/<i[^>]*>/g, '__')); // make the json.	
	let eventsToShow=5; // how many events to show
	let upcommingMap=informationsAboutCTF(upcommingCTFinfo,jsonFormat,eventsToShow); // call the function to get the informations about CTF events
	//console.log(upcommingMap);
	return upcommingMap;
}
function topCTFTeams(year){
	/*
		This Function takes
		year and returns
		the top CTF teams for 
		the input year.
		The information is given by the API: https://ctftime.org/api/
	*/
	let teamTopTeamInfos=['team_name','points','team_id'];
	let getTopTeams=httpGet("https://ctftime.org/api/v1/top/"+year+"/");
	let jsonFormat=JSON.parse(getTopTeams); // make the json.
	let ctfYear=jsonFormat[year];
	let teamToShow=10;
	let topTeamMap=informationsAboutCTF(teamTopTeamInfos,ctfYear,teamToShow);
	return topTeamMap;
}
function GettingCTFTeamIcon(id){
	/*
		This function is getting
		the image path for a specific
		team.
	*/
	let html=httpGet("https://ctftime.org/team/"+id+""); // getting the html content
	let CheerioLoad=cheerio.load(html); // load the data to cheerio
	let siteClass=CheerioLoad('.span2'); // find the class with the name span2
	let classData=siteClass.html(); // get the class data
	let imagePath="https://ctftime.org";
	let count=0; // count the ".
	//	We getting the image path
	for (let path=0;path<=classData.length;path++){
		if (classData[path]=='"'){
			count+=1
		}
		if (count>0 && count<2){
			if (classData[path]!='"'){
				imagePath=imagePath+classData[path];
			}
		}
	}
	return imagePath;
}
function getCTFTeamById(id){
	/*
		This Function takes
		an id and returns
		the information
		about the team
		who has this id.
		The information is given by the API: https://ctftime.org/api/
	*/
	try {
		let specificTeamInfos=['name','country','academic','id','aliases']; // there is the informations we want.
		let getSpecificTeamInfos=httpGet("https://ctftime.org/api/v1/teams/"+id+"/"); // get the informations based on id
		let jsonFormat=JSON.parse(getSpecificTeamInfos); // make the json
		let specificTeam=1;
		let specificTeamMap=informationsAboutCTF(specificTeamInfos,jsonFormat,specificTeam,true); // getting the informations
		let getRating=jsonFormat.rating[0];
		let ratingObjectKeys=Object.keys(getRating)[0]; // getting the keys of the object ratting, in our case the return is year.
		specificTeamMap['rating_points_0']=getRating[ratingObjectKeys].rating_points; // getting the rating points of the CTF team
		specificTeamMap['rating_place_0']=getRating[ratingObjectKeys].rating_place; // getting the rating place of the CTF team
		specificTeamMap['image_path_0']=GettingCTFTeamIcon(id); // getting the image of the team.
		//console.log(specificTeamMap);
		return specificTeamMap;
	}
	catch(e) {
		let error={};
		error['error']="Id not found";
		return error;
	}
}

function isSiteOnline(){
    /*
        This function returns
        boolean data type
        and check if the website
        is up or down.
    */
    let state=httpGet("https://ctftime.org");
    if (!state) {
        return false;
    }
    else {
        return true;
    }
}

function GetLatestEvent(){
    /*
        This function returns
        the latest event.
    */
    let LatsetEventInfo=['start','finish','duration','title','logo','format','id','participants','description','ctftime_url']; // These are the informations we want from the API.
    let getLastEvent=httpGet("https://ctftime.org/api/v1/events/?limit=5&start="+nowTimeStamp+"");
    let jsonFormat=JSON.parse((getLastEvent.replace(/<b[^>]*>/g,'')).replace(/<i[^>]*>/g, '__')); // make the json. 
    let LatestEventMap=informationsAboutCTF(LatsetEventInfo,jsonFormat[4],1,true); // call the function to get the informations about CTF events
    return LatestEventMap;    
}
