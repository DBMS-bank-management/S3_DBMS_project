module.exports = (app) => {
  const authentication = require("../controllers/authenticationController");

  var router = require("express").Router();

  // user signup
  router.post("/employee-login", [jwtauth], authentication.employeeLogin);

  router.post("/customer-login", [jwtauth], authentication.customerLogin);

  app.use("/auth", router);
};
