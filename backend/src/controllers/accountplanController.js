const accountPlanModel = require("../models/accountplanModel");

// Create and Save a new accountplanModel

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
       res.status(400).semd({
        message: "Content can not be empty!",
       });
    }

    // Create a accountplanModel
    const accountplan = new accountPlanModel({
        Plan_id: req.body.Plan_ID,
        Type: req.body.Type,
        withdrawal_count : req.body.withdrawal_count,
        Min_amount: req.body.Min_amount
        
    });

    //Save accountPlanModel in the database
    accountPlanModel.create(accountplan, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the accountPlanModel.",
          });
        else res.send(data);
      });
    };

// Retrieve all accountPlans from the database (with condition).
exports.findAll = (req, res) => {
    const title = req.query.title;
    console.log("Entered");
    accountPlanModel.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Account Plan.",
        });
      else res.send(data);
    });
  };

// Find a single accountPlan by Id
exports.findOne = (req, res) => {
    accountPlanModel.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found accountPlanModel with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: "Error retrieving accountPlanModel with id " + req.params.id,
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
    accountPlanModel.updateById(req.params.id, new accountPlanModel(req.body), (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Account Plan with Plan_id ${req.params.id}.`,
            });
          } else {
            res.status(500).send({
              message: "Error updating Account Plan with Plan_id " + req.params.id,
            });
          }
        } else res.send(data);
      });
    };

    exports.delete = (req, res) => {
        accountPlanModel.remove(req.params.id, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Account Plan with Plan_id ${req.params.id}.`,
              });
            } else {
              res.status(500).send({
                message: "Could not delete Account Plan with Plan_id" + req.params.id,
              });
            }
          } else res.send({ message: `Account Plan was deleted successfully!` });
        });
      };
      
  