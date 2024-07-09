const express = require("express");
const reponseFormat = require("../util");
const { project } = require("../Model/create_ProjectSchema");
const ProjectsRoute = express.Router();

ProjectsRoute.get("/", async (req, res) => {
  const projectdata = await project.find();
  reponseFormat(
    res,
    (status_code = 200),
    (msg = "success"),
    (data = projectdata)
  );
});

ProjectsRoute.post("/", async (req, res) => {
  let {
    project_theme,
    reason,
    type,
    division,
    category,
    priority,
    department,
    location,
    status,
  } = req.body;
  try {
    const projectdata = await project.insertMany({
      project_theme: project_theme,
      reason: reason,
      type: type,
      division: division,
      category: category,
      priority: priority,
      department: department,
      location: location,
      status: status,
    });
    reponseFormat(res, (status_code = 200), (msg = "success"));
  } catch (err) {
    res.status(400).send(err);
  }
});

ProjectsRoute.put("/:id", async (req, res) => {
  const id = req.params.id;
  let { status } = req.body;
  if (!!!status) {
    reponseFormat(
      res,
      (status_code = 400),
      (msg = "status field is required.")
    );
    return;
  }

  try {
    let update = await project.updateOne(
      { _id: id },
      { $set: { status: status } }
    );

    reponseFormat(res, (status_code = 200), (msg = "your entry is updated.."));
  } catch (err) {
    reponseFormat(res, (status_code = 500), (msg = "SomeThing went Wrong.."));
  }
});

module.exports = ProjectsRoute;
