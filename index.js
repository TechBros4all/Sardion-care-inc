const express = require("express");
const clientRoutes = require("./routes/clientRoutes");
const app = express();
const port = 3000;

app.use(express.static("resources"))
// app.use(express.static("uploads"))

app.set("view engine", "ejs")
app.set("views", "views")

app.use(clientRoutes)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})