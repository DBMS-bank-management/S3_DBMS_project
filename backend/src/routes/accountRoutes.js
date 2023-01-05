module.exports = (app) => {
  const accounts = require("../controllers/accountController");
  const { jwtauth } = require("../utils/jwt.js");
  const { addBranch, isCustomer } = require("../utils/middleware");

  var router = require("express").Router();

  // user signup
  router.post("/", accounts.create);

  // Get the accounts by id
  router.get(
    "/byUser",
    [jwtauth, isCustomer],
    accounts.getAccountsByCustomerId
  );

  // Get all accounts
  router.get("/", [jwtauth], accounts.findAll);

  router.get("/:id", accounts.findOne);

  // Update a user with id
  router.put("/:id", accounts.update);

  // Delete a user with id
  router.delete("/:id", accounts.delete);

  app.use("/accounts", router);
};
