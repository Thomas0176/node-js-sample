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

var NAMES = {
	"Rikel":{firstName:"Rikelme", lastName:"Rikel", country: "Spain", age: 27, profession: "Student", favoriteSport: "soccer", hasMoustache: "No", eyeColor:"blue"},
	"Ramon":{firstName:"Ramonster", lastName:"Iglesias", country: "Mexico", age: 26, profession: "Student", favoriteSport: "soccer", hasMoustache: "Yes, but barely.", eyeColor:"blue"},
	"Thomas":{firstName:"Thomasito", lastName:"von der Ohe", country: "Germany", age: 27, profession: "Package deliverer", favoriteSport: "soccer", hasMoustache: "Yes, an impressive one.", eyeColor:"blue"},
 };

//Starts the express app

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//adds parsing capabilities
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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
  console.log("Node app is running at localhost:" + 8080);
});


//Used to use encryption
// https.createServer(options, app).listen(5000, function() {
//   console.log("Node app is running at localhost:" + 5000)
// })


app.get('/', function(request, response, next) {
  response.send("Hello world");
});



app.post('/', function(request, response, next){

	
	var echoJSONParser = new EchoJSONParser(request.body);
	
	if (echoJSONParser.requestType !== "IntentRequest"){
		//TODO: define logic for onLaunch and onSessionEnd requests
		response.end();
	} else if (echoJSONParser.intent.name=== "GetOpinionOn") {
		var person = NAMES[echoJSONParser.intent.slots.name.value];
		console.log(person);
		
		var responseString = echoJSONParser.createResponse(person);
	
		response.writeHead(200, {
			"Content-Length": responseString.length,
			"Content-Type": "application/json"
		});
	
    	
  		response.end(responseString);
	} else {
		//TODO: define logic for other intents
		response.end();
	}
});

