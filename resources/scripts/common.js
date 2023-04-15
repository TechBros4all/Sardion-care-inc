//Make links scroll to target
var links = document.querySelectorAll("a:not([href])");

for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", () => {
        let name = links[i].innerHTML.toLowerCase().split(" ");
        if(name[0] == "contact") {
          document.documentElement.scrollTop = document.documentElement.scrollHeight;
          return;
        }
        let page = document.getElementById(`${name[0]}`);
        if (page) page.scrollIntoView();
        else return;
    })
}

//add active to links on poage scroll
let pages = document.querySelectorAll(".content > div");
const threshold = 100;

function addActiveClass() {
  pages.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    const halfHeight = window.innerHeight / 2;

    if (rect.top <= halfHeight && rect.bottom >= halfHeight) {
      if(links[index].classList.contains("active")) return;
      links.forEach((link) => link.classList.remove('active'));
      links[index].classList.add('active');
    }

    if ((document.body.offsetHeight - (window.innerHeight + window.pageYOffset)) <= threshold) {
      if(links[links.length - 1].classList.contains("active")) return;
      links.forEach((link) => link.classList.remove('active'));
      links[links.length - 1].classList.add('active');
    }
  });
}

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

window.addEventListener("scroll", addActiveClass)