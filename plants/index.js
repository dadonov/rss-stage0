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
const accordionTabs = document.querySelectorAll(".accordion_label");

accordionTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    let content = tab.nextElementSibling;
    if (content.style.maxHeight) {
      document.querySelectorAll(".tab-content").forEach((element) => {
        element.style.maxHeight = null;
      });
    } else {
      document.querySelectorAll(".tab-content").forEach((element) => {
        element.style.maxHeight = null;
      });
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

// City drop-down menu
function cityToggle() {
  this.parentElement.classList.toggle("active");
  this.classList.toggle(".active");
}
function cityChoose() {
  let cityName = this.innerText;
  let currentCityName =
    this.closest(".city_select").querySelector(".select_current");
  currentCityName.innerText = cityName;
  this.closest(".city_select").classList.remove("active");
}

const selectCity = () => {
  let selectHeader = document.querySelectorAll(".city_select-header");
  let selectItem = document.querySelectorAll(".city_select-item");

  selectHeader.forEach((item) => {
    document.querySelector(".city_select-body").classList.add("active");
    item.classList.toggle("active");
    item.addEventListener("click", cityToggle);
  });

  selectItem.forEach((item) => {
    item.addEventListener("click", cityChoose);
  });
};

selectCity();
