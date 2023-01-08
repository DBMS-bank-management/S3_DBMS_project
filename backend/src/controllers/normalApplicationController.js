const NormalApplicationModel = require("../models/normalApplicationModel.js");


// Create and Save a new NormalApplicationModel
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a NormalApplicationModel
  const normalApplication = new NormalApplicationModel({
    app_ID: req.body.app_ID,
    branch_ID: req.body.branch_ID,
    acc_ID: req.body.acc_ID,
    amount: req.body.amount,
    is_approved: req.body.is_approved,
    app_date: req.body.app_date,
    loan_ID: req.body.loan_ID
  });

  // Save NormalApplicationModel in the database
    NormalApplicationModel.create(normalApplication, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the NormalApplicationModel.",
      });
    else res.send(data);
  });
};

// Retrieve all NormalApplications from the database (with condition).
exports.findAll = (req, res) => {
  const name = null //req.query.name;

  NormalApplicationModel.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving normal applications.",
      });
    else res.send(data);
  });
};

// Find a single NormalApplicationModel by Id
exports.findOne = (req, res) => {
  NormalApplicationModel.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found NormalApplicationModel with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving NormalApplicationModel with id " + req.params.id,
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

  NormalApplicationModel.updateById(req.params.id, new NormalApplicationModel(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Normal Application with ID ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Normal Application with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  NormalApplicationModel.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Normal Application with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Normal Applicatin with id " + req.params.id,
        });
      }
    } else res.send({ message: `Normal Application was deleted successfully!` });
  });
};
exports.approve = (req, res) => {
  NormalApplicationModel.approve(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Normal Application with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not check the eligibility for Normal Applicatin with id " + req.params.id,
        });
      }
    } else res.send({ message: `Eligibility for loan was checked successfully!` });
  });
};
