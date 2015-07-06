/**
 *@authors: Ramon Inglesias, Thomas von der Ohe 
 *This application uses node.js to handle Alexa Skill requests that:
 *
 * 
 * Dialog model:
 *  User: "Alexa, ask Rikel: What do you think of people that suck? "
 *  Alexa: "They suck. 
 *  User: "Are you sure?"
 *  Alexa: "Yes, absolutely."
 */

var NAMES_LIST = [
	{firstName:"Rikelme", lastName:"Rikel", country: "Spain", age: 27, profession: "Student", favoriteSport: "soccer", hasMoustache: "No", eyeColor:"blue"},
	{firstName:"Ramonster", lastName:"Iglesias", country: "Mexico", age: 26, profession: "Student", favoriteSport: "soccer", hasMoustache: "Yes, but barely.", eyeColor:"blue"},
	{firstName:"Thomasito", lastName:"von der Ohe", country: "Germany", age: 27, profession: "Package deliverer", favoriteSport: "soccer", hasMoustache: "Yes, an impressive one.", eyeColor:"blue"},
 ];


var express = require('express');
var app = express();
var https = require('https');
var http = require('http');
var fs = require('fs');


/**
 * The EchoJSONParser prototype and helper functions
 */
var EchoJSONParser = require('echoJSONParser');

var RikelSkill = function () {
    AlexaSkill.call(this, APP_ID);
};


// This line is from the Node.js HTTPS documentation
var options = {
  key: fs.readFileSync('keys/private-key.pem'),
  cert: fs.readFileSync('keys/certificate.pem')
};


http.createServer(app).listen(8080,  function() {
  console.log("Node app is running at localhost:" + 8080)
});


//Used to use encryption
// https.createServer(options, app).listen(5000, function() {
//   console.log("Node app is running at localhost:" + 5000)
// })


app.get('/', function(request, response) {
  response.send("Hello world")
});


app.post('/', function(request, response){
	var echoJSONParser = new EchoJSONParser('request')

	var responseString = echoJSONParser.createResponse();
	
	response.writeHead(200, {
		"Content-Length": responseString.length,
		"Content-Type": "application/json"
	});

    
  	response.end(responseString)

});

