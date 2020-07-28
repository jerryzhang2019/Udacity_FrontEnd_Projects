var path = require('path');

// Empty JS object as an endpoint for all routes
let projectData = {};

// Getting express package to run the server and the routes
const express = require('express');

// An instance of express
const app = express();

/* Middleware*/
// Dependencies: body-parser
const bodyParser = require('body-parser');

// using body-parser as a middleware in the app (BodyParser config)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Dependencies: cors
const cors = require('cors');

// using cors for cross origin allowance in the app
app.use(cors());

// Initialize the main project file
app.use(express.static('production'));


// Route for a GET request
app.get('/', function (req, res) {
  res.sendFile('production/index.html')
})

// Route for a POST request
app.post('/add', addData);

function addData(request, response) {
  projectData['destination'] = request.body.destination;
  projectData['departureDate'] = request.body.departureDate;
  projectData['daysLeft'] = request.body.daysLeft;
  projectData['weather'] = request.body.weather;
  response.send(projectData);
}

// Setup Server
const port = 3000;
const server = app.listen(port, listeningToServer);

function listeningToServer() {
  console.log(`running on localhost: ${port}`);
};
