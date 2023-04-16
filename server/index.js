const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authrouter = require('./router/authroute.js');
const teacherrouter = require('./router/teacherroute.js');
const studentrouter = require("./router/studentroute.js");
const dotenv = require('dotenv');
dotenv.config();

const app = express();
mongoose.connect("mongodb://localhost:27017/quizify");


app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use('/api/auth',authrouter);
app.use('/api/teacher',teacherrouter);
app.use("/api/student",studentrouter);


app.listen("5000", () => {
  console.log("srever starting");
});
