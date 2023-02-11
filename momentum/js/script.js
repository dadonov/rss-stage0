const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");
const greetingElement = document.querySelector(".greeting");
const timeOfDay = getTimeOfDay();
const username = document.querySelector(".name");
const body = document.querySelector("body");
let randomNumber;
const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");
const city = document.querySelector(".city");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDescription = document.querySelector(".weather-description");
const weatherError = document.querySelector(".weather-error");
const temperature = document.querySelector(".temperature");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const quote = document.querySelector(".quote");
const quoteAuthor = document.querySelector(".author");
const changeQuoteBtn = document.querySelector(".change-quote");

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString("en-US", {
    hour12: false,
  });
  timeElement.innerText = currentTime;
  showDate();
  showGreeting();
  setTimeout(showTime, 1000);
}
showTime();

function showDate() {
  const date = new Date();
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour12: false,
  };
  const currentDate = date.toLocaleDateString("en-US", options);
  dateElement.innerText = currentDate;
}

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  if (hours >= 0 && hours < 6) {
    return "night";
  } else if (hours >= 6 && hours < 12) {
    return "morning";
  } else if (hours >= 12 && hours < 18) {
    return "afternoon";
  } else if (hours >= 18 && hours < 24) {
    return "evening";
  }
}

function showGreeting() {
  const greeting = `Good ${timeOfDay},`;
  greetingElement.innerText = greeting;
}

function setLocalStorage() {
  localStorage.setItem("username", username.value);
  localStorage.setItem("city", city.value);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("username")) {
    username.value = localStorage.getItem("username");
  }
  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
    getWeather(); // have no idea if i need it there
  } else {
    city.value = "Minsk";
  }
}
window.addEventListener("load", getLocalStorage);

function getRandomNum() {
  randomNumber = Math.round(Math.random() * (20 - 1) + 1);
}
getRandomNum();

function setBg() {
  const bgNum = randomNumber.toString().padStart(2, "0");
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/dadonov/Momentum-Images-/master/${timeOfDay}/${bgNum}.webp`;
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
}
setBg();

function getSlideNext() {
  randomNumber++;
  if (randomNumber <= 20) {
    setBg();
  } else {
    randomNumber = 1;
    setBg();
  }
}

function getSlidePrev() {
  randomNumber--;
  if (randomNumber >= 1) {
    setBg();
  } else {
    randomNumber = 20;
    setBg();
  }
}

slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=f0002bf3f73c9f1f545985301e5142ab&units=metric`;
  const response = await fetch(url);
  const weatherData = await response.json();

  if (response.status === 200) {
    weatherError.innerText = "";
    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${weatherData.weather[0].id}`);
    weatherDescription.textContent = weatherData.weather[0].description;
    temperature.textContent = `Temperature: ${weatherData.main.temp.toFixed(0)}°C`;
    wind.textContent = `Wind speed: ${weatherData.wind.speed.toFixed(0)} m/s`;
    humidity.textContent = `Humidity: ${weatherData.main.humidity.toFixed(0)}%`;
  } else {
    weatherError.innerText = "Please, enter the correct location name";
    weatherIcon.className = "weather-icon owf";
    weatherDescription.textContent = "";
    temperature.textContent = "";
    wind.textContent = "";
    humidity.textContent = "";
  }
}

city.addEventListener("change", getWeather);

async function getQuote() {
  const quotesSrc = "/assets/json/quotes_en.json";
  const response = await fetch(quotesSrc);
  const quotesData = await response.json();
  const randomNum = (Math.random() * quotesData.quotes.length).toFixed(0);

  quote.innerText = quotesData.quotes[randomNum].quote;
  quoteAuthor.innerText = quotesData.quotes[randomNum].author;
}

changeQuoteBtn.addEventListener("click", getQuote);
getQuote();
