const UserController = require("./userController");
const UserModel = require("../models/userModel.js");
const EmployeeModel = require("../models/employeeModel");
const { validatePassword } = require("../utils/hash");
// Create and Save a new User
exports.login = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  EmployeeModel.findById(req.body.username, (err, employee) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Employee with id " + req.params.id,
        });
      }
    } else {
      UserModel.findById(employee.auth_ID, (err, auth) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with id ${req.params.id}.`,
            });
          } else {
            res.status(500).send({
              message: "Error retrieving User with id " + req.params.id,
            });
          }
        } else {
          console.log({ auth }, auth.password, req.body.password);
          if (validatePassword(req.body.password, auth.password)) {
            const data = { auth, employee };
            // console.log("password match");
            data["token"] = "fndjafklyirewlqrbkdbafdsafdsaf";
            res.send(data);
          } else {
            console.log("password not match");
            res.status(401);
          }
        }
      });
    }
  });
};
