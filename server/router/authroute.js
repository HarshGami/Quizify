const express = require("express");
const { register, login } = require("../controllers/authcontroller.js");

const authrouter = express.Router();

authrouter.route("/register").post(register);
authrouter.route("/login").post(login);

module.exports = authrouter;
