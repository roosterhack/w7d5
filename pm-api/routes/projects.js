const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const Task = require("../models/Task");

router.post("/projects", (req, res) => {
  Project.create({
    title: req.body.title,
    description: req.body.description,
    tasks: []
  })
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      res.json(error);
    });
});

router.get("/projects", (req, res) => {
  Project.find({})
    .populate("tasks")
    .then(projects => {
      res.json(projects);
    })
    .catch(error => {
      res.json(error);
    });
});

router.get("/projects/:id", (req, res) => {
  Project.findById(req.params.id)
    .populate("tasks")
    .then(project => {
      res.json(project);
    })
    .catch(error => {
      res.json(error);
    });
});

router.put("/projects/:id", (req, res) => {
  Project.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      // .status() optional
      res.status(200).json({ message: "ok" });
    })
    .catch(error => {
      res.json(error);
    });
});

router.delete("/projects/:id", (req, res) => {
  Project.findByIdAndDelete(req.params.id)
    .then(() => {
      // .status() optional
      res.status(200).json({ message: "ok" });
    })
    .catch(error => {
      res.json(error);
    });
});

module.exports = router;
