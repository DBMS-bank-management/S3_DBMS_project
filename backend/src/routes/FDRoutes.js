module.exports = (app) => {
    const fd = require("../controllers/fdController");
  
    var router = require("express").Router();
    
    // fd signup
    router.post("/", fd.create);
  
    // Get all fd
    router.get("/", fd.findAll);
  
    router.get("/:id", fd.findOne);
  
    // Update a fd with id
    router.put("/:id", fd.update);
  
    // Delete a fd with id
    router.delete("/:id", fd.delete);
  
     // Get the fixed deposits by id
    router.get("/users/:id", fd.getFixedDepositsByUserID);

    app.use("/fd", router);
  };
  