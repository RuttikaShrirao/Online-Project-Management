const express = require("express");
const reponseFormat = require("../util");
const { auth } = require("../Model/authSchema");
const LoginRoute = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

LoginRoute.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email.length == 0 || req.body.password.length == 0) {
      reponseFormat(res, (status_code = 400), (msg = "Please fill Details.."));
    } else {
      const isuserExist = await auth.findOne({ email: email });

      if (isuserExist != null) {
        let newpassword = password.toString();
        const matchPassword = await bcrypt.compare(
          newpassword,
          isuserExist.password
        );
        if (matchPassword) {
          let token = jwt.sign(
            { email: isuserExist.email, id: isuserExist._id },
            process.env.SECRET_KEY
          );
          res.status(200).send({
            status: 200,
            Success: 'true',
            msg: "Valid User",
            token: token,
          });
        }
      } else {
        reponseFormat(res, (status_code = 400), Success='false', (msg = "Invalid User"));
      }
    }
  } catch (error) {
    reponseFormat(res, (status_code = 500), (msg = error));
  }
});

module.exports = LoginRoute;
