module.exports = (app) => {
    const transaction_modes = require("../controllers/transmodeController");
  
    var router = require("express").Router();
  
    // user signup
    router.post("/", [jwtauth],transaction_modes.create);
  
    // Get all activities
    router.get("/", [jwtauth], transaction_modes.findAll);
  
    router.get("/:id", [jwtauth], transaction_modes.findOne);
  
    // Update a user with id
    router.put("/:id", [jwtauth], transaction_modes.update);
  
    // Delete a user with id
    router.delete("/:id", [jwtauth], transaction_modes.delete);
  
    app.use("/transactionmodes", router);
  };