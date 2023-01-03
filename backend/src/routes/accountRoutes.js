module.exports = (app) => {
    const accounts = require("../controllers/accountController");
    const { jwtauth } = require("../utils/jwt.js");

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
  
    // Get the accounts by id
    router.get("/users/:id",  accounts.getAccountsByUserID)

    app.use("/accounts", router);
  };
  