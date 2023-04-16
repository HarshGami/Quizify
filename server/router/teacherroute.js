const express = require('express');
const {makequiz,teacherdeshboard,tonequiz,updatequiz} =require('../controllers/quizcontroller');
const teacherrouter = express.Router();

teacherrouter.route('/makequiz').post(makequiz);
teacherrouter.route('/deshboard').post(teacherdeshboard);
teacherrouter.route('/onequiz').post(tonequiz);
teacherrouter.route('/updatequiz').post(updatequiz);

module.exports = teacherrouter;