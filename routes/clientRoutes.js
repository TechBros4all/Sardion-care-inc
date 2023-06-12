const { Router } = require("express");
const path = require("path");
const fs = require("fs");
const mime = require("mime-types");

const router = Router();

router.get("/", (req, res) => {
    let navbarContents = ["home", "about", "beliefs", "services", "contact us"];
    let page = "home"
    res.render("home", { navbarContents, page })
})

router.get("/about", (req, res) => {
    let navbarContents = ["home", "about", "programs", "contact us"];
    let page = "about"
    res.render("about", { navbarContents, page })
})

router.get("/gallery", (req, res) => {
    let navbarContents = ["home", "gallery", "contact us"];
    let page = "gallery";

    //Get gallery images and videos
    const galleryPath = path.join(__dirname, "..", 'resources/gallery');

    fs.readdir(galleryPath, (err, files) => {
        const images = [];
        const videos = [];

        if (err) {
            console.error('Error reading gallery directory:', err);
            return res.render("gallery", { navbarContents, page, videos, images })
        }

        files.forEach((file) => {
            const filePath = path.join(galleryPath, file);
            const mimeType = mime.lookup(filePath);

            if (mimeType && mimeType.startsWith('image/')) {
                images.push(file);
            } else if (mimeType && mimeType.startsWith('video/')) {
                videos.push(file);
            }
        });

        res.render("gallery", { navbarContents, page, images, videos })
    });
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