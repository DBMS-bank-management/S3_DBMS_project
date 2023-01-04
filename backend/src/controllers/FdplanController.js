const FdplanModel = require("../models/FdplanModel");

// Create and Save a new FdplanModel

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
       res.status(400).semd({
        message: "Content can not be empty!",
       });
    }

    // Create a FdplanModel
    const fdplan = new FdplanModel({
        Plan_id: req.body.Plan_ID,
        interest: req.body.interset,
        duration: req.body.duration
        
    });

    //Save FdplanModel in the database
    FdplanModel.create(fdplan, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the FdplanModel.",
          });
        else res.send(data);
      });
    };

// Retrieve all fdPlans from the database (with condition).
exports.findAll = (req, res) => {
    const title = req.query.title;
    console.log("Entered");
    FdplanModel.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving fdPlans.",
        });
      else res.send(data);
    });
  };

// Find a single fdPlans by Id
exports.findOne = (req, res) => {
    FdplanModel.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found FdplanModel  with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: "Error retrieving FdplanModel  with id " + req.params.id,
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
    FdplanModel.updateById(req.params.id, new FdplanModel(req.body), (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found fd plan with Plan_id ${req.params.id}.`,
            });
          } else {
            res.status(500).send({
              message: "Error updating fd plan  with Plan_id " + req.params.id,
            });
          }
        } else res.send(data);
      });
    };

    exports.delete = (req, res) => {
        FdplanModel.remove(req.params.id, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found fd plan  with Plan_id ${req.params.id}.`,
              });
            } else {
              res.status(500).send({
                message: "Could not delete fd plan  with Plan_id" + req.params.id,
              });
            }
          } else res.send({ message: `fd plan  was deleted successfully!` });
        });
      };
      
  