const { jwtauth } = require("../utils/jwt");
const { isCustomer } = require("../utils/middleware");

module.exports = (app) => {
  const transactions = require("../controllers/transactionController");

  var router = require("express").Router();

  router.post("/addTransfer", transactions.addTransfer);

  // Get the transactions by id
  router.get(
    "/byCustomer",
    [jwtauth, isCustomer],
    transactions.getTransactionsByUserID
  );

  // user signup
  router.post("/", [jwtauth], transactions.create);

  // Get all transactions
  router.get("/", [jwtauth], transactions.findAll);

  router.get("/:id", [jwtauth], transactions.findOne);

  // Update a user with id
  router.put("/:id", [jwtauth], transactions.update);

  // Delete a user with id
  router.delete("/:id", [jwtauth], transactions.delete);

  app.use("/transactions", router);
};
