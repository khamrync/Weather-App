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

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector(".number");
  temperatureElement.innerHTML = `${temperature}°`;
}

form.addEventListener("submit", function(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = searchInput.value;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiURL}`).then(showTemperature);
});

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


