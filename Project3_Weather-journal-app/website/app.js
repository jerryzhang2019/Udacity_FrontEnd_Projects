/* Global Variables */
const apiKey = '67f1f036f1d0204f97f507300d65c902';
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//store input
const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');
const btnSubmit = document.getElementById('generate');

//store output
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');

//get weather function
const getWeather = async (apiURL, zipValue)=>{
    const requestURL = apiURL + "zip=" + zipValue + "&appid=" + apiKey;
    const res = await fetch(requestURL)

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
    const requst = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers:{
            'content-type':'application/json',
        },
        body:JSON.stringify({
            date: data.date,
            temp:data.temp,
            content:data.content
        })
    });

    try{
        const result = await requst.json();
        return result
    }catch(error){
        console.log("error", error);
    }
}

// update UI function
const updateUI = async() =>{
    const request = await fetch('/all');
    try{
        const responseData = await request.json();

        date.innerHTML = responseData.date;
        temp.innerHTML = responseData.temp,
        content.innerHTML = responseData.content;
    }catch(error){
        console.log("error", error);
    }
}

//generate data function
function generaetData(event){
    event.preventDefault();
    const zipValue = zip.value;
    const feelingsValue = feelings.value;

    getWeather(apiURL, zipValue)
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







