const OnlineApplicationModel = require("../models/onlineApplicationModel.js");


// Create and Save a new OnlineApplicationModel
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a OnlineApplicationModel
  const onlineApplication = new OnlineApplicationModel({
    app_ID: req.body.app_ID,
    fd_ID: req.body.fd_ID,
    acc_ID: req.body.acc_ID,
    amount: req.body.amount,
    app_date: req.body.app_date,
    loan_ID: req.body.loan_ID
  });

  // Save OnlineApplicationModel in the database
    OnlineApplicationModel.create(onlineApplication, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the OnlineApplicationModel.",
      });
    else res.send(data);
  });
};

// Retrieve all OnlineApplications from the database (with condition).
exports.findAll = (req, res) => {
  const name = null //req.query.name;

  OnlineApplicationModel.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving online applications.",
      });
    else res.send(data);
  });
};

// Find a single OnlineApplicationModel by Id
exports.findOne = (req, res) => {
  OnlineApplicationModel.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found OnlineApplicationModel with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving OnlineApplicationModel with id " + req.params.id,
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

  OnlineApplicationModel.updateById(req.params.id, new OnlineApplicationModel(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Online Application with ID ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Online Application with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  OnlineApplicationModel.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Online Application with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Online Applicatin with id " + req.params.id,
        });
      }
    } else res.send({ message: `Online Application was deleted successfully!` });
  });
};




// exports.addloan = (req, res) => {
//   OnlineApplicationModel.approve(req.params.id, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found Online Application with id ${req.params.id}.`,
//         });
//       } else {
//         res.status(500).send({
//           message: "Could not check the eligibility for Online Applicatin with id " + req.params.id,
//         });
//       }
//     } else res.send({ message: `Eligibility for loan was checked successfully!` });
//   });
// };