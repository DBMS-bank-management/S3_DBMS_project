const LoanPlanModel = require("../models/LoanplanModel");

// Create and Save a new loanplanModel

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
       res.status(400).semd({
        message: "Content can not be empty!",
       });
    }

    // Create a loanplanModel
    const loanplan = new LoanPlanModel({
        Plan_id: req.body.Plan_ID,
        interest: req.body.interset,
        duration: req.body.duration
        
    });

    //Save loanplanModel in the database
    LoanPlanModel.create(loanplan, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the loanplanModel.",
          });
        else res.send(data);
      });
    };

// Retrieve all loanPlans from the database (with condition).
exports.findAll = (req, res) => {
    const title = req.query.title;
    console.log("Entered");
    LoanPlanModel.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving loanPlans.",
        });
      else res.send(data);
    });
  };

// Find a single loanPlan by Id
exports.findOne = (req, res) => {
    LoanPlanModel.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found LoanPlanModel  with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: "Error retrieving LoanPlanModel  with id " + req.params.id,
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
    LoanPlanModel.updateById(req.params.id, new LoanPlanModel(req.body), (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Loan plan with Plan_id ${req.params.id}.`,
            });
          } else {
            res.status(500).send({
              message: "Error updating Loan Plan with Plan_id " + req.params.id,
            });
          }
        } else res.send(data);
      });
    };

    exports.delete = (req, res) => {
        LoanPlanModel.remove(req.params.id, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Loan Plan with Plan_id ${req.params.id}.`,
              });
            } else {
              res.status(500).send({
                message: "Could not delete Loan Plan with Plan_id" + req.params.id,
              });
            }
          } else res.send({ message: `Loan Plan was deleted successfully!` });
        });
      };
      
  