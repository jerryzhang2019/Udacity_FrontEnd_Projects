import {checkUserInput} from "./checkInput.js"

let today = new Date().toISOString().substr(0,10);
console.log(today)
document.querySelector("#form-date").value=today;

const timeNowInSeconds = (Date.now()) / 1000;

//web APIS >> routes
const geonamnesApiURL = "";
const weatherbitApiRUL = "";
const pixabayApiURL = "";

//web APIs >> keys
const geonamesApiUsername = "ADD YOUR USERNAME";
const WeatherbitKey = "ADD YOUR KEY";
const pixabayAPIkey = "ADD YOUR KEY";

//selecting DOM element
const resultSection = document.querySelector("#result");
const formSection = document.querySelector("#trip-form");
const resetButton = document.querySelector("#delete");
const departureInput = document.querySelector("#form-departure");
const arriveInput = document.querySelector("#form-arrival");
const dateInput = document.querySelector("#form-date");

//post date to our local server
export const postData = async(url='', data={}) =>{
    const fetchData = await fetch(url,{
        method: "POST",
        credentials:"same-origin",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            destination: data.destination,
            departureDate:data.departureDate,
            daysLeft:data.daysLeft,
            weather:`${data.weatherDepartureData[0].temp} degrees Celsius, ${data.weatherDepartureData[0].weather.description}`
        })
    })
    try{
        const userData = await fetchData.json();
        return userData;
    }catch(error){
        console.log("error", error);
    }
}

//get city data
export const getCityData = async (geonamesApiURL, arriveInputText,geonamesApiUsername)=>{
    const data=await fetch(geonamesApiURL + arriveInputText+'&maxRows=5&'+'username='+geonamesApiUsername);
    try{
        const cityData = await data.json();
        return cityData;
    }catch(error){
        console.log("error",error);
    }
};
//get weather data
export const getWeatherData = async(cityLatitude, cityLongitude) =>{

    try{
        const weatherData = await data.json();
        return weatherData;
    }catch(error){
        console.log("error",error);
    }
};

//update UI
export const updateUI = async (userData)=>{

};
//add trip
export const addTrip = (event =>{
    event.preventDefault();
})


//adding event listeners
resetButton.addEventListener('click', (event) =>{
    event.preventDefault();
    formSection.reset();
    document.querySelector("#form-date").value = today;
    resultSection.style.display="none";
})


//submit
const submitRequest = formSection.addEventListener('submit', addTrip);
export {submitRequest}
