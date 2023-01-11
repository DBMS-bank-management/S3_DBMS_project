const LoanModel = require("../models/LoanModel");

// Create and Save a new LoanModel
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a LoanModel
  const loan = new LoanModel({
    loan_ID: req.body.loan_id,
    acc_ID: req.body.branch_id,
    amount: req.body.balance,
    plan_id: req.body.plan_id,
  });

  // Save LoanModel in the database
  LoanModel.create(loan, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the LoanModel.",
      });
    else res.send(data);
  });
};

// Retrieve all Loans from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  LoanModel.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving loans.",
      });
    else res.send(data);
  });
};

// Find a single LoanModel by Id
exports.findOne = (req, res) => {
  LoanModel.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found LoanModel with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving LoanModel with id " + req.params.id,
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

  LoanModel.updateById(req.params.id, new LoanModel(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Loan with loan_id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Loan with loan_id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  LoanModel.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Loan with loan_id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Loan with loan_id " + req.params.id,
        });
      }
    } else res.send({ message: `Loan was deleted successfully!` });
  });
};

exports.getLoansByUserID = (req, res) => {
  const customer_ID = req.user.customer.ID; //req.query.name;

  LoanModel.findLoansByUserId(customer_ID, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving loans.",
      });
    else res.send(data);
  });
};