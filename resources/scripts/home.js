const servicesSlider = document.querySelector(".services-slider");
const service = document.querySelectorAll(".service");

assignWidth(service, servicesSlider, 300)

function assignWidth(box, slide, width) {
    let slideWidth = 0;
    for (let i = 0; i < box.length; i++) {
        box[i].style.width = `${width}px`;
        slideWidth += width;
    }

    slide.style.width = `${slideWidth}px`;
}

function isMobile() {
    return ('ontouchstart' in window || navigator.maxTouchPoints) & (window.matchMedia("(max-width: 800px)").matches);
}