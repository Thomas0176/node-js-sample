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
	"right":{firstName:"rikel", lastName:"Rikel", country: "Spain", age: 27, profession: "Student", favoriteSport: "soccer", hasMoustache: "No", eyeColor:"blue"},
	"rikel":{firstName:"rikel", lastName:"Rikel", country: "Spain", age: 27, profession: "Student", favoriteSport: "soccer", hasMoustache: "No", eyeColor:"blue"},
	"reichel":{firstName:"rikel", lastName:"Rikel", country: "Spain", age: 27, profession: "Student", favoriteSport: "soccer", hasMoustache: "No", eyeColor:"blue"},
	"ramon":{firstName:"ramon", lastName:"Iglesias", country: "Mexico", age: 26, profession: "Student", favoriteSport: "soccer", hasMoustache: "Yes, but barely.", eyeColor:"blue"},
	"thomas":{firstName:"thomas", lastName:"von der Ohe", country: "Germany", age: 27, profession: "Package deliverer", favoriteSport: "soccer", hasMoustache: "Yes, an impressive one.", eyeColor:"blue"},
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
 https.createServer(options, app).listen(5000, function() {
   console.log("https Node app is running at localhost:" + 5000)
})


app.get('/', function(request, response, next) {
  response.send("Hello world");
  console.log("GET request received");

});



app.post('/', function(request, response, next){
	console.log("POST request received");
	console.log("Request json: " + request.body);
	console.log(request.body.request)


	var echoJSONParser = new EchoJSONParser(request.body);
	
	if (echoJSONParser.requestType !== "IntentRequest"){
		console.log("In 1st if !-- IntentRequest");

		//TODO: define logic for onLaunch and onSessionEnd requests
		response.writeHead(200, {
			"Content-Length": "0",
			"Content-Type": "application/json"
		});
		response.end();
	} else if (echoJSONParser.intent.name=== "GetOpinionOn") {
		console.log("In get opinionON intent");

		console.log ("echoJSONParser.intent.slots.name.value: " + echoJSONParser.intent.slots.name.value);
		var person = NAMES[echoJSONParser.intent.slots.name.value];
		console.log(person);
		
		var responseString = echoJSONParser.createResponse(person);
	
		response.writeHead(200, {
			"Content-Length": responseString.length,
			"Content-Type": "application/json"
		});
	
    	
  		response.end(responseString);
	} else {
		console.log("In last ELSE");

		//TODO: define logic for other intents
		response.writeHead(200, {
			"Content-Length": "0",
			"Content-Type": "application/json"
		});
		response.end();
	}
});

