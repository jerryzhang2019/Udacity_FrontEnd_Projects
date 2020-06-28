var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

var aylien = require('aylien_textapi');
const bodyParser = require('body-parser');

require('dotenv').config()

const textapi = new aylien({
    appilication_id: `${process.env.API_ID}`,
    appilication_key:`${process.env.API_KEY}`
});

const app = express()

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('dist/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.post('/testing',async(req, res, next) =>{
    console.log(req.body);
    try{
        var data=textapi.sentiment({
            'text':req.body.theText
        },function(error,response){
            if(error === null){
                console.log(response);
                res.send(response);
            }
        });

    }catch(error){
        return next(error)
    }
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
