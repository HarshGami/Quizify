const usermodel = require("../models/usermodel");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const user = await usermodel.findOne({
      email: req.body.email,
    });

    if (user) {
      res.json({ status: "error", message: "email is used before" });
      return;
    }

    await usermodel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });

    const tokenemail = jwt.sign(
      {
        email: req.body.email,
      },
      "harsh123"
    );
    const tokenpassword = jwt.sign(
      {
        password: req.body.password,
      },
      "harsh123"
    );

    res.json({
      status: "ok",
      name: req.body.name,
      role: req.body.role,
      tokenemail,
      tokenpassword,
    });
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await usermodel.findOne({
      email: req.body.email,
    });

    if (user) {
      if (user.password === req.body.password) {
        const tokenemail = jwt.sign(
          {
            email: req.body.email,
          },
          "harsh123"
        );
        const tokenpassword = jwt.sign(
          {
            password: req.body.password,
          },
          "harsh123"
        );

        res.json({
          status: "ok",
          name: user.name,
          role: user.role,
          tokenemail,
          tokenpassword,
        });
      } else {
        res.json({ status: "error", message: "password is invalid" });
      }
    } else res.json({ status: "error", message: "user is not found" });
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};
