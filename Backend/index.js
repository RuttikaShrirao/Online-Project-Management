const express = require("express");
const connectdb = require("./database");
const cors = require("cors");
const bodyParser = require("body-parser");
const ProjectsRoute = require("./router/create_Project");
const dashboardRoute = require("./router/dashboard");
const LoginRoute = require("./router/LoginRoute");
const {auth} =require("./Model/authSchema")
const reponseFormat =require('./util')
const bcrypt = require("bcrypt");
require("dotenv").config();

var app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.post("/api/registration", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email.length == 0 || req.body.password.length == 0) {
      reponseFormat(res, (status_code = 400), (msg = "Please fill Details.."));
    } else {
      try{
        const isuserExist = await auth.findOne({ email: email });
        if (isuserExist != null) {
          reponseFormat(
            res,
            (status_code = 400),
            (msg = "you are already registered..")
          );
        } else {
   
          const salt = await bcrypt.genSalt(5);
          let newpassword = password.toString();
          const hashedPassword = await bcrypt.hash(newpassword, salt);
          try {
            const user = await auth.create({
              email: email,
              password: hashedPassword,
            });
            console.log(user,"user;user")
            user.save();
            reponseFormat(
              res,
              (status_code = 200),
              (msg = "you are registered..")
            );
          } catch (userCreationError) {
            reponseFormat(res, (status_code = 500), (msg = userCreationError));
          }
        }
      }catch(err){
console.log(err,"error")
      }
   
    }
  } catch (error) {
    reponseFormat(res, (status_code = 500), (msg = error));
  }
});

app.use("/api/login", LoginRoute);
app.use("/api/create_project", ProjectsRoute);
app.use("/api/project_list", ProjectsRoute);
app.use("/api/update-project-status", ProjectsRoute);
app.use("/api/dash", dashboardRoute);

connectdb().then(() => {
  app.listen(process.env.port || 8000, () => {});
});
