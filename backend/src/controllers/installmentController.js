const InstallmentModel = require("../models/installmentModel");

// Create and Save a new InstallmentModel
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a InstallmentModel
  const installment = new InstallmentModel({
    inst_ID: req.body.inst_ID,
    loan_ID: req.body.loan_ID,
    amount: req.body.amount,
    due_date: req.body.due_date,
    is_paid: req.body.is_paid,
    trans_ID: req.body.trans_ID,
  });

  // Save InstallmentModel in the database
  InstallmentModel.create(installment, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the InstallmentModel.",
      });
    else res.send(data);
  });
};

// Retrieve all Installment from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  InstallmentModel.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Installment.",
      });
    else res.send(data);
  });
};

// Find a single InstallmentModel by Id
exports.findOne = (req, res) => {
  InstallmentModel.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found InstallmentModel with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving InstallmentModel with id " + req.params.id,
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

  InstallmentModel.updateById(
    req.params.id,
    new InstallmentModel(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Installment with inst_ID ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating Installment with inst_ID " + req.params.id,
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  InstallmentModel.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Installment with inst_ID ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Installment with inst_ID " + req.params.id,
        });
      }
    } else res.send({ message: `Installment was deleted successfully!` });
  });
};

exports.getByCustomerId = (req, res) => {
  const customer_ID = req.user.customer.ID;

  InstallmentModel.getByCustomerID(customer_ID, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Installment.",
      });
    else res.send(data);
  });
};

exports.payUsingAccount = (req, res) => {
  // const customer_ID = req.user.customer.ID; //req.query.name;

  InstallmentModel.payUsingAccount(req.data, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving loans.",
      });
    else res.send(data);
  });
};

exports.payByCash = (req, res) => {
  // const customer_ID = req.user.customer.ID; //req.query.name;

  InstallmentModel.payByCash(req.body, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving loans.",
      });
    else res.send(data);
  });
};
