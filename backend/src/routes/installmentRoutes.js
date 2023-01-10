module.exports = (app) => {
    const installments = require("../controllers/installmentController");
  
    var router = require("express").Router();
  
    // user signup
    router.post("/", [jwtauth], installments.create);
  
    // Get all installments
    router.get("/", [jwtauth], installments.findAll);
  
    router.get("/:id", [jwtauth], installments.findOne);
  
    // Update a user with id
    router.put("/:id", [jwtauth], installments.update);
  
    // Delete a user with id
    router.delete("/:id", [jwtauth], installments.delete);
  
    app.use("/installments", router);
  };
  