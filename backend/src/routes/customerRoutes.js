module.exports = (app) => {
    const customers = require("../controllers/customerController");
  
    var router = require("express").Router();
  
    // customers signup
    router.post("/", customers.create);
  
    // Get all users
    router.get("/", customers.findAll);
  
    router.get("/:id", customers.findOne);
  
    // Update a user with id
    router.put("/:id", customers.update);
  
    // Delete a user with id
    router.delete("/:id", customers.delete);
  
    app.use("/customers", router);
  };
  