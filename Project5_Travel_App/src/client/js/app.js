import { checkUserInput } from "./checkInput.js"

// Setting the default date in the form to be today's date 
let today = new Date().toISOString().substr(0, 10);
// console.log(today)
document.querySelector("#form-date").value = today;


// Global variables
const timeNowInSeconds = (Date.now()) / 1000;
// console.log(`The time elapsed in seconds is: ${timeNowInSeconds}`)


// Web APIs >> routes
const geonamesApiURL = 'http://api.geonames.org/searchJSON?q=';
// Adding the cors-anywhere server that adds CORS headers to a request to fix the CORS Error 
const weatherbitApiURL = "https://api.weatherbit.io/v2.0/forecast/daily?";
const pixabayApiURL = "https://pixabay.com/api/?key=";


// Web APIs >> keys
const geonamesApiUsername = "jerryzhang2020";
const WeatherbitKey = '213e079104f44a07b37c0ca166bf31ce';
const pixabayAPIKey = '17380540-339e203bdfdb80a5fba13fad4';



// selecting DOM element 
const resultSection = document.querySelector("#result");
const formSection = document.querySelector("#trip-form");
const resetButton = document.querySelector("#delete");
const departureInput = document.querySelector('#form-departure');
const arrivalInput = document.querySelector('#form-arrival');
const dateInput = document.querySelector('#form-date');


// function postData to POST data to our 'endpoint js object' in our local server 
export const postData = async (url = '', data = {}) => {
    // fetch the data from any given url
    const fetchData = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        destination: data.destination,
        departureDate: data.departureDate,
        daysLeft: data.daysLeft,
        weather: `${data.weatherDepartureDate[0].temp} degrees Celsius, ${data.weatherDepartureDate[0].weather.description}`
      })
    })
    try {
      const userData = await fetchData.json();
      return userData;
    } catch (error) {
      console.log("error", error);
    }
  }
  

// function getCityData to get required city data (latitude, longitude, country) from the geonamesAPI 
export const getCityData = async (geonamesApiURL, arrivalInputText, geonamesApiUsername) => {
    // fetch the data from the geonamesAPI
    const data = await fetch(geonamesApiURL + arrivalInputText + '&maxRows=5&' + 'username=' + geonamesApiUsername);
    try {
        // parse json response 
        const cityData = await data.json();
        return cityData;
    } catch (error) {
        console.log("error", error);
    }
};

// function getWeatherData to get required weather data from the weatherbitAPI
export const getWeatherData = async (cityLatitude, cityLongitude) => {
    // fetch the data from the weatherbitAPI
    const data = await fetch(weatherbitApiURL + 'lat=' + cityLatitude + "&lon=" + cityLongitude + "&key=" + WeatherbitKey);
    try {
        // parse json response
        const weatherData = await data.json();
        return weatherData;
    } catch (error) {
      console.log("error", error);
    }
}

// function updateUI to update the user interface
export const updateUI = async (userData) => {
    resultSection.style.display = 'block';
    resultSection.scrollIntoView({ behavior: "smooth" });
    console.log('userData: ', userData)
    const data = await fetch(pixabayApiURL + pixabayAPIKey + "&q=" + userData.destination + "+city&image_type=photo");
    try {
      const requiredImage = await data.json();
      document.querySelector("#Pixabay-image").setAttribute('src', requiredImage.hits[0].webformatURL);
      document.querySelector("#destination").innerHTML = userData.destination;
      document.querySelector("#date").innerHTML = userData.departureDate.split("-").reverse().join(" / ");
      document.querySelector("#days").innerHTML = userData.daysLeft;
      document.querySelector("#temp").innerHTML = userData.weather;
    }
    catch (error) {
      console.log("error", error);
    }
  }
  
// function addTrip to fire once the submit button is clicked
export const addTrip = (event => {
    event.preventDefault();

    //storing user input data
    const departure = departureInput.value;
    const destination = arrivalInput.value;
    const departureDate = dateInput.value;
    const timeInSeconds = (new Date(departureDate).getTime()) / 1000;
    // 1 day = 86,400 seconds
    const daysLeft = Math.floor((timeInSeconds - timeNowInSeconds) / 86400) + 1;
  
    // function checkInput to validate input 
    checkUserInput(departure, destination);

    getCityData(geonamesApiURL, destination, geonamesApiUsername)
      .then((cityData) => {
        const cityLongitude = cityData.geonames[0].lng;
        const cityLatitude = cityData.geonames[0].lat;
        const weatherData = getWeatherData(cityLatitude, cityLongitude);
        return weatherData;
      })
      .then((weatherData) => {
        console.log('weatherData:', weatherData);
        let weatherDepartureDate = weatherData.data.filter((each => {
          return departureDate === each['valid_date']
        }))
        if(weatherDepartureDate.length === 0) {
          weatherDepartureDate = [{
            temp: 'unknown',
            weather: {
              description: 'unknown'
            }
          }]
        }
        const userData = postData('http://localhost:3000/add', {destination, departureDate, daysLeft, weatherDepartureDate});
        return userData
      }).then((userData) => {
        updateUI(userData);
      })
})



// Adding event listeners to the DOM elements
// delete button
resetButton.addEventListener('click', (event) => {
    event.preventDefault();
    formSection.reset();
    document.querySelector("#form-date").value = today;
    resultSection.style.display = 'none';
})
// form submit
const submitRequest = formSection.addEventListener('submit', addTrip);






export {submitRequest}










