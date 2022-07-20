function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  metricTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(metricTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "0f0f10bca37612242d03bb7a3cb3baa8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayImperialTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  metricLink.classList.remove("active");
  imperialLink.classList.add("active");
  let imperialTemperature = (metricTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(imperialTemperature);
}

function displayMetricTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  metricLink.classList.add("active");
  imperialLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(metricTemperature);
}

let metricTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handSubmit);

let imperialLink = document.querySelector("#imperial");
imperialLink.addEventListener("click", displayImperialTemperature);

let metricLink = document.querySelector("#metric");
metricLink.addEventListener("click", displayMetricTemperature);

search("New York");
