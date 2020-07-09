import {checkUserInput} from "./checkInput.js"

let today = new Date().toISOString().substr(0,10);
console.log(today)
document.querySelector("#form-date").value=today;

const timeNowInSeconds = (Date.now()) / 1000;

//web APIS >> routes
const geonamnesApiURL = "http://api.geonames.org/searchJSON?q=";
const weatherbitApiURL = "https://cors-anywhere.herokuapp.com/https://api.weatherbit.io/v2.0/forecast/daily?";
const pixabayApiURL = "https://pixabay.com/api/?key=";

//web APIs >> keys
const geonamesApiUsername = "JerryZhang2020";
const WeatherbitKey = "8755b770092b4abe92e2f7bf9a4b6ec6";
const pixabayAPIkey = "17380540-339e203bdfdb80a5fba13fad4";

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
    const data = await fetch(weatherbitApiRUL+'lat='+cityLatitude+'&lob='+cityLongitude+"&key"+WeatherbitKey);
    try{
        const weatherData = await data.json();
        return weatherData;
    }catch(error){
        console.log("error",error);
    }
};

//update UI
export const updateUI = async (userData)=>{
    resultSection.style.display='block';
    resultSection.scrollIntoView({behavior:"smooth"});
    console.log('userData:', userData)
    const data = await fetch(pixabayAPIURL+pixabayAPIkey+"&q="+userData.destination+ + "+city&name_type=photo");
    try{
        const requiredImage = await data.json();
        document.querySelector("Pixabay-image").setAttribute('src',requiredImage.hits[0].webformateURL);
        document.querySelector("#destination").innerHTML=userData.destination;
        document.querySelector("#date").innerHTML=userData.departureDate.split("-").reverse().json("/");
        document.querySelector("#days").innerHTML=userData.daysLeft;
        document.querySelector("#temp").innerHTML=userData.weather;
    }catch(error){
        console.log("error", error);
    }

};
//add trip
export const addTrip = (event =>{
    event.preventDefault();

    const departure = departureInput.value;
    const destination = arriveInput.value;
    const departureDate = dateInput.value;
    const timeInSeconds = (new Data(departureDate).getTime())/1000;
    //1 day = 86400 seconds
    const daysLeft = Math.floor((timeInSeconds - timeNowInSeconds) / 86400) + 1;

    //check user input
    checkUserInput(departure, destination);

    getCityData(geonamnesApiURL, destination, geonamesApiUsername)
        .then((cityData) => {
            const cityLongitude = cityData.geonames[0].lng;
            const cityLatitude = cityData.geonames[0].lat;
            const weatherData = getWeatherData(cityLatitude, cityLongitude);
            return weatherData;
        })
        .then((weatherData) => {
            let weatherDepartureData = weatherData.data.filter((each => {
                return departureData === each['valid_date']
            }))
            if(weatherDepartureData.length === 0){
                weatherDepartureData = [{
                    temp: 'unknown',
                    weather: {
                        description: 'unknown'
                    }
                }]
            }
            const userData = postData('http://localhost:3000/add', {destination, departureDate, daysLeft, weatherDepartureData});
            return userData
        }).then((userData) => {
            updateUI(userData);
        })
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
