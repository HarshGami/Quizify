const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    useremail: { type: String, require: true },
    quizname: { type: String, require: true },
    createdby: { type: String, require: true },
    useranswer: { type: Array, default: [], require: true },
    result: { type: Number, require: true },
  },
  { collection: "result-data" }
);

const resultmodel = mongoose.model("ResultData", User);

module.exports = resultmodel;
