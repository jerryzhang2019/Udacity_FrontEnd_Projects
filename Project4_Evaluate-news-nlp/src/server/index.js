const dotenv = require('dotenv');
dotenv.config();
//Node Server Config 
var path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
//test 
const mockAPIResponse = require('./mockAPI.js')
//API Requirements 
var aylien = require("aylien_textapi");
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
  });

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const app = express()
app.use(cors())
app.use(express.static('dist'))
app.use(bodyParser.urlencoded({ extended: true}));
  app.use(bodyParser.json())
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})
//test API 
app.get('/test', function (req, res) {
    res.json(mockAPIResponse);
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})
// Post into route
app.post("/article", (req, res) => {
    textapi.sentiment({
      url: req.body.text, 
      mode: 'document'
    }, function(error, response) {
      console.log(response)
      res.send(response)
      if (error === null) {
        console.log(response);
      }
    })
  });
