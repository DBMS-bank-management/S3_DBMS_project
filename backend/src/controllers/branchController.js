const BranchModel = require("../models/branchModel.js");

// Create and Save a new BranchModel
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a BranchModel
  const branch = new BranchModel({
    branch_id: req.body.branch_id,
    br_name: req.body.br_name,
    location: req.body.location,
  });

  // Save BranchModel in the database
  BranchModel.create(branch, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the BranchModel.",
      });
    else res.send(data);
  });
};

// Retrieve all Branches from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  BranchModel.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Branches.",
      });
    else res.send(data);
  });
};

// Find a single BranchModel by Id
exports.findOne = (req, res) => {
  BranchModel.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found BranchModel with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving BranchModel with id " + req.params.id,
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

  BranchModel.updateById(req.params.id, new BranchModel(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Branch with branch_id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Branch with branch_id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  BranchModel.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Branch with branch_id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Branch with branch_id " + req.params.id,
        });
      }
    } else res.send({ message: `Branch was deleted successfully!` });
  });
};
