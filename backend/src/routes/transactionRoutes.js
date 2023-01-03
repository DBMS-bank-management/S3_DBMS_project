module.exports = (app) => {
    const transactions = require("../controllers/transactionController");
  
    var router = require("express").Router();
  
    // user signup
    router.post("/", transactions.create);
  
    // Get all transactions
    router.get("/", transactions.findAll);
  
    router.get("/:id", transactions.findOne);
  
    // Update a user with id
    router.put("/:id", transactions.update);
  
    // Delete a user with id
    router.delete("/:id", transactions.delete);
  
    app.use("/transactions", router);
  };
  