const servicesBox = document.querySelector(".services-box");
const servicesHolder = document.querySelector(".services-holder");
const servicesSlider = document.querySelector(".services-slider");
const service = document.querySelectorAll(".service");
const servicesNext = document.querySelector(".services-next");
const servicesBack = document.querySelector(".services-back");
let sliderPosition = 0;
let previousGaps = [];
let space;

if(window.matchMedia("(max-width: 320px)").matches) assignWidth(service, servicesSlider, 260)
else assignWidth(service, servicesSlider, 300);

calibrate();

servicesNext.addEventListener("click", () => {
    let extra = previousGaps.reduce((a, b) => a + b, 0);
    space = getElementsInBox(servicesBox, service, extra)
    console.log(space)
    if (space == 0) return;
    sliderPosition -= space;
    previousGaps.push(space)
    console.log(previousGaps);
    servicesSlider.style.left = `${sliderPosition}px`;
})

servicesBack.addEventListener("click", () => {
    let gap = previousGaps.pop();
    sliderPosition += gap || 0;
    servicesSlider.style.left = `${sliderPosition}px`;
})

function assignWidth(box, slide, width) {
    let slideWidth = 0;
    for (let i = 0; i < box.length; i++) {
        box[i].style.width = `${width}px`;
        slideWidth += width;
    }

    slide.style.width = `${slideWidth}px`;
}

function getElementsInBox(box, elements = [], extra = 0) {
    let boxWidth = box.offsetWidth + (extra);
    let elementsWidth = 0;
    let gap = 0;
    for (let i = 0; i < elements.length; i++) {
        elementsWidth += elements[i].clientWidth + 20;
        if (elementsWidth > boxWidth) {
            gap = elementsWidth - boxWidth;
            break;
        }
    }
    return gap;
}

function calibrate() {
    if (isMobile()) {
        servicesNext.classList.add("off");
        servicesBack.classList.add("off");
        servicesHolder.classList.add("mobile");
        
    } else {
        servicesHolder.classList.remove("mobile");
        space = getElementsInBox(servicesBox, service)
        if (space > 0) {
            servicesNext.classList.remove("off");
            servicesBack.classList.remove("off");
        } else {
            servicesNext.classList.add("off");
            servicesBack.classList.add("off");
        }
    }
}

function isMobile() {
    return ('ontouchstart' in window || navigator.maxTouchPoints) & (window.matchMedia("(max-width: 800px)").matches);
}

let resizeDelay;
window.onresize = () => {
    clearTimeout(resizeDelay);
    resizeDelay = setTimeout(calibrate, 300)
}