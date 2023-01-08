module.exports = (app) => {
  const transactions = require("../controllers/transactionController");

  var router = require("express").Router();

  router.post("/addTransfer", transactions.addTransfer);

  // user signup
  router.post("/", transactions.create);

  // Get all transactions
  router.get("/", transactions.findAll);

  router.get("/:id", transactions.findOne);

  // Update a user with id
  router.put("/:id", transactions.update);

  // Delete a user with id
  router.delete("/:id", transactions.delete);

  // Get the transactions by id
  router.get("/users/:id", transactions.getTransactionsByUserID);

  app.use("/transactions", router);
};
