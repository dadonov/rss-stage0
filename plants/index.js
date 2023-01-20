// BURGER MENU ACTUATION//
(function () {
  const burger = document.querySelector(".header_burger");
  const menu = document.querySelector(".nav_menu");
  const closeMenu = document.querySelector(".nav_menu-close");
  const link = document.querySelector("nav_link");

  burger.addEventListener("click", () => {
    menu.classList.add("nav_menu_active");
  });

  closeMenu.addEventListener("click", () => {
    menu.classList.remove("nav_menu_active");
  });

  menu.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName === "A") {
      menu.classList.remove("nav_menu_active");
    }
  });
})();
