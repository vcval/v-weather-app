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
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  searchCity(cityInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function getForecast(coordinates) {
  let apiKey = "2tc65f4a56ff11b58f44548o334d0ad0";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=f2f8fa7c83899cc436t9bfbo024d31c4&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let degrees = Math.round(response.data.temperature.current);
  let temperatureElement = document.querySelector("#temperature");
  let currentTempDisplay = `${degrees}°`;

  temperatureElement.innerHTML = currentTempDisplay;
  document.querySelector("#description").innerHTML =
    response.data.condition.description;

  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${weatherData.condition.icon}.png`
  );
  iconElement.setAttribute("alt", weatherData.condition.icon);

  getForecast(weatherData.coordinates);
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

searchCity("New York");
