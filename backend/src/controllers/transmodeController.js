const TransactionModesModel = require("../models/transmodeModel");

// Create and Save a new TransactionModeModel

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
       res.status(400).semd({
        message: "Content can not be empty!",
       });
    }

    // Create a TransactionModeModel
    const transmode = new TransactionModesModel({
        mode_id: req.body.mode_id,
        fee: req.body.fee,

    });

    //Save TransactionModeModel in the database
    TransactionModesModel.create(transmode, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the TransactionModeModel.",
          });
        else res.send(data);
      });
    };

// Retrieve all transactionmodes from the database (with condition).
exports.findAll = (req, res) => {
    const title = req.query.title;
    console.log("Entered");
    TransactionModesModel.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving transactionmodes.",
        });
      else res.send(data);
    });
  };

// Find a single BranchModel by Id
exports.findOne = (req, res) => {
    TransactionModesModel.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found TransactionModeModel with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: "Error retrieving TransactionModeModel with id " + req.params.id,
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
    TransactionModesModel.updateById(req.params.id, new TransactionModesModel(req.body), (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Transaction Mode with mode_id ${req.params.id}.`,
            });
          } else {
            res.status(500).send({
              message: "Error updating Transaction Mode with mode_id " + req.params.id,
            });
          }
        } else res.send(data);
      });
    };

    exports.delete = (req, res) => {
        TransactionModesModel.remove(req.params.id, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Transaction Mode with mode_id ${req.params.id}.`,
              });
            } else {
              res.status(500).send({
                message: "Could not delete Transaction Mode with mode_id " + req.params.id,
              });
            }
          } else res.send({ message: `Transaction Mode was deleted successfully!` });
        });
      };
      
  