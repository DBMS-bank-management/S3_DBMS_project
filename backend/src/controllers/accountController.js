const AccountModel = require("../models/accountModel");

// Create and Save a new AccountModel
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a AccountModel
  const account = new AccountModel({
    account_id: req.body.account_id,
    branch_id: req.body.branch_id,
    balance : req.body.balance,
    plan_id: req.body.plan_id,  
    customer_id: req.body.customer_id,
  });

  // Save AccountModel in the database
  AccountModel.create(account, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the AccountModel.",
      });
    else res.send(data);
  });
};

// Retrieve all Accounts from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  AccountModel.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Accounts.",
      });
    else res.send(data);
  });
};

// Find a single AccountModel by Id
exports.findOne = (req, res) => {
  AccountModel.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found AccountModel with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving AccountModel with id " + req.params.id,
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

  AccountModel.updateById(req.params.id, new AccountModel(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Account with account_id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Account with account_id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  AccountModel.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Account with account_id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Account with account_id " + req.params.id,
        });
      }
    } else res.send({ message: `Account was deleted successfully!` });
  });
};
