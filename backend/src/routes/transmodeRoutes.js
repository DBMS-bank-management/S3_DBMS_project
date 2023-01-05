module.exports = (app) => {
    const transaction_modes = require("../controllers/transmodeController");
  
    var router = require("express").Router();
  
    // user signup
    router.post("/", transaction_modes.create);
  
    // Get all activities
    router.get("/", transaction_modes.findAll);
  
    router.get("/:id", transaction_modes.findOne);
  
    // Update a user with id
    router.put("/:id", transaction_modes.update);
  
    // Delete a user with id
    router.delete("/:id", transaction_modes.delete);
  
    app.use("/transactionmodes", router);
  };