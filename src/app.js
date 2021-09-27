let apiKey = "226e21dc75160f9a90d4af371417dcc7";

//Connect to search form results
function locationSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#location-input");

  let city = `${searchInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
let form = document.querySelector("#location-search");
form.addEventListener("submit", locationSearch);

function getForecast(coordinates) {
  let apiKey = "226e21dc75160f9a90d4af371417dcc7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  fahrenheitTemperature = response.data.main.temp;
  let temperatureElement = Math.round(fahrenheitTemperature);
  let city = response.data.name;

  let bigTemperature = document.querySelector("#big-temp");
  bigTemperature.innerHTML = `${temperatureElement}`;

  let replaceCity = document.querySelector("#city-name");
  replaceCity.innerHTML = `${city}`;

  let iconElement = document.querySelector("#icon");

  document.querySelector("#windspeed").innerHTML = response.data.main.humidity;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-condition").innerHTML =
    response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  //Call the Forecast function from line 113.
  displayForecast();

  getForecast(response.data.coord);
}

//Connect to "Current" button
function currentPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;

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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

//Fahrenheit vs Celsius clickables
function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#big-temp");
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFarhenTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#big-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-unit");
fahrenheitLink.addEventListener("click", displayFarhenTemp);

let celsiusLink = document.querySelector("#celsius-unit");
celsiusLink.addEventListener("click", displayCelsiusTemp);

//Multi-day Weather Forecast

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
      <img
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt="Weather icon"
        width="36"
      />
      <div class="weather-forecast-range">
        <span class="weather-forecast-high"> ${Math.round(
          forecastDay.temp.max
        )}° </span>
        <span class="weather-forecast-low"> ${Math.round(
          forecastDay.temp.min
        )}° </span>
      </div>
    </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
