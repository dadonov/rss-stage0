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
