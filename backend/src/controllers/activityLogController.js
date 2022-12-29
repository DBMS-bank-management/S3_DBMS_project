const ActivityModel = require("../models/activityLogModel.js");

// Create and Save a new BranchModel

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
       res.status(400).semd({
        message: "Content can not be empty!",
       });
    }

    // Create a activityLogModel
    const activityLog = new ActivityModel({
        log_id: req.body.log_id,
        auth_id: req.body.auth_id,
        timestamp: req.body.timestamp,
        action: req.body.action
    });

    //Save activityLogModel in the database
    ActivityModel.create(activityLog, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the UserModel.",
          });
        else res.send(data);
      });
    };

// Retrieve all activities from the database (with condition).
exports.findAll = (req, res) => {
    const title = req.query.title;
    console.log("Entered");
    ActivityModel.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving activities.",
        });
      else res.send(data);
    });
  };

// Find a single BranchModel by Id
exports.findOne = (req, res) => {
    ActivityModel.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found ActivityModel with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: "Error retrieving ActivityModel with id " + req.params.id,
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
    ActivityModel.updateById(req.params.id, new ActivityModel(req.body), (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found activity with avtivity_id ${req.params.id}.`,
            });
          } else {
            res.status(500).send({
              message: "Error updating activity with avtivity_id " + req.params.id,
            });
          }
        } else res.send(data);
      });
    };

    exports.delete = (req, res) => {
        ActivityModel.remove(req.params.id, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found activity with activity_id ${req.params.id}.`,
              });
            } else {
              res.status(500).send({
                message: "Could not delete activity with activity_id " + req.params.id,
              });
            }
          } else res.send({ message: `Branch was deleted successfully!` });
        });
      };
      
  