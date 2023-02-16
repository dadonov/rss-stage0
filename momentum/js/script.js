import playList from "./playlist.js";
const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");
const greetingElement = document.querySelector(".greeting");
const timeOfDay = getTimeOfDay();
const username = document.querySelector(".name");
const body = document.querySelector("body");
let randomNumber;
const slideNextBtn = document.querySelector(".slide-next");
const slidePrevBtn = document.querySelector(".slide-prev");
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
const audio = document.querySelector("audio");
audio.controls = false;
const playBtn = document.querySelector(".play");
const playPrevBtn = document.querySelector(".play-prev");
const playNextBtn = document.querySelector(".play-next");
const playListLength = Object.keys(playList).length;
const playListContainer = document.querySelector(".play-list");
let isPlay = false;
let trackNum = 0;
const minimize = document.querySelector(".minimize_btn");
const cover = document.querySelector(".cover");

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString("en-UK", {
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

slideNextBtn.addEventListener("click", getSlideNext);
slidePrevBtn.addEventListener("click", getSlidePrev);

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=f0002bf3f73c9f1f545985301e5142ab&units=metric`;
  const response = await fetch(url);
  const weatherData = await response.json();

  if (response.status === 200) {
    weatherError.innerText = "";
    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${weatherData.weather[0].id}`);
    weatherDescription.textContent =
      weatherData.weather[0].description[0].toUpperCase() +
      weatherData.weather[0].description.slice(1);
    temperature.textContent = `Temperature: ${Math.round(weatherData.main.temp)}°C`;
    wind.textContent = `Wind speed: ${Math.round(weatherData.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${Math.round(weatherData.main.humidity)}%`;
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

function createPlaylist() {
  for (let i = 0; i < playListLength; i++) {
    const li = document.createElement("li");
    playListContainer.append(li);
    li.classList.add("track");
    li.innerText = playList[i].title;
  }
}
createPlaylist();

function playAudio() {
  if (isPlay === false) {
    audio.currentTime = 0;
    audio.src = playList[trackNum].src;
    audio.play();
    isPlay = true;
    // playBtn.classList.add("pause");
    playBtn.src = "/assets/img/pause.png";
    console.log("click");
  } else {
    audio.pause();
    isPlay = false;
    console.log("click");
    playBtn.src = "/assets/img/play.png";
    // playBtn.classList.remove("pause");
  }
}

playBtn.addEventListener("click", playAudio);

function previousTrack() {
  isPlay = false;
  if (trackNum > 0) {
    trackNum--;
  } else {
    trackNum = playListLength - 1;
  }
  playAudio();
}
playPrevBtn.addEventListener("click", previousTrack);

function nextTrack() {
  isPlay = false;
  if (trackNum >= playListLength - 1) {
    trackNum = 0;
  } else {
    trackNum++;
  }
  playAudio();
}


minimize.addEventListener("click", () => {
  cover.classList.toggle("cover_hidden");
});

playNextBtn.addEventListener("click", nextTrack);
audio.addEventListener("ended", nextTrack);
