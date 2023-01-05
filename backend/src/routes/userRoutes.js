module.exports = (app) => {
  const users = require("../controllers/userController");
  const { jwtauth } = require("../utils/jwt.js");
  const { isManager, isEmployee } = require("../utils/middleware.js");
  var router = require("express").Router();

  // user signup
  router.post("/",[jwtauth], users.create);

  // Get all users
  router.get("/", [jwtauth, isEmployee], users.findAll);

  router.get("/:id", [jwtauth, isEmployee], users.findOne);

  // Update a user with id
  router.put("/:id", [jwtauth, isManager], users.update);

  // Delete a user with id
  router.delete("/:id", [jwtauth, isManager], users.delete);

  app.use("/users", router);
};
