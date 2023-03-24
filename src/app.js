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

function formatDay(timestamp) {
  let date = new Date(timestamp);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return `${day}`;
}

function getForecast(coordinates) {
  let apiKey = "8a3o3fb9f840a70faae5bc4dtec4f7b2";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;
  axios.get(apiURL).then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.slice(0, 6).forEach(function (forecastDay) {
    forecastHTML += `
          <div class="col-2">
            <div class="forecast-date">${formatDay(
              forecastDay.time * 1000
            )}</div>
              <img
                  src="images/${forecastDay.condition.icon}.png" width=56px/>
                  
                  <div class="forecast-temperatures">
                <span class="forecast-temperature-max">${Math.round(
                  forecastDay.temperature.maximum
                )}°</span
                > <span class="forecast-temperature-min">${Math.round(
                  forecastDay.temperature.minimum
                )}°</span>
              </div>
          </div>
  `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayWeather(response) {
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");

  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let currentWeatherIconElement = document.querySelector(
    "#current-weather-icon"
  );
  celsiusTemperature = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  currentWeatherIconElement.setAttribute(
    "src",
    `images/${response.data.condition.icon}.png`
  );

  getForecast(response.data.coordinates);
}

function searchCity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-search");
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${cityInputElement.value}&key=${apiKey}`;

  axios.get(apiURL).then(displayWeather);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
let city = "London";

// Get weather data

let apiKey = "8a3o3fb9f840a70faae5bc4dtec4f7b2";
let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

axios.get(apiURL).then(displayWeather);

// Search input

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

// Display Fahrenheit

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

// Display Celsius

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
