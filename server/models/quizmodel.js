const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    quizname: { type: String, require: true },
    createdby: { type: String, require: true },
    questions: { type: Array, default: [], require: true },
    time: { type: Number, require: true },
  },
  { collection: "quiz-data" }
);

const quizmodel = mongoose.model("QuizData", User);

module.exports = quizmodel;
