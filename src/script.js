function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  searchCity(cityInput.value);
}

function showTemperature(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let degrees = Math.round(response.data.temperature.current);
  let temperatureElement = document.querySelector("#temperature");
  let currentTempDisplay = `${degrees}°`;

  celsiusTemperature = response.data.temperature.current;

  temperatureElement.innerHTML = currentTempDisplay;
  document.querySelector("#description").innerHTML =
    response.data.condition.description;

  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  iconElement.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
}

function searchCity(city) {
  let apiKey = "2tc65f4a56ff11b58f44548o334d0ad0";
  let units = "metric";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

  axios.get(apiURL).then(showTemperature);
}

function searchMyLocation(position) {
  let apiKey = "2tc65f4a56ff11b58f44548o334d0ad0";

  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let url = `https://api.shecodes.io/weather/v1/current?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchMyLocation);
}
let locationButton = document.querySelector(".btn-outline-secondary");
locationButton.addEventListener("click", getCurrentPosition);

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}
//

function showForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
    }

    forecastHTML =
      forecastHTML +
      `     <div class="card col-2">
                <div class="card-body" id="forecast">
                  <h5 class="card-title weather-forecast-day current-icon">${formatDay(
                    forecastDay.time
                  )}</h5>
 <img
            src=http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
              forecastDay.weather[0].icon
            }.png;
            alt=""
            width="42"
          />

                  <h6 class="temperature-high-low">
                    <span class="forecast-temperature-max"> ${
                      forecastDay.temperature.maximum
                    }°</span> /
                    <span class="forecast-temperature-min">${
                      forecastDay.temperature.minimum
                    }°</span>
                  </h6>
                </div>
          </div>  
             `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//
function getForecast(coordinates) {
  let apiKey = "2tc65f4a56ff11b58f44548o334d0ad0";

  let lat = coordinates.latitude;
  let long = coordinates.longitude;
  let apiForecastUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${long}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiForecastUrl).then(showForecast);
}

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

searchCity("New York");
showForecast();
getForecast(response.data.coord);
