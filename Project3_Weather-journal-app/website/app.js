/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?'
let apiKey = '67f1f036f1d0204f97f507300d65c902';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//store input
const zip = document.getElementById('zip');
const feeling = document.getElementById('feeling');
const btnSubmit = document.getElementById('generate');

//store output
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');

//get weather function
const getWeather = async (baseURL, zip,apikey)=>{
    const res = await fetch(baseURL+zip+apikey)
    try{
        const data = await res.json();
        console.log(data)
        return data;
    }catch (error){
        console.log("error",error);
    }
}
//post data function
const postData = async (url = '', data={}) => {
    const respone = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers:{
            'content-type':'application/jsion',
        },
        body:JSON.stringify({
            date: data.date,
            temp:data.temp,
            content:data.content
        })
    });

    try{
        const newData = await response.json();
        return newData
    }catch(error){
        console.log("error", error);
    }
}

// update UI function
const updateUI = async() =>{
    const request = await fetch('/all');
    try{
        const allData = await request.json();

        document.getElementById('zip').innerHTML = allData.zip;
        document.getElementById('feeling').innerHTML = allData.feeling;
        document.getElementById('content').innerHTML = allData.content;
    }catch(error){
        console.log("error", error);
    }
}

//generate data function
function generaetData(event){
    event.preventDefault();
    getWeather(baseURL, zip)
    .then(function(weatherData){
        postData('/addContent',{
            date: newDate,
            temp:weatherData.main.temp,
            content:feeling
        });
    })
    .then(function(resultdata){
        updateUI();
    });
}
// Event listener to add function to existing HTML DOM element
btnSubmit.addEventListener('click', generaetData)







