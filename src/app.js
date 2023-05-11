// Date and Time //
let now = new Date();

let h4 = document.querySelector("h4");

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
let month = months[now.getMonth()];

let date = now.getDate();
  
h4.innerHTML = `Date: ${month} ${date}`;


let current = new Date();

let h5 = document.querySelector("h5");

let hour = current.getHours();
let minute = current.getMinutes();

h5.innerHTML = `Time: ${hour}:${minute}`;

// Fahrenheit and Celcius //
function tempChange(event) {

  let temp = document.querySelector(".number");
  temp.innerHTML = (`82°`)
}
fahrenheit.addEventListener("click", tempChange);

function tempChange2(event) {
  let temp = document.querySelector(".number");
  temp.innerHTML = (`27°`)
}
celsius.addEventListener("click", tempChange2);

// Display Forecast //
function displayForecast() {
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = "";
  forecastHTML = forecastHTML + `
  <div class="Sunday">
    Sun 
      <img 
        class="weather-icons" 
        src="https://ssl.gstatic.com/onebox/weather/64/sunny.png"> 
    <span class="weekcast">
      Sunny
    </span> 
    <span class="high">
      86°
    </span>
    <span class="low">
      /68°
    </span>
    </div>
        <hr>
  `;
  forecastElement.innerHTML = forecastHTML;
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
  let apiKey = "2d5e0f0b5a89b155a3d8f0e733b3293a";
  let apiOneCall =`https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperail`;
  axios.get(apiOneCall).then(displayForecast);
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
  iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  getForecast(response.data.coord);
}


form.addEventListener("submit", function(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = searchInput.value;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiURL}`).then(showTemperature);
});

function displayForecast(response) {
  let forecastElement = document.querySelector("")
}

// Current Location Button //
function showPosition(position){
  let latitude = position.coords.latitude
  let longitude = position.coords.longitude;
  let apiCall = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiCall}`).then(function(response) {
    let temperature = Math.round(response.data.main.temp);
    let temperatureText = document.querySelector(".number");
    temperatureText.textContent = temperature;
  });
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

document.addEventListener("DOMContentLoaded", function(event) {
  let formButton = document.querySelector("#location");
  formButton.addEventListener("submit", function(event) {
    event.preventDefault();
    getCurrentLocation();
  });
});

displayForecast;