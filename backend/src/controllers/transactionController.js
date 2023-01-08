const TransactionModel = require("../models/transactionModel");

// Create and Save a new TransactionModel
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a TransactionModel
  const transaction = new TransactionModel({
    trans_ID: req.body.trans_ID,
    amount: req.body.amount,
    mode_ID: req.body.mode_ID,
    acc_ID: req.body.acc_ID,
    description: req.body.description,
  });

  // Save TransactionModel in the database
  TransactionModel.create(transaction, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the TransactionModel.",
      });
    else res.send(data);
  });
};

// Retrieve all transaction from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  TransactionModel.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving transaction.",
      });
    else res.send(data);
  });
};

// Find a single TransactionModel by Id
exports.findOne = (req, res) => {
  TransactionModel.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found TransactionModel with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving TransactionModel with id " + req.params.id,
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

  // console.log(req.body);

  TransactionModel.updateById(
    req.params.id,
    new TransactionModel(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found transaction with trans_ID ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message:
              "Error updating transaction with trans_ID " + req.params.id,
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  TransactionModel.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found transaction with trans_ID ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete transaction with trans_ID " + req.params.id,
        });
      }
    } else res.send({ message: `transaction was deleted successfully!` });
  });
};

//find by account number???
exports.getTransactionsByUserID = (req, res) => {
  const customerId = req.user.customer.ID;

  TransactionModel.findTransactionsByUserId(customerId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving transactions.",
      });
    else res.send(data);
  });
};

exports.addTransfer = (req, res) => {
  TransactionModel.addTransfer(req.body, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving transactions.",
      });
    else res.send(data);
  });
};
