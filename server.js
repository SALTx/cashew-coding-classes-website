const express = require('express');
const app = express();

const routes = require("./routes.js");
app.use("/", routes);
app.set("view engine", "ejs");

app.listen(3000, () => { console.log("Server running on port 3000"); })