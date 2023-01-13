const { isEmployee } = require("../utils/middleware");

module.exports = (app) => {
  const customers = require("../controllers/customerController");
  const { jwtauth } = require("../utils/jwt.js");

  var router = require("express").Router();

  router.post("/linkOnlineAccount", [jwtauth, isEmployee], customers.createAuthID);
  // customers signup
  router.post("/", [jwtauth], customers.create);

  // Get all users
  router.get("/", [jwtauth], customers.findAll);

  router.get("/:id", [jwtauth], customers.findOne);

  // Update a user with id
  router.put("/:id", [jwtauth], customers.update);

  // Delete a user with id
  router.delete("/:id", [jwtauth], customers.delete);

  app.use("/customers", router);
};
