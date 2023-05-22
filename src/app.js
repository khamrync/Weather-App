// Date and Time //
let now = new Date();

let h4 = document.querySelector("h4");

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

let date = now.getDate();

h4.innerHTML = `Date: ${month} ${date}`;

let current = new Date();

let h5 = document.querySelector("h5");

let hour = current.getHours();
let minute = current.getMinutes();

h5.innerHTML = `Time: ${hour}:${minute}`;

//Format Date for Daily Forecast//
function formatDay(timestamp) {
  let date =new Date(timestamp * 1000 );
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

// Fahrenheit and Celcius //
function tempChange(event) {
  let temp = document.querySelector(".number");
  temp.innerHTML = `82°`;
}
fahrenheit.addEventListener("click", tempChange);

function tempChange2(event) {
  let temp = document.querySelector(".number");
  temp.innerHTML = `27°`;
}
celsius.addEventListener("click", tempChange2);

// Display Daily Forecast //
function displayForecast(response) {
  //for hourly temp use the same format but use response.data.hourly//
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");

  
  let forecastHTML = `<div class="row align-items-start">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6)
    forecastHTML =
      forecastHTML +
      `
    <div class="forecast-block row align-items-start">
    <div class="col">
    <span class="days">${formatDay(forecastDay.dt)}</span>
    </div>
    <div class="col">
      <img class="icons" src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" width="42">
    </div>
    <div class="col">
      <span class="max-temp">${Math.round(forecastDay.temp.max)}°</span> <span class="min-temp">/${Math.round(forecastDay.temp.min)}°</span> 
    </div>
  </div>
  </div>
  `;
  });
  forecastElement.innerHTML = forecastHTML;
}

//Display Hourly Forecast//
function hourlyForecast(response) {
  console.log(response.data.hourly);
  let hourly = response.data.hourly;
  let hourlyElement = document.querySelector("#hourly-forecast");

  let hourlyHTML = `<div class="row">`;
  hourly.forEach(function (forecastHour, index) {
    if (index < 5)
  hourlyHTML =
    hourlyHTML +
    `
    <div class="hourly">
            <div class="row">
                <div class="col-2">
                    ${forecastHour.dt} 
                    <img src="http://openweathermap.org/img/wn/${forecastHour.weather[0].icon}@2x.png"
                    width="42">
                    ${Math.round(forecastHour.temp)}
                </div>
            </div>
        </div>
    `;
  });
  hourlyElement.innerHTML = hourlyHTML;
}

// Search engine value //
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");

  let h3 = document.querySelector("h3");
  h3.innerHTML = `${searchInput.value}`;
}
let forms = document.querySelector("#searching");
forms.addEventListener("submit", search);

// Show Current Temperature //
let form = document.querySelector("form");
let apiKey = "2d5e0f0b5a89b155a3d8f0e733b3293a";

// Coordinates //
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "f81614abe2395d5dfecd45b9298041de";
  let apiOneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiOneCall).then(displayForecast).then(hourlyForecast);
}

function showTemperature(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector(".number");
  temperatureElement.innerHTML = `${temperature}°`;
  let descpriptionElement = document.querySelector(".forecast");
  descpriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = searchInput.value;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiURL}`).then(showTemperature);
});

// Current Location Button //
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiCall = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiCall}`).then(function (response) {
    let temperature = Math.round(response.data.main.temp);
    let temperatureText = document.querySelector(".number");
    temperatureText.textContent = temperature;
  });
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

document.addEventListener("DOMContentLoaded", function (event) {
  let formButton = document.querySelector("#location");
  formButton.addEventListener("submit", function (event) {
    event.preventDefault();
    getCurrentLocation();
  });
});

displayForecast();
hourlyForecast();
