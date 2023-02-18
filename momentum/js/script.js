import playList from "./playlist.js";
//time, date and greeting
const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");
const greetingElement = document.querySelector(".greeting");
const timeOfDay = getTimeOfDay();
const username = document.querySelector(".name");
//background slider
const body = document.querySelector("body");
let randomNumber;
const slideNextBtn = document.querySelector(".slide-next");
const slidePrevBtn = document.querySelector(".slide-prev");
//weather widget
const city = document.querySelector(".city");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDescription = document.querySelector(".weather-description");
const weatherError = document.querySelector(".weather-error");
const temperature = document.querySelector(".temperature");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
//quote widget
const quote = document.querySelector(".quote");
const quoteAuthor = document.querySelector(".author");
const changeQuoteBtn = document.querySelector(".change-quote");
//audio player
let trackNum = 0;
const audio = document.querySelector("audio");
audio.controls = false;
const player = document.querySelector(".player");
const playBtn = document.querySelector(".play");
const playPrevBtn = document.querySelector(".play-prev");
const playNextBtn = document.querySelector(".play-next");
const playListLength = Object.keys(playList).length;
const playListContainer = document.querySelector(".play-list");
const minimizeBtn = document.querySelector(".minimize_btn");
const song = document.querySelector(".song");
song.innerText = playList[0].title;
const artist = document.querySelector(".artist");
artist.innerText = playList[0].artist;
const albumCover = document.querySelector(".cover");
albumCover.style.backgroundImage = `url(${playList[0].cover})`;
const duration = document.querySelector(".duration");
duration.innerText = playList[0].duration;
const progressBar = document.querySelector(".progress");
const progressBarCont = document.querySelector(".progress_container");
const volumeBtn = document.querySelector(".volume_btn");
const volumeControls = document.querySelector(".volume_controls");
const volumeBarCont = document.querySelector(".volume_bar-container");
const volumeBar = document.querySelector(".volume_bar");
audio.volume = 0.5;

//----------------------TIME & DATE--------------------
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
//------------------------GREETING------------------------------
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
//-------------------LOCAL STORAGE SET & GET--------------------
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

//-----------------------BACKGROUND IMAGE SLIDER--------------------
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

//------------------------WEATHER WIDGET--------------------
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

//-----------------------QUOTE WIDGET--------------------
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

//----------------------AUDIO PLAYER--------------------
function createPlaylist() {
  for (let i = 0; i < playListLength; i++) {
    const li = document.createElement("li");
    playListContainer.append(li);
    li.classList.add("track");
    li.innerText = playList[i].title;
  }
}
// createPlaylist();

function initSong(song) {
  audio.src = song.src;
  song.innerText = song.title;
  artist.innerText = song.artist;
  albumCover.style.backgroundImage = `url(${song.cover})`;
  duration.innerText = song.duration;
}
initSong(playList[trackNum]);

function playAudio() {
  player.classList.add("active");
  playBtn.src = "/assets/img/pause.png";
  audio.play();
}

function pauseAudio() {
  player.classList.remove("active");
  playBtn.src = "/assets/img/play.png";
  audio.pause();
}

playBtn.addEventListener("click", () => {
  const isPlaying = player.classList.contains("active");
  if (isPlaying) {
    pauseAudio();
  } else {
    playAudio();
  }
});

function previousTrack() {
  trackNum--;
  if (trackNum < 0) {
    trackNum = playListLength - 1;
  }
  initSong(playList[trackNum]);
  playAudio();
}
playPrevBtn.addEventListener("click", previousTrack);

function nextTrack() {
  trackNum++;
  if (trackNum > playListLength - 1) {
    trackNum = 0;
  }
  initSong(playList[trackNum]);
  playAudio();
}
playNextBtn.addEventListener("click", nextTrack);
audio.addEventListener("ended", nextTrack);

function updateProgressBar(event) {
  const duration = audio.duration;
  const currentTime = audio.currentTime;
  const progressPercentage = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPercentage}%`;
}
audio.addEventListener("timeupdate", updateProgressBar);

function setProgressBar(event) {
  const width = progressBarCont.clientWidth;
  const clickX = event.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}
progressBarCont.addEventListener("click", setProgressBar);

function setCurrentTime() {
  const current = document.querySelector(".current");
  let seconds = Math.floor(audio.currentTime);
  const minutes = Math.floor(seconds / 60);
  current.innerText = `${String(minutes).padStart(2, 0)}:${String(seconds % 60).padStart(2, 0)}`;
}
audio.addEventListener("timeupdate", setCurrentTime);

function hideVolumeControls() {
  volumeControls.classList.toggle("hidden");
}
volumeBtn.addEventListener("click", hideVolumeControls);

function setVolume(event) {
  const volumeBarWidth = volumeBarCont.clientWidth;
  const clickX = event.offsetX;
  const currentVolume = (clickX / Number(volumeBarWidth)) * 100;
  volumeBar.style.width = `${currentVolume}%`;
  audio.volume = currentVolume / 100;
}
volumeBarCont.addEventListener("click", setVolume);

function muteVolume() {
  audio.volume = 0;
  volumeBtn.classList.toggle("mute");
  if (volumeBtn.classList.contains("mute")) {
    volumeBtn.src = "../assets/img/mute_volume.png";
  } else {
    volumeBtn.src = "../assets/img/volume.png";
    audio.volume = 0.5;
  }
}
volumeBtn.addEventListener("click", muteVolume);

function minimizePlayer() {
  albumCover.classList.toggle("cover_hidden");
}

minimizeBtn.addEventListener("click", minimizePlayer);
