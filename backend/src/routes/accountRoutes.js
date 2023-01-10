module.exports = (app) => {
  const accounts = require("../controllers/accountController");
  const { jwtauth } = require("../utils/jwt.js");
  const { addBranch, isCustomer, isManager } = require("../utils/middleware");

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

  router.get(
    "/updateInterests",
    [jwtauth, isManager],
    accounts.updateInterests
  );

  // user signup
  router.post("/", [jwtauth], accounts.create);

  // Get all accounts
  router.get("/", [jwtauth], accounts.findAll);

  router.get("/:id", [jwtauth], accounts.findOne);

  // Update a user with id
  router.put("/:id", [jwtauth], accounts.update);

  // Delete a user with id
  router.delete("/:id", [jwtauth], accounts.delete);

  // user signup
  router.post("/", [jwtauth], accounts.create);

  app.use("/accounts", router);
};
