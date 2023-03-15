function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function displayWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let currentWeatherIconElement = document.querySelector(
    "#current-weather-icon"
  );

  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  currentWeatherIconElement.setAttribute(
    "src",
    `images/${response.data.condition.icon}.png`
  );
}

function searchCity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-search");
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${cityInputElement.value}&key=${apiKey}`;

  axios.get(apiURL).then(displayWeather);
}

let city = "London";

// Get weather data

let apiKey = "8a3o3fb9f840a70faae5bc4dtec4f7b2";
let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

axios.get(apiURL).then(displayWeather);

// Search input

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);
