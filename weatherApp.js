function updatedWEather(response) {
    let temperatureElement = document.querySelector(".temp-standard"); // Change to querySelector
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#current-data");
    let descriptionElement  = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windspeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
   

    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windspeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    timeElement.innerHTML = formatData(date);
    temperatureElement.innerHTML = Math.round(temperature) + "°C";
 displayforecast(response.data.city);
}



function formatData(date){
    let minutes = date.getMinutes();
      let hours = date.getHours();
    let days = ["Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
];
 if(minutes <10) {
       minutes = `0${minutes}`;
    }

       
       
             let day = days[date.getDay()];
  return `${day}  ${hours}:${minutes}`
  
}
function searchCity(city) {
    let apiKey = "78o1309884534590dt047b4a23f7d6b9"; 
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(updatedWEather);
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city");
    searchCity(city.value); 
}
function Displayday(timestamp){
let date = new Date(timestamp * 1000);
let days = ['Sun','Mon','Tue','Wed','Thurs','Fri','Sat'];
return days[date.getDay()];
}

function displayforecast(city) {
    let apiKey = "78o1309884534590dt047b4a23f7d6b9"; 
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(display);
}

function display(response) {
    console.log(response.data);
    
    let forecastHtml = ""; 

    response.data.daily.forEach(function (day, index) {
        if (index < 5){
        forecastHtml += `
        <div class="forecast-day">
            <div>${Displayday(day.time)}</div>
            <div><img src="${day.condition.icon_url}" class="forecast-icon"/></div>
            <div class="forecast-temps">
                <div class="forecast-temp">${Math.round(day.temperature.maximum)}°C</div>
                <div class="forecast-temp">${Math.round(day.temperature.minimum)}°C</div>
            </div>
        </div>
        `;
        }
    });

    let forecastElement = document.querySelector("#forecast"); 
    forecastElement.innerHTML = forecastHtml;
}
let searchFormElement = document.querySelector(".searchForm");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Kigali");
document.addEventListener("DOMContentLoaded", display);
