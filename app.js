// For getting secrets and passwords of database
require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-Parser");

const cors = require("cors");
const app = express();

//getting all routes
const authRoutes = require("./routes/auth");
const authorRoutes = require("./routes/author");
const bookRoutes = require("./routes/book");

//Establishing connection with Database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Accepting all routes
app.use("/api", authRoutes);
app.use("/api", authorRoutes);
app.use("/api", bookRoutes);

//Using ports
const port = process.env.PORT || 8000;

//Making server listen to incoming requests
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
