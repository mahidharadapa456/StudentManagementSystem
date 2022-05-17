const express = require("express");
const mongoose = require("./db/mongoose");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3003;
// Routes
const indexRouter = require("./routes/index");
const courseRouter = require("./routes/course");
const studentRouter = require("./routes/student");
const methodOverride = require("method-override");
const path = require("path");

// Declarations with app
app.set("views", "./views");
app.set("view engine", "ejs");

// Use route in app
app.use(express.static(__dirname + "/public"));
app.use("/signUp", express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(indexRouter);
app.use("/course", courseRouter);
app.use("/students", studentRouter);

app.listen(port, () => console.log("Running on " + port));