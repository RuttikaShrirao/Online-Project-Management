const express = require("express");
const connectdb = require("./database");
const cors = require("cors");
const bodyParser = require("body-parser");
const ProjectsRoute = require("./router/create_Project");
const dashboardRoute = require("./router/dashboard");
const LoginRoute = require("./router/LoginRoute");
require("dotenv").config();

var app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api/login", LoginRoute);
app.use("/api/create_project", ProjectsRoute);
app.use("/api/project_list", ProjectsRoute);
app.use("/api/update-project-status", ProjectsRoute);
app.use("/api/dash", dashboardRoute);

connectdb().then(() => {
  app.listen(process.env[process.env.port] || 7000, () => {
  });
});
