require("dotenv").config();

const mongoose = require("mongoose");

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-Parser");
const cors = require("cors");

// roues
 const authRoutes =require("./routes/auth") 
const authorRoutes =require("./routes/author")
//Dbconnection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });
  //midle wears
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//routes
app.use("/api",authRoutes)
app.use("/api",authorRoutes)

//ports
const port = process.env.PORT || 8000;

//starting server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});