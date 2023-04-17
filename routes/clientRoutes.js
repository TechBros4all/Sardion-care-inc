const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
    let navbarContents = ["home", "about", "believes", "services", "contact us"];
    let page = "home"
    res.render("home", { navbarContents, page })
})

router.get("/about", (req, res) => {
    let navbarContents = ["home", "about", "programs", "contact us"];
    let page = "about"
    res.render("about", { navbarContents, page })
})

router.get("/join", (req, res) => {
    let navbarContents = ["home", "careers", "join us", "contact us"];
    let page = "join"
    res.render("join-us", { navbarContents, page })
})

router.get("/contact", (req, res) => {
    let navbarContents = ["home", "reach out", "contact us"];
    let page = "contact"
    res.render("contact-us", { navbarContents, page })
})

module.exports = router;