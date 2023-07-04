//Make links scroll to target
var links = document.querySelectorAll("a:not([href])");

for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", (e) => {
    let name = links[i].innerHTML.toLowerCase().split(" ");
    if (name[0] == "contact") {
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
      if (links[index].classList.contains("active")) return;
      links.forEach((link) => link.classList.remove('active'));
      links[index].classList.add('active');
      links[index + (links.length / 2)].classList.add('active');
    }

    if ((document.body.offsetHeight - (window.innerHeight + window.pageYOffset)) <= threshold) {
      if (links[links.length - 1].classList.contains("active")) return;
      links.forEach((link) => link.classList.remove('active'));
      links[links.length - 1].classList.add('active');
      links[(links.length / 2) - 1].classList.add('active');
    }
  });
}

//Toggle navbar
let navbarCollapseBtn = document.getElementById("navbar-collapse");
let navbarCollapsable = document.querySelector(".navbar-collapsable");
let navbarOverlay = document.querySelector(".navbar-overlay");
let pageMenuBtn = document.querySelector(".page-menu-btn");
let pageMenus = document.querySelector(".page-menus");
let pageMenuLinks = document.querySelectorAll(".page-menus a");

navbarCollapseBtn.addEventListener("click", function () {
  if (navbarCollapsable.classList.contains("on")) {
    //add other menu 
    pageMenus.classList.remove("off");
    //let body scroll
    document.body.classList.remove("stop")
    //change icons
    pageMenuBtn.firstChild.classList.replace("fa-angle-up", "fa-angle-down")
    navbarCollapseBtn.classList.replace("fa-xmark", "fa-bars");
    //remove navbar
    navbarCollapsable.classList.remove("on");
    setTimeout(() => {
      navbarOverlay.classList.remove("on", "dark");
    }, 500);
  } else {
    //remove other menu 
    pageMenus.classList.add("off");
    //stop body scroll
    document.body.classList.add("stop")
    //change icons
    pageMenuBtn.firstChild.classList.replace("fa-angle-up", "fa-angle-down")
    navbarCollapseBtn.classList.replace("fa-bars", "fa-xmark");
    //show navbar
    navbarCollapsable.classList.remove("off")
    navbarCollapsable.classList.add("on")
    navbarOverlay.classList.add("on", "dark");
  }
})

//toggle additional menu
navbarOverlay.addEventListener("click", function (e) {
  if (!(e.target.classList.contains("navbar-overlay"))) return;
  //let body scroll
  document.body.classList.remove("stop")
  let children = this.querySelectorAll(`.navbar-overlay > div`);
  //change icon
  pageMenuBtn.firstChild.classList.replace("fa-angle-up", "fa-angle-down")
  navbarCollapseBtn.classList.replace("fa-xmark", "fa-bars");
  for (let i = 0; i < children.length; i++) {
    children[i].classList.remove("on", "off");
  }
  setTimeout(() => {
    this.classList.remove("on", "dark");
  }, 500);
})

pageMenuBtn.addEventListener("click", function () {
  delayAllFunc(pageMenuLinks, 0.2);
  let icon = this.firstChild;
  if (icon.classList.contains("fa-angle-down")) {
    //remove other menu
    navbarCollapsable.classList.add("off");

    icon.classList.replace("fa-angle-down", "fa-angle-up")
    navbarOverlay.classList.add("on");
    pageMenus.classList.remove("off");
    pageMenus.classList.add("on");
  } else {
    //show other menus
    navbarCollapsable.classList.remove("off");

    icon.classList.replace("fa-angle-up", "fa-angle-down",)
    pageMenus.classList.remove("on");
    setTimeout(() => {
      navbarOverlay.classList.remove("on");
    }, 500);
  }
})

function delayAllFunc(val, num, end) {
  let delay = 0;
  for (let i = 0; i < val.length; i++) {
    val[i].style.transitionDelay = `${delay}s`;
    delay += num;
  }
  delay = end || 0;
  setTimeout(() => {
    for (let i = 0; i < val.length; i++) {
      val[i].style.transitionDelay = `${delay}s`;
    }
  }, 2000)
}

//Form Submit
const form = document.getElementById("form-to-submit");
if (form) {
  var formBtn = document.getElementById("submit-form")
  var formFields = form.querySelectorAll("input, textarea");

  for (let i = 0; i < formFields.length; i++) {
    formFields[i].addEventListener("focus", function () {
      if (this.classList.contains("is-invalid")) this.classList.remove("is-invalid")
    })
  }

  const formDataToJson = (formData, subject) => {
    const entries = formData.entries();
    const dataObj = Array.from(entries).reduce((data, [key, value]) => {
      data[key] = value;
      return data;
    }, {});

    const data = {
      subject,
      ...dataObj
    }

    return JSON.stringify(data);
  };

  form.addEventListener("submit", function (e) {
    try {
      const url = "https://formspree.io/f/meqbqjjn"

      e.preventDefault();

      //get form subject
      var subject = e.target.dataset.subject;

      formBtn.disabled = true;
      formBtn.innerHTML = "<span class='spinner'></span>";

      if (validateForm()) {
        attachAlert("Fill All Fields", "error");
        formBtn.disabled = false;
        formBtn.innerHTML = "Submit";
        return
      };

      const formData = new FormData(this);

      fetch(url, {
        method: "POST",
        body: formDataToJson(formData, subject),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(response => {
          if (response.ok) {
            for (let i = 0; i < formFields.length; i++) {
              formFields[i].value = "";
            }
            attachAlert("Message Sent Successfully");
            formBtn.disabled = false;
            formBtn.innerHTML = "Submit";
          } else {
            formBtn.disabled = false;
            formBtn.innerHTML = "Submit";
            attachAlert("Service Unavailable, try again", "error");
          }
        })
        .catch(error => {
          formBtn.disabled = false;
          formBtn.innerHTML = "Submit";
          attachAlert("Error Sending Message", "error");
          console.log(error)
        })
    } catch (err) {
      formBtn.innerHTML = "Error"
    }
  })

  function validateForm() {
    let isEmpty = false;
    for (let i = 0; i < formFields.length; i++) {
      if (formFields[i].value.length < 1) {
        isEmpty = true;
        formFields[i].classList.add("is-invalid")
      }
    }

    return isEmpty;
  }

}
function attachAlert(msg, type) {
  const alertBox = document.querySelector(".alert-box");
  const alert = document.createElement("div");
  const alertMsg = document.createElement("p");

  alert.classList.add("alert");
  if (type) alert.classList.add("error");
  alertMsg.innerHTML = msg;
  alert.appendChild(alertMsg);

  alertBox.insertBefore(alert, alertBox.children[0]);

  setTimeout(() => {
    alert.classList.add("on");
    setTimeout(() => {
      alert.classList.remove("on");
      setTimeout(() => {
        alert.remove();
      }, 500);
    }, 3000);
  }, 200);
}

//Gallery Buttons
const galleryBtns = document.querySelectorAll(".gallery-btn");

if (galleryBtns) {
  galleryBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const target = document.querySelector(`.${this.dataset?.target || undefined}`);
      const icon = this.childNodes[0];

      if (!target) return;

      if (target.classList.contains("collapsed")) {
        icon.classList.replace("fa-angle-down", "fa-angle-up")
        target.classList.remove("collapsed")
      }
      else {
        icon.classList.replace("fa-angle-up", "fa-angle-down");
        target.classList.add("collapsed");
      }
    })
  })
}


window.addEventListener("scroll", addActiveClass)

// scroll behavior alternative
// Smooth scrolling with vanilla JavaScript
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//   anchor.addEventListener('click', function (e) {
//       e.preventDefault();

//       document.querySelector(this.getAttribute('href')).scrollIntoView({
//           behavior: 'smooth'
//       });
//   });
// });
// test it
