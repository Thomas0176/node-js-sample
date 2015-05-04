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

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

// http.createServer(app).listen(5000);
https.createServer(options, app)




var EchoJSONParser = require('echoJSONParser')

app.get('/', function(request, response) {
  var echoJSONParser = new EchoJSONParser('request')
  response.send(echoJSONParser.getRequestObject())
})


app.post('/', function(request, response){


	var echoJSONParser = new EchoJSONParser('request')

	var responseString = echoJSONParser.createResponse();
	
	response.writeHead(200, {"Content-Type": "application/json"});
  	response.end(responseString)

});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

