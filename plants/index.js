(function () {
  const burger = document.querySelector(".header_burger");
  const menu = document.querySelector(".nav_menu");

  burger.addEventListener("click", () => {
    menu.classList.add("nav_menu_active");
  });

  menu.addEventListener("click", () => {
    if (menu.classList.contains("nav_menu_active")) {
      menu.classList.remove("nav_menu_active");
    }
  });
})();

// adding blur to service cards
const serviceButton = document.querySelectorAll(".service_list-button");
const gardenCare = document.querySelectorAll("div.garden");
const planting = document.querySelectorAll("div.planting");
const lawnCare = document.querySelectorAll("div.lawn_care");

serviceButton.forEach((button) =>
  button.addEventListener("click", () => {
    button.classList.toggle("active-button");
  })
);

const blur = (pic) => {
  pic.classList.toggle("blur");
};

serviceButton.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("button_gardens")) {
      planting.forEach(blur);
      lawnCare.forEach(blur);
    } else if (button.classList.contains("button_planting")) {
      gardenCare.forEach(blur);
      lawnCare.forEach(blur);
    } else if (button.classList.contains("button_lawn")) {
      planting.forEach(blur);
      gardenCare.forEach(blur);
    }
  });
});

// prices accordion
const accordionLabels = document.querySelectorAll(".accordion_label");

accordionLabels.forEach((tab) => {
  tab.addEventListener("click", (event) => {
    let content = tab.nextElementSibling;
    let container = content.firstElementChild;
    tab.lastElementChild.firstElementChild.classList.toggle("open");
    container.classList.remove("active");
    if (content.style.maxHeight) {
      document.querySelectorAll(".tab-content").forEach((element) => {
        element.style.maxHeight = null;
      });
    } else {
      document.querySelectorAll(".tab-content").forEach((element) => {
        element.style.maxHeight = null;
      });
      content.style.maxHeight = content.scrollHeight + "px";
      container.classList.add("active");
    }
  });
});

// City drop-down menu
const cities = {
  ["Canandaigua, NY"]: ["Canandaigua, NY", "+1 585 393 0001", "151 Charlotte Street"],
  ["New York City"]: ["New York City", "+1 212 456 0002", "9 East 91st Street"],
  ["Yonkers, NY"]: ["Yonkers, NY", "+1 914 678 0003", "511 Warburton Ave"],
  ["Sherrill, NY"]: ["Sherrill, NY", "+1 315 908 0004", "14 WEST Noyes BLVD"],
};

const cityMenuHeader = document.querySelectorAll(".city_select-header");
const cityMenuItem = document.querySelectorAll(".city_select-item");
const cityCard = document.querySelector(".city_card");
const city = cityCard.querySelector("span.city_name");
const phoneNumber = cityCard.querySelector(".phone_number");
const street = cityCard.querySelector(".street");
const callButton = document.querySelector(".call_us");
const arrow = document.querySelector(".select_icon").firstElementChild;

function openCityMenu() {
  if (cityCard.classList.contains("active")) {
    cityCard.classList.remove("active");
  }
  arrow.classList.toggle("open");
  this.parentElement.classList.toggle("active");
}

function changeMenuHeader() {
  let cityName = this.textContent;
  let citySelect = this.closest(".city_select");
  let currentCityName = citySelect.querySelector(".select_current");
  currentCityName.textContent = cityName;

  //filling in the contacts card
  city.textContent = cities[currentCityName.textContent][0];
  phoneNumber.textContent = cities[currentCityName.textContent][1];
  street.textContent = cities[currentCityName.textContent][2];
  callButton.href = `tel:${cities[currentCityName.textContent][1]}`;
  citySelect.classList.remove("active");
  cityCard.classList.toggle("active");
}

(function selectCity() {
  cityMenuHeader.forEach((item) => {
    cityCard.classList.remove("active");
    item.classList.toggle("active");
    item.addEventListener("click", openCityMenu);
  });
  cityMenuItem.forEach((item) => {
    item.addEventListener("click", changeMenuHeader);
  });
})();
