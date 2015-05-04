var express = require('express')
var app = express();
var https = require('https');
var http = require('http');
var fs = require('fs');

// This line is from the Node.js HTTPS documentation.
var options = {
  key: fs.readFileSync('keys/private-key.pem'),
  cert: fs.readFileSync('keys/certificate.pem')
};

// app.set('port', (process.env.PORT || 5000))
// app.use(express.static(__dirname + '/public'))

http.createServer(app).listen(6000,  function() {
  console.log("Node app is running at localhost:" + 6000)
})

https.createServer(options, app).listen(5000, function() {
  console.log("Node app is running at localhost:" + 5000)
})




var EchoJSONParser = require('echoJSONParser')

app.get('/', function(request, response) {
  response.send("Hello wordd")
})


app.post('/', function(request, response){


	var echoJSONParser = new EchoJSONParser('request')

	var responseString = echoJSONParser.createResponse();
	
	response.writeHead(200, {"Content-Type": "application/json"});
  	response.end(responseString)

});



