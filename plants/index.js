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



// serviceButton.forEach((button) => {
//   button.addEventListener("click", () => {
//     if (button.classList.contains("button_gardens")) {
//       planting.forEach(blur);
//       lawnCare.forEach(blur);
//     } else if (button.classList.contains("button_planting")) {
//       gardenCare.forEach(blur);
//       lawnCare.forEach(blur);
//     } else if (button.classList.contains("button_lawn")) {
//       planting.forEach(blur);
//       gardenCare.forEach(blur);
//     }
//   });
// });
