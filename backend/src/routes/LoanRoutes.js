module.exports = (app) => {
    const loans = require("../controllers/LoanController");

    var router = require("express").Router();
  
    // user signup
    router.post("/", loans.create);
  
    // Get all loans
    router.get("/", loans.findAll);
  
    router.get("/:id", loans.findOne);
  
    // Update a user with id
    router.put("/:id", loans.update);
  
    // Delete a user with id
    router.delete("/:id", loans.delete);

     // Get loans by id
     router.get("/users/:id", loans.getLoansByUserID);

    app.use("/loans", router);
  };
  