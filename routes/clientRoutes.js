const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
    let navbarContents = ["home", "about", "beliefs", "services", "contact us"];
    res.render("home", { navbarContents })
})

router.get("/about", (req, res) => {
    let navbarContents = ["home", "about", "programs", "contact us"];
    res.render("about", { navbarContents })
})

router.get("/join", (req, res) => {
    let navbarContents = ["home", "careers", "join us", "contact us"];
    res.render("join-us", { navbarContents })
})

router.get("/contact", (req, res) => {
    let navbarContents = ["home", "reach out", "contact us"];
    res.render("contact-us", { navbarContents })
})

module.exports = router;