const FDModel = require("../models/fdModel.js");

// Create and Save a new FDModel
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a FDModel
  const fd = new FDModel({
    fd_ID: req.body.fd_ID,
    acc_ID: req.body.acc_ID,
    start_date: req.body.start_date,
    amount: req.body.amount,
    plan_ID: req.body.plan_ID,
  });

  // Save FDModel in the database
  FDModel.create(fd, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the FDModel.",
      });
    else res.send(data);
  });
};

// Retrieve all FDs from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  FDModel.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving FDs.",
      });
    else res.send(data);
  });
};

// Find a single FDModel by Id
exports.findOne = (req, res) => {
  FDModel.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found FDModel with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving FDModel with id " + req.params.id,
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

  FDModel.updateById(req.params.id, new FDModel(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found FD with fd_ID ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating FD with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  FDModel.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found FD with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete FD with id " + req.params.id,
        });
      }
    } else res.send({ message: `FD was deleted successfully!` });
  });
};

exports.getFixedDepositsByUserID = (req, res) => {
  
  const customerId = req.user.customer.ID;

  FDModel.findFixedDepositsByUserId(customerId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving fixed deposits.",
      });
    else res.send(data);
  });
};
