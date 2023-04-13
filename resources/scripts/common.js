//Toggle navbar
let navbarCollapseBtn = document.getElementById("navbar-collapse");
let navbarCollapsable = document.querySelector(".navbar-collapsable");

navbarCollapseBtn.addEventListener("click", () => {
  if(navbarCollapsable.classList.contains("active")) {
    document.body.classList.remove("stop")
    navbarCollapseBtn.classList.replace("fa-xmark", "fa-bars");
    navbarCollapsable.classList.remove("active")
  }else {
    document.body.classList.add("stop")
    navbarCollapseBtn.classList.replace("fa-bars", "fa-xmark");
    navbarCollapsable.classList.add("active")
  }
})