module.exports = (app) => {
  const users = require("../controllers/userController");
  const { jwtauth } = require("../utils/jwt.js");
  var router = require("express").Router();

  // user signup
  router.post("/", [jwtauth], users.create);

  // Get all users
  router.get("/", users.findAll);

  router.get("/:id", users.findOne);

  // Update a user with id
  router.put("/:id", users.update);

  // Delete a user with id
  router.delete("/:id", users.delete);

  app.use("/users", router);
};
