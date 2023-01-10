module.exports = (app) => {
    const loans = require("../controllers/LoanController");

    var router = require("express").Router();
  
    // user signup
    router.post("/",[jwtauth],  loans.create);
  
    // Get all loans
    router.get("/", [jwtauth], loans.findAll);
  
    router.get("/:id", [jwtauth], loans.findOne);
  
    // Update a user with id
    router.put("/:id", [jwtauth], loans.update);
  
    // Delete a user with id
    router.delete("/:id", [jwtauth], loans.delete);

     // Get loans by id
     router.get("/users/:id", [jwtauth], loans.getLoansByUserID);

    app.use("/loans", router);
  };
  