module.exports = (app) => {
  const accounts = require("../controllers/accountController");
  const { jwtauth } = require("../utils/jwt.js");
  const { addBranch, isCustomer } = require("../utils/middleware");

  var router = require("express").Router();

  // Get the accounts by id
  router.get(
    "/byUser",
    [jwtauth, isCustomer],
    accounts.getAccountsByCustomerId
  );

  router.get(
    "/byUser/savings",
    [jwtauth, isCustomer],
    accounts.getSavingsAccountsByCustomerId
  );

  // user signup
  router.post("/", accounts.create);

  // Get all accounts
  router.get("/", accounts.findAll);

  router.get("/:id", accounts.findOne);

  // Update a user with id
  router.put("/:id", accounts.update);

  // Delete a user with id
  router.delete("/:id", accounts.delete);

  // user signup
  router.post("/", accounts.create);

  app.use("/accounts", router);
};
