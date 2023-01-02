module.exports = (app) => {
    const accounts = require("../controllers/accountController");
  
    var router = require("express").Router();
  
    // user signup
    router.post("/", accounts.create);
  
    // Get all accounts
    router.get("/", accounts.findAll);
  
    router.get("/:id", accounts.findOne);
  
    // Update a user with id
    router.put("/:id", accounts.update);
  
    // Delete a user with id
    router.delete("/:id", accounts.delete);
  
    app.use("/accounts", router);
  };
  