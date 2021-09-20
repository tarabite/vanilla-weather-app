//Connect to main weather results
function locationSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#location-input");

  let apiKey = "226e21dc75160f9a90d4af371417dcc7";
  let city = `${searchInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
let form = document.querySelector("#location-search");
form.addEventListener("submit", locationSearch);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;

  let bigTemperature = document.querySelector("#big-temp");
  bigTemperature.innerHTML = `${temperature}`;

  let replaceCity = document.querySelector("#city-name");
  replaceCity.innerHTML = `${city}`;

  document.querySelector("#windspeed").innerHTML = response.data.main.humidity;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-condition").innerHTML =
    response.data.weather[0].description;
}

//Connect to "Current" button
function currentPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;

  let apiKey = "226e21dc75160f9a90d4af371417dcc7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

//Display the current day and time
let now = new Date();
console.log(now);

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];
let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
let theDate = document.querySelector("#date");
theDate.innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`;
