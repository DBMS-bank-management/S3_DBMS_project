module.exports = (app) => {
    const branches = require("../controllers/branchController");
  
    var router = require("express").Router();
  
    // user signup
    router.post("/", branches.create);
  
    // Get all branches
    router.get("/", branches.findAll);
  
    router.get("/:id", branches.findOne);
  
    // Update a user with id
    router.put("/:id", branches.update);
  
    // Delete a user with id
    router.delete("/:id", branches.delete);
  
    app.use("/branches", router);
  };
  