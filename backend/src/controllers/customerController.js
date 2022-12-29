const CustomerModel = require("../models/customerModel.js");


// Create and Save a new UserModel
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a UserModel
  const customer = new CustomerModel({
    name: req.body.name,
    type: req.body.type,
    auth_ID: req.body.auth_ID,
    contact_no: req.body.contact_no
  });

  // Save UserModel in the database
    CustomerModel.create(customer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the CustomerModel.",
      });
    else res.send(data);
  });
};

// Retrieve all Users from the database (with condition).
exports.findAll = (req, res) => {
  const name = null //req.query.name;

  CustomerModel.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving customers.",
      });
    else res.send(data);
  });
};

// Find a single UserModel by Id
exports.findOne = (req, res) => {
  CustomerModel.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found CustomerModel with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving CustomerModel with id " + req.params.id,
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

  CustomerModel.updateById(req.params.id, new CustomerModel(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with ID ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Customer with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  UserModel.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.id,
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};
