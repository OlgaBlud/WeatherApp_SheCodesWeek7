let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
let celsiusTemperature = null;
let fahrenheitUnit = document.querySelector("#fahrenheit-unit");
fahrenheitUnit.addEventListener("click", showFahrenheitTemperature);
let celsiusUnit = document.querySelector("#celsius-unit");
celsiusUnit.addEventListener("click", showCelsiusTemperature);
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  searchWeatherForCity(cityInputElement.value);
  // getForecast(cityInputElement.value);
}
function searchWeatherForCity(city) {
  let apiKey = "1a87a8te48d8o34feb04cce044538ce4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  // console.log(apiUrl);
  axios.get(apiUrl).then(displayTemperature);
}
function getForecast(city) {
  let apiKey = "1a87a8te48d8o34feb04cce044538ce4";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let weatherDescription = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let date = document.querySelector("#date");
  let icon = document.querySelector("#icon");
  celsiusTemperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.city;
  weatherDescription.innerHTML = response.data.condition.description;
  humidity.innerHTML = response.data.temperature.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  date.innerHTML = formatDate(response.data.time * 1000);
  icon.setAttribute("src", response.data.condition.icon_url);
  icon.setAttribute("alt", response.data.condition.icon);
  // displayForecast();
  getForecast(response.data.city);
}
function formatDate(timestamp) {
  let currentDate = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${day} ${hours}:${minutes}`;
}
function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  fahrenheitUnit.classList.remove("active");
  celsiusUnit.classList.add("active");
}
function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  fahrenheitUnit.classList.add("active");
  celsiusUnit.classList.remove("active");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
searchWeatherForCity("Kyiv");

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastDayElement = document.querySelector("#weather-forecast");
  let forecastHtml = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index<6){
      forecastHtml =
        forecastHtml +
        `<div class="col-2">
                <div class="weather-forecast-day">${formatDay(
                  forecastDay.time
                )}</div>
                <img
                  src=${forecastDay.condition.icon_url}
                  alt=""
                  width="42"
                />
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max">${Math.round(
                    forecastDay.temperature.maximum
                  )}º</span>
                  <span class="weather-forecast-temperature-min">${Math.round(
                    forecastDay.temperature.minimum
                  )}º</span>
                </div>
              </div>`;
    }
  });
  forecastHtml = forecastHtml + `</div>`;

  forecastDayElement.innerHTML = forecastHtml;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"];
  return days[day];
}
