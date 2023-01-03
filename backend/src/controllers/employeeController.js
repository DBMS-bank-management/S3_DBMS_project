const EmployeeModel = require("../models/employeeModel.js");

// Create and Save a new EmployeeModel
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a EmployeeModel
  const employee = new EmployeeModel({
    emp_name: req.body.emp_name,
    branch_ID: req.body.branch_ID,
    Is_manager: req.body.Is_manager,
    auth_ID: req.body.auth_ID,
  });

  // Save EmployeeModel in the database
  EmployeeModel.create(employee, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the EmployeeModel.",
      });
    else res.send(data);
  });
};

// Retrieve all Employees from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  EmployeeModel.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Employees.",
      });
    else res.send(data);
  });
};

// Find a single EmployeeModel by Id
exports.findOne = (req, res) => {
  EmployeeModel.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found EmployeeModel with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving EmployeeModel with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  EmployeeModel.updateById(req.params.id, new EmployeeModel(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Employee with auth_ID ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Employee with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  EmployeeModel.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Employee with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Employee with id " + req.params.id,
        });
      }
    } else res.send({ message: `Employee was deleted successfully!` });
  });
};
