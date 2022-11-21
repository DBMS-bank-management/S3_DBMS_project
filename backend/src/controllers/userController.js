const UserModel = require("../models/userModel.js");

// Create and Save a new UserModel
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a UserModel
  const user = new UserModel({
    password: req.body.password,
    role: req.body.role
  });

  // Save UserModel in the database
  UserModel.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the UserModel.",
      });
    else res.send(data);
  });
};

// Retrieve all Users from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  UserModel.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else res.send(data);
  });
};

// Find a single UserModel by Id
exports.findOne = (req, res) => {
  UserModel.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found UserModel with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving UserModel with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};
