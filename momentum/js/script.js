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
const photoFeeds = document.querySelectorAll(".feed");
const submitTagBtn = document.querySelector(".submit");
let currentPhotoAPI;
let photoTags;
//weather widget
const city = document.querySelector(".city");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDescription = document.querySelector(".weather-description");
const weatherError = document.querySelector(".weather-error");
const temperature = document.querySelector(".temperature");
const wind = document.querySelector(".wind");
const windIcon = document.querySelector(".wind_ico");
const humidity = document.querySelector(".humidity");
const humidityIcon = document.querySelector(".humidity_ico");
//quote widget
const quote = document.querySelector(".quote_text");
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
const playlistBtn = document.querySelector(".playlist_btn");
const playerCont = document.querySelector(".player_container");
const closeBtn = document.querySelector(".close_btn");
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
const playerButtonsCont = document.querySelector(".buttons");
const volumeBtn = document.querySelector(".volume_btn");
const volumeControls = document.querySelector(".volume_controls");
const volumeBarCont = document.querySelector(".volume_bar-container");
const volumeBar = document.querySelector(".volume_bar");
audio.volume = 0.5;
//translation
let appLang = "en";
const langButtons = document.querySelectorAll(".language");
const langHeading = document.querySelector(".language_heading");
const languageDesc = document.querySelector(".language_desc");
const ruButton = document.querySelector(".ru");
const enButton = document.querySelector(".en");
const showMenuHeading = document.querySelector(".show_heading");
const showMenuDesc = document.querySelector(".show_desc");
const greetingLabel = document.querySelector(".greeting_label");
const timeLabel = document.querySelector(".time_label");
const dateLabel = document.querySelector(".date_label");
const quoteLabel = document.querySelector(".quote_label");
const weatherLabel = document.querySelector(".weather_label");
const audioLabel = document.querySelector(".audio_player_label");
const todoLabel = document.querySelector(".todo_label");
const photosHeading = document.querySelector(".photos_heading");
const photosDesc = document.querySelector(".photos_desc");
const tagInputDesc = document.querySelector(".tag_input_desc");
const tagInput = document.querySelector(".tag_input");
// show & hide sections
let disabledSwitches = [];
const toggleSwitches = document.querySelectorAll(".section_switch");

//-------------------LOCAL STORAGE SET & GET--------------------
function setLocalStorage() {
  localStorage.setItem("language", appLang);
  localStorage.setItem("city", city.value);
  localStorage.setItem("username", username.value);
  localStorage.setItem("currentPhotoAPI", currentPhotoAPI);
  localStorage.setItem("photoTags", photoTags);
  localStorage.setItem("disabledSwitches", JSON.stringify(disabledSwitches));
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("language")) {
    appLang = localStorage.getItem("language");
  } else {
    appLang === "en";
  }
  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
  } else {
    appLang === "en" ? (city.value = "Minsk") : (city.value = "Минск");
  }
  if (localStorage.getItem("username")) {
    username.value = localStorage.getItem("username");
  }
  if (localStorage.getItem("currentPhotoAPI")) {
    currentPhotoAPI = localStorage.getItem("currentPhotoAPI");
  } else {
    currentPhotoAPI = "github";
  }
  if (localStorage.getItem("photoTags")) {
    photoTags = localStorage.getItem("photoTags");
  } else {
    photoTags = `${timeOfDay}`;
  }
  if (JSON.parse(localStorage.getItem("disabledSwitches"))) {
    disabledSwitches = JSON.parse(localStorage.getItem("disabledSwitches"));
  } else {
    disabledSwitches = [];
  }
}
window.addEventListener("load", getLocalStorage);

//----------------------TIME & DATE--------------------
function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString(appLang);
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
  const currentDate = date.toLocaleDateString(appLang, options);
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
  let lang = localStorage.getItem("language");
  if (lang === "en") {
    greetingElement.innerText = `Good ${timeOfDay},`;
  } else if (lang === "ru") {
    if (timeOfDay === "night") {
      greetingElement.innerText = "Доброй ночи,";
    } else if (timeOfDay === "morning") {
      greetingElement.innerText = "Доброе утро,";
    } else if (timeOfDay === "afternoon") {
      greetingElement.innerText = "Добрый день,";
    } else if (timeOfDay === "evening") {
      greetingElement.innerText = "Добрый вечер,";
    }
  }
}

//------------------------WEATHER WIDGET--------------------
async function getWeather() {
  const lang = localStorage.getItem("language");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=f0002bf3f73c9f1f545985301e5142ab&units=metric`;
  const response = await fetch(url);
  const weatherData = await response.json();

  if (response.status === 200) {
    weatherError.innerText = "";
    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${weatherData.weather[0].id}`);
    weatherDescription.textContent =
      weatherData.weather[0].description[0].toUpperCase() +
      weatherData.weather[0].description.slice(1);
    temperature.textContent = `${Math.round(weatherData.main.temp)}°C`;
    wind.textContent = `${Math.round(weatherData.wind.speed)} m/s`;
    humidity.textContent = `${Math.round(weatherData.main.humidity)}%`;
    windIcon.classList.remove("hidden");
    humidityIcon.classList.remove("hidden");
  } else {
    weatherError.innerText = "Please, enter the correct location name";
    weatherIcon.className = "weather-icon owf";
    weatherDescription.textContent = "";
    temperature.textContent = "";
    wind.textContent = "";
    humidity.textContent = "";
    windIcon.classList.add("hidden");
    humidityIcon.classList.add("hidden");
  }
}
city.addEventListener("change", getWeather);
window.addEventListener("load", getWeather);
setInterval(getWeather, 9e5);

//-----------------------QUOTE WIDGET--------------------
async function getQuote() {
  let lang = localStorage.getItem("language");
  const quotesSrc = "assets/json/quotes.json";
  const response = await fetch(quotesSrc);
  const quotesData = await response.json();
  const randomNum = (Math.random() * quotesData[lang].length).toFixed(0);
  quote.innerText = quotesData[lang][randomNum].quote;
  quoteAuthor.innerText = quotesData[lang][randomNum].author;
}
getQuote();
changeQuoteBtn.addEventListener("click", getQuote);

//----------------------AUDIO PLAYER--------------------

function createPlaylist() {
  const buttonCont = document.createElement("div");
  buttonCont.classList.add("close_btn-container");
  buttonCont.innerHTML = `<img class="close_btn" src="../assets/img/close.png" alt="Close">`;
  playListContainer.style.display = "block";
  playListContainer.append(buttonCont);
  for (let i = 0; i < playListLength; i++) {
    const template = `
      <div class="album_cover" style ="background-image: url(${playList[i].cover})" alt="" class="album_cover-mini"></div>
      <div class="track_info">
        <div class="song_name">${playList[i].title}</div>
        <div class="artist_name">${playList[i].artist}</div>
      </div >
      <div class="duration">${playList[i].duration}</div>`;
    const li = document.createElement("li");
    playListContainer.append(li);
    li.classList.add("playlist_item");
    li.innerHTML = template;
  }
  playListContainer.style.height = playListContainer.scrollHeight;
}

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
  playBtn.src = "assets/img/pause.png";
  audio.play();
}

function pauseAudio() {
  player.classList.remove("active");
  playBtn.src = "assets/img/play.png";
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

// play track on click
document.addEventListener("click", function (e) {
  const target = e.target.closest(".playlist_item");
  if (target) {
    const trackInfo = e.target.closest(".track_info");
    const songName = trackInfo.firstElementChild.textContent;
    audio.src = `assets/sounds/${songName}.mp3`;
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
  player.classList.toggle("hidden_volume");
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
    volumeBtn.src = "assets/img/mute_volume.png";
  } else {
    volumeBtn.src = "assets/img/volume.png";
    audio.volume = 0.5;
  }
}
volumeBtn.addEventListener("click", muteVolume);

function minimizePlayer() {
  player.classList.toggle("mini");
  albumCover.classList.toggle("cover_hidden");
  song.classList.toggle("mini");
  progressBarCont.classList.toggle("mini");
  playerButtonsCont.classList.toggle("mini");
  volumeBarCont.classList.toggle("mini");
  minimizeBtn.classList.toggle("mini");
}
minimizeBtn.addEventListener("click", minimizePlayer);

function showPlaylist() {
  playerCont.classList.toggle("hidden");
  setTimeout(() => {
    playerCont.style.display = "none";
  }, 500);
  setTimeout(createPlaylist, 500);
}
playlistBtn.addEventListener("click", showPlaylist);

function hidePlaylist() {
  if (playListContainer.style.height !== 0) {
    playerCont.style.display = "block";
    playerCont.classList.toggle("hidden");
    playListContainer.innerHTML = "";
  }
}
document.addEventListener("click", (e) => {
  const target = e.target.closest(".close_btn");
  if (target) {
    hidePlaylist();
  }
});

const openSettings = document.querySelector(".open_settings");
const closeSettings = document.querySelector(".close_settings");
const settingsWindow = document.querySelector(".settings_window");

openSettings.addEventListener("click", () => {
  settingsWindow.classList.add("active");
});

closeSettings.addEventListener("click", () => {
  settingsWindow.classList.remove("active");
});

// <-----------------------------APP TRANSLATION---------------------------------------->
//choose language
langButtons.forEach((langButton) => {
  langButton.addEventListener("click", () => {
    appLang = langButton.id;
    translate();
    setLocalStorage();
    getWeather();
    getQuote();
    showGreeting();
  });
});

async function translate() {
  const url = "assets/json/translation.json";
  const response = await fetch(url);
  const data = await response.json();
  //language menu
  langHeading.textContent = data[appLang].language.heading;
  languageDesc.textContent = data[appLang].language.subheading;
  ruButton.textContent = data[appLang].language.russian;
  enButton.textContent = data[appLang].language.english;
  //show menu
  showMenuHeading.textContent = data[appLang].show.heading;
  showMenuDesc.textContent = data[appLang].show.subheading;
  greetingLabel.textContent = data[appLang].show.greeting;
  timeLabel.textContent = data[appLang].show.time;
  dateLabel.textContent = data[appLang].show.date;
  quoteLabel.textContent = data[appLang].show.quote;
  weatherLabel.textContent = data[appLang].show.weather;
  audioLabel.textContent = data[appLang].show.audio;
  // todoLabel.textContent = data[appLang].show.todo;
  //photos menu
  photosHeading.textContent = data[appLang].photos.heading;
  photosDesc.textContent = data[appLang].photos.subheading;
  tagInputDesc.textContent = data[appLang].photos.tags;
  tagInput.placeholder = data[appLang].photos.placeholder;
  //general
  username.placeholder = data[appLang].general.placeholder;
}
window.addEventListener("load", translate);

//<-----------------------BACKGROUND IMAGE SLIDER------------------------>
function getRandomNum() {
  randomNumber = Math.round(Math.random() * (20 - 1) + 1);
}
getRandomNum();

//choose photo API
photoFeeds.forEach((photoFeed) => {
  photoFeed.addEventListener("click", (event) => {
    photoFeeds.forEach((photoFeed) => {
      photoFeed.classList.remove("active");
    });
    event.target.classList.add("active");
    currentPhotoAPI = event.target.id;
    setLocalStorage();
    setBackgroundImage();
  });
});

async function setBackgroundImage() {
  let queryTags = localStorage.getItem("photoTags");
  if (currentPhotoAPI === "github") {
    const bgNum = randomNumber.toString().padStart(2, "0");
    const url = `https://raw.githubusercontent.com/dadonov/Momentum-Images-/master/${timeOfDay}/${bgNum}.webp`;
    const img = new Image();
    img.src = url;
    img.onload = () => {
      body.style.backgroundImage = `url(${img.src})`;
    };
  } else if (currentPhotoAPI === "unsplash") {
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${queryTags}&client_id=fTjDT6kgDBVvcViQwqqyvU75WOHwXi_xUSfqevvtg5w`;
    const img = new Image();
    const response = await fetch(url);
    const data = await response.json();
    img.src = data.urls.regular;
    img.onload = () => {
      body.style.backgroundImage = `url(${img.src})`;
    };
  } else if (currentPhotoAPI === "flickr") {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=b25b2fb9329d4a59d7c3f22f5783f1c8&tags=${queryTags}&extras=url_l&format=json&nojsoncallback=1`;
    const img = new Image();
    const response = await fetch(url);
    const data = await response.json();
    const num = (Math.random() * data.photos.photo.length).toFixed(0);
    img.src = data.photos.photo[num].url_l;
    img.onload = () => {
      body.style.backgroundImage = `url(${img.src})`;
    };
  }
}
window.addEventListener("load", setBackgroundImage);

function choosePhotoTags() {
  let tags = tagInput.value;
  if (tags.split(" ").length > 1) {
    photoTags = tags.split(" ").join(",");
  } else {
    photoTags = tags;
  }
  setLocalStorage();
  setBackgroundImage();
}
submitTagBtn.addEventListener("click", choosePhotoTags);

function getSlideNext() {
  randomNumber++;
  if (randomNumber <= 20) {
    setBackgroundImage();
  } else {
    randomNumber = 1;
    setBackgroundImage();
  }
}
slideNextBtn.addEventListener("click", getSlideNext);

function getSlidePrev() {
  randomNumber--;
  if (randomNumber >= 1) {
    setBackgroundImage();
  } else {
    randomNumber = 20;
    setBackgroundImage();
  }
}
slidePrevBtn.addEventListener("click", getSlidePrev);

//<--------------------------SHOW & HIDE SECTIONS---------------------->
//ios style switch animation and checking/unchecking input checkbox
toggleSwitches.forEach((toggleSwitch) => {
  toggleSwitch.addEventListener("click", () => {
    if (toggleSwitch.classList.contains("active")) {
      toggleSwitch.classList.remove("active");
      toggleSwitch.querySelector("input").checked = false;
    } else {
      toggleSwitch.classList.add("active");
      toggleSwitch.querySelector("input").checked = true;
    }
  });
});
//hiding sections and pushing the names of hidden sections into an array
toggleSwitches.forEach((toggleSwitch) => {
  toggleSwitch.addEventListener("click", () => {
    let inputName = toggleSwitch.querySelector("input").name;
    if (!toggleSwitch.querySelector("input").checked) {
      disabledSwitches.push(inputName);
      document.querySelector(`.${inputName}`).classList.add("hidden");
    } else {
      let index = disabledSwitches.indexOf(inputName);
      disabledSwitches.splice(index, 1);
      document.querySelector(`.${inputName}`).classList.remove("hidden");
    }
  });
});
//hiding sections on window load, according to hidden sections array saved in localStorage
function hideSectionsOnLoad() {
  let switches = JSON.parse(localStorage.getItem("disabledSwitches"));
  if (switches) {
    for (let i = 0; i < switches.length; i++) {
      document.querySelector(`.${switches[i]}`).classList.add("hidden");
      document.querySelector(`div.${switches[i]}_switch`).classList.remove("active");
    }
  }
}
window.addEventListener("load", hideSectionsOnLoad);
//<----------------------TO-DO--LIST----------------------------------->
const todoContainer = document.querySelector(".todo_container");
const toDoInput = document.querySelector(".todo_input");
const toDoList = document.querySelector(".todo_list");
const addToDoBtn = document.querySelector(".todo_btn");
const toDoButton = document.querySelector(".todo_button");
const toDoDeleteButtons = document.querySelectorAll(".todo_delete");

//hide to-do list widget
toDoButton.addEventListener("click", () => {
  todoContainer.classList.toggle("hidden");
});
//add new to-do item to the list
function addToDoItem() {
  let toDoText = toDoInput.value;
  if (toDoText != "") {
    toDoInput.value = "";
    const template = `
    <input type="checkbox" class="todo_checkbox">
    <label class="todo_text">${toDoText}</label>
    <img src="assets/svg/trash-bin.svg" alt="Trash bin" class="todo_delete">
    `;
    const li = document.createElement("li");
    li.classList.add("todo_item");
    li.innerHTML = template;
    toDoList.appendChild(li);
  }
}
toDoInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    addToDoItem();
  }
});
// delete to-do list items on trash bin icon click
document.addEventListener("click", (event) => {
  const target = event.target.closest(".todo_delete");
  if (target) {
    target.parentElement.remove();
  }
});


