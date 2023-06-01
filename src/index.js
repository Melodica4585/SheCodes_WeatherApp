//Current date and time

let now = new Date();

let p_class = document.querySelector("p.date");

let date = now.getDate();

let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

let month = monthNames[now.getMonth()];

let weekDayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

let day = weekDayNames[now.getDay()];

let hours = now.getHours();
let minutes = now.getMinutes();

if (hours < 10) {
    hours = `0${hours}`;
}

if (minutes < 10) {
    minutes = `0${minutes}`;
}

p_class.innerHTML = `${day} <br> ${month} ${date} <br> ${hours}:${minutes}`;

//Change city

let searchButton = document.querySelector("#searchButton");
let city = document.querySelector("#city");

function search(event) {
    event.preventDefault();
    let searchCity = document.querySelector("#searchCity");
    searchCity.innerHTML = city.value;
}
searchButton.addEventListener("click", search);

//Celsius to Fahrenheit

function changeFahrenheit(event) {
    event.preventDefault();
    let tempElement = document.querySelector("#gradnow");
    tempElement.innerHTML = "48.2";
}

function changeCelsius(event) {
    event.preventDefault();
    let tempElement = document.querySelector("#gradnow");
    tempElement.innerHTML = "9";
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", changeFahrenheit);
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", changeCelsius);


//Current weather

function showWeather(response) {
    let h2_class = document.querySelector("#searchCity");
    console.log(response.data);
    h2_class.innerHTML = `${response.data.name}`;

    let temperature = Math.round(response.data.main.temp);
    let span = document.querySelector("#gradnow");
    span.innerHTML = `${temperature}`;

    console.log(response.data);
    document.querySelector("#current_precipitation").innerHTML =
    response.data.weather[0].main;
    document.querySelector("#current_sky").innerHTML = response.data.main.humidity;
    document.querySelector("#current_wind").innerHTML = Math.round(
    response.data.wind.speed
    );
}

function searchCity(city) {
    const apiKey = "e0b94a510e1371db880f85653a8e84fe";
    let units = "metric";

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(url).then(showWeather);
}

function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city").value;
    searchCity(city);
}

//Geolocation

function searchLocation(position) {
    const apiKey = "e0b94a510e1371db880f85653a8e84fe";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#searchButton");
searchForm.addEventListener("click", handleSubmit);

let currentForm = document.querySelector("#submitButton");
currentForm.addEventListener("click", getCurrentLocation);

searchCity("New York");