/* Global Variables */
const API_KEY = '&appid=67f1f036f1d0204f97f507300d65c902';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

function convertData(unixtimestamp){
    var months_array = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July','Aug','Sep','Oct','Nov','Dec'];
    var date = new Date(unixtimestamp * 1000);
    var year = date.getFullYear();
    var month = months_array[date.getMonth()];
    var day = date.getDate();
    var convertedTime = month + '/' + day + '/' + year;
    return convertedTime;
}

document.getElementById('generate').addEventListener('click', performanceAction);

//get weather function
function performanceAction(){

    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    getAPIData(baseURL, zip, API_KEY)
        .then(function(data){
            console.log('AllData from api: ', data);

            postWeatherData('/addContent', {
                temperature:data.main.temp,
                data: convertData(data.dt),
                userResponse: feelings
            });
        })
        .then(() => updateUI());
    }

    const getAPIData = async (baseURL, zip, API_KEY) => {
        if (zip.toString().length !==5 ){
            alert('zip should be of length 5!');
        }else{
            const url = `${baseURL}${zip}${API_KEY}`;
            console.log('url data is: ', url);

            const request = await fetch(url);
            try{
                const allData = await request.json();
                if(allData.message){
                    alert(allData.message);
                }else{
                    return allData;
                }
            }catch(error){
                console.log('error', error);
            }

        }
    };

//post data function
const postWeatherData = async (url = '', data={}) => {
    console.log('post weather data: ', data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers:{
            'content-type':'application/json',
        },
        body:JSON.stringify({data})
    });

    try{
        const newData = await response.json();
        console.log('post respone data: ', newData)
    }catch(error){
        console.log("error", error);
    }
};

// update UI function
const updateUI = async() =>{
    const request = await fetch('/all');

    try{
        const data = await request.json();
        console.log('UpdateUI: ', data);
        //对data进行数据处理
        let result = data.data;
        document.getElementById('date').innerHTML = `Date: ${result.date}`;

        document.getElementById('temp').innerHTML = `Temperature: ${result.temperature}`;
        document.getElementById('content').innerHTML =  `Feelings: ${result.userResponse}`;


    }catch(error){
        console.log("error", error);
    }
}








