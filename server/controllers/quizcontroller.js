const quizmodel = require("../models/quizmodel");
const resultmodel = require("../models/resultmodel");

exports.makequiz = async (req, res) => {
  try {
    const user = await quizmodel.findOne({
      createdby: req.body.name,
      quizname: req.body.quizname,
    });

    if (user) {
      res.json({
        status: "error",
        message: "quiz is exist with this quiz name",
      });
      return;
    }

    await quizmodel.create({
      createdby: req.body.name,
      questions: req.body.questions,
      quizname: req.body.quizname,
      time: req.body.time,
    });

    res.json({ status: "ok", message: "success" });
  } catch (error) {
    res.json({ status: "error", message: "Quiz is not created, Try again!" });
  }
};

exports.enterquiz = async (req, res) => {
  try {
    const resultfound = await resultmodel.findOne({
      createdby: req.body.createdby,
      quizname: req.body.quizname,
      useremail: req.body.useremail,
    });

    if (resultfound) {
      res.json({
        status: "error",
        message: "you have alrady completed this quiz",
      });
      return;
    }

    const user = await quizmodel.findOne({
      createdby: req.body.createdby,
      quizname: req.body.quizname,
    });

    if (!user) {
      res.json({ status: "error", message: "Quiz not found" });
      return;
    }

    const questions = await user.questions.map((e) => {
      return {
        question: e.question,
        option1: e.option1,
        option2: e.option2,
        option3: e.option3,
        option4: e.option4,
      };
    });

    res.json({ status: "ok", questions, time: user.time });
  } catch (error) {
    res.json({ status: "error", message: "Quiz not found" });
  }
};

exports.submitquiz = async (req, res) => {
  try {
    const user = await quizmodel.findOne({
      createdby: req.body.createdby,
      quizname: req.body.quizname,
    });

    const answers = await user.questions.map((e) => {
      return e.answer;
    });

    const userans = req.body.userans;
    userans.sort(sortFunction);

    function sortFunction(a, b) {
      if (a[0] === b[0]) {
        return 0;
      } else {
        return a[0] < b[0] ? -1 : 1;
      }
    }

    const useranswer = [];
    for (let i = 0; i < userans.length - 1; i++) {
      if (userans[i][0] != userans[i + 1][0]) {
        useranswer.push(userans[i]);
      }
    }
    if (userans.length > 0) useranswer.push(userans[userans.length - 1]);

    let result = 0;
    for (let i = 0; i < answers.length; i++) {
      for (let j = 0; j < useranswer.length; j++) {
        if (useranswer[j][0] == i && answers[i] == useranswer[j][1]) {
          result++;
        }
      }
    }

    await resultmodel.create({
      useremail: req.body.useremail,
      createdby: req.body.createdby,
      useranswer,
      result: result,
      quizname: req.body.quizname,
    });

    res.json({ status: "ok", result });
  } catch (error) {
    res.json({ status: "error", message: "Quiz is not submited, Try again!" });
  }
};

exports.teacherdeshboard = async (req, res) => {
  try {
    const user = await quizmodel.find({
      createdby: req.body.createdby,
    });

    if (user.length > 0) {
      let response = [];
      for (let i = 0; i < user.length; i++) {
        const count = await resultmodel.find({
          createdby: req.body.createdby,
          quizname: user[i].quizname,
        });

        response.push({
          studentcount: count.length,
          quizname: user[i].quizname,
          questions: user[i].questions,
        });
      }
      res.json({ status: "ok", response });
    } else {
      res.json({ status: "ok", message: "Their is no quiz conducted by you" });
    }
  } catch (error) {
    res.json({ status: "error", message: "Their is no quiz conducted by you" });
  }
};

exports.studentdeshboard = async (req, res) => {
  try {
    const response = await resultmodel.find({
      useremail: req.body.useremail,
    });

    if (response.length > 0) {
      res.json({ status: "ok", response });
    } else {
      res.json({ status: "ok", message: "you have not completed any quiz" });
    }
  } catch (error) {
    res.json({ status: "error", message: "you have not completed any quiz" });
  }
};

exports.sonequiz = async (req, res) => {
  try {
    const response = await quizmodel.findOne({
      quizname: req.body.quizname,
      createdby: req.body.createdby,
    });

    if (response) {
      res.json({ status: "ok", response });
    } else {
      res.json({ status: "ok", message: "you have not completed any quiz" });
    }
  } catch (error) {
    res.json({ status: "error", message: "you have not completed any quiz" });
  }
};

exports.tonequiz = async (req, res) => {
  try {
    const user = await quizmodel.findOne({
      createdby: req.body.createdby,
      quizname: req.body.quizname,
    });

    if (user) {
      let students = [];
      const count = await resultmodel.find({
        createdby: req.body.createdby,
        quizname: req.body.quizname,
      });

      for (let j = 0; j < count.length; j++) {
        students.push({
          useremail: count[j].useremail,
          result: count[j].result,
        });
      }
      const response = {
        studentcount: count.length,
        quizname: user.quizname,
        questions: user.questions,
        students,
      };

      res.json({ status: "ok", response });
    } else {
      res.json({ status: "ok", message: "Their is no quiz conducted by you" });
    }
  } catch (error) {
    res.json({ status: "error", message: "Their is no quiz conducted by you" });
  }
};

exports.updatequiz = async (req, res) => {
  try {
    const result = await quizmodel.updateOne(
      {
        quizname: req.body.quizname,
        createdby: req.body.createdby,
      },
      {
        $set: {
          questions: req.body.questions,
        },
      }
    );

    if (result.modifiedCount) {
      const user = await quizmodel.findOne({
        createdby: req.body.createdby,
        quizname: req.body.quizname,
      });

      const answers = await user.questions.map((e) => {
        return e.answer;
      });

      const useremails = await req.body.students.map((e) => {
        return e.useremail;
      });

      for (let i = 0; i < useremails.length; i++) {
        const student = await resultmodel.findOne({
          quizname: req.body.quizname,
          createdby: req.body.createdby,
          useremail: useremails[i],
        });

        let result = 0;
        for (let j = 0; j < answers.length; j++) {
          for (let x = 0; x < student.useranswer.length; x++) {
            if (
              student.useranswer[x][0] === j &&
              student.useranswer[x][1] === answers[j]
            ) {
              result++;
            }
          }
        }

        const updateresult = await resultmodel.updateOne(
          {
            quizname: req.body.quizname,
            createdby: req.body.createdby,
            useremail: useremails[i],
          },
          {
            $set: {
              result: result,
            },
          }
        );
      }
      res.json({ status: "ok", message: "updated successfilly" });
    } else {
      res.json({ status: "ok", message: "no changes is made by you" });
    }
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};
