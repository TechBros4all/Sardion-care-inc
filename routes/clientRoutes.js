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
        const allFiles = {};

        if (err) {
            console.error('Error reading gallery directory:', err);
            return res.render("gallery", { navbarContents, page, allFiles })
        }

        //Valid file should follow this format; name-type-number(optional).extenxion.
        //All invalid files will be logged to the console if any, but will be removed from the list
        let validFiles = [];
        let inValidFiles = [];

        //Separate the valid files from the invalid ones
        files.forEach(file => (file.split("-").length > 1) ? validFiles.push(file) : inValidFiles.push(file))

        //Categorise the files
        validFiles.forEach(file => {
            const nameExt = file.split(".");
            const ext = nameExt.pop();
            const content = nameExt.join(".").split("-");

            let type = content[1];

            if(mime.lookup(path.join(galleryPath, file)).startsWith("video/")) file += '-vid';

            (allFiles[type]) ? allFiles[type].push(file) : allFiles[type] = [file];
        })

        if(inValidFiles.length) console.log(`These files were removed when showing the gallery\n> ${inValidFiles.join("\n> ")}`);

        res.render("gallery", { navbarContents, page, allFiles })
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