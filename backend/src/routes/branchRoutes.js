module.exports = (app) => {
    const branches = require("../controllers/branchController");
  
    var router = require("express").Router();
  
    // user signup
    router.post("/", [jwtauth], branches.create);
  
    // Get all branches
    router.get("/", [jwtauth], branches.findAll);
  
    router.get("/:id", [jwtauth], branches.findOne);
  
    // Update a user with id
    router.put("/:id", [jwtauth], branches.update);
  
    // Delete a user with id
    router.delete("/:id", [jwtauth], branches.delete);
  
    app.use("/branches", router);
  };
  