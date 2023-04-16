const express = require('express');
const {enterquiz,submitquiz,studentdeshboard,sonequiz} =require('../controllers/quizcontroller');
const studentrouter = express.Router();

studentrouter.route('/enterquiz').post(enterquiz);
studentrouter.route('/submitquiz').post(submitquiz);
studentrouter.route('/deshboard').post(studentdeshboard);
studentrouter.route('/onequiz').post(sonequiz);

module.exports = studentrouter;