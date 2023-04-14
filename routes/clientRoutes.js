const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
    res.render("home")
})

router.get("/about", (req, res) => {
    res.render("about")
})

router.get("/join", (req, res) => {
    res.render("join-us")
})

router.get("/contact", (req, res) => {
    res.render("contact")
})

module.exports = router;