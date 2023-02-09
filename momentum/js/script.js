const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");
const greetingElement = document.querySelector(".greeting");
const timeOfDay = getTimeOfDay();
const greeting = `Good ${timeOfDay},`;
const username = document.querySelector(".name");
const body = document.querySelector("body");
let randomNumber;
const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");

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
  greetingElement.innerText = greeting;
}

function setLocalStorage() {
  localStorage.setItem("username", username.value);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("username")) {
    username.value = localStorage.getItem("username");
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
