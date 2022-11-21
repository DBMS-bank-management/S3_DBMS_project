const UserController = require("./userController");
const UserModel = require("../models/userModel.js");

// Create and Save a new User
exports.login = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  console.log(req.body);
  UserModel.findById(req.body.username, (err, data) => {
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
      console.log({ data }, data.password, req.body.password);
      if (data.password == req.body.password) {
        console.log('password match')
        data['token'] = 'fndjafklyirewlqrbkdbafdsafdsaf'
        res.send(data);
      }
      else{
        console.log('password not match')
        res.status(401);
      }
    }
  });
};
