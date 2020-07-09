var path = require('path')
// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app =  express();
// Dependencies
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('production'));

//Route for a get request
app.get('/',function(req, res){
    res.sendFile('production/index.html')
})

//POST ROUTE
app.post('/addContent', addData);

function addData(request, response){
    projectData['destination']=request.body.destination;
    projectData['departureData']=request.body.departureData;
    projectData['daysLeft']=request.body.daysLeft;
    projectData['weather']=request.body.weather;
 
    response.send(projectData);

}

// Setup Server
const port = 3000;
const server = app.listen(port, listening);
function listening(){
    console.log("server running");
    console.log(`running on localhost: ${port}`);
}

//GET route
app.get('/all', sendData);
function sendData(request, response){
    response.send(projectData);
};





