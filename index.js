// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});


// new API endpoint to get api/whoami endpoint
app.get('/api/whoami', function (req, res) {

  //print to console the headers from api call
  //console.log(req.headers); 

  //print ip address header property, named x-forwarded-for
  console.log(req.headers['x-forwarded-for']);
  //print accept-language header property
  console.log(req.headers['accept-language']);
  //print software header property, named user-agent
  console.log(req.headers['user-agent']);

  //assign ip address to a variable to be added to json
  var userIp = req.headers['x-forwarded-for'];
  //assign accept language to a variable to be added to json
  var userLanguage = req.headers['accept-language'];
  //assign software/user-agent to a variable to be added to json
  var userSoftware = req.headers['user-agent'];
    
  //expected json response
  res.json({
    "ipaddress":userIp,
    "language":userLanguage,
    "software":userSoftware
  }); 
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});