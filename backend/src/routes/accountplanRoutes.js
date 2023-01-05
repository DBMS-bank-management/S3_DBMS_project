module.exports = (app) => {
    const account_plans = require("../controllers/accountplanController");
  
    var router = require("express").Router();
  
    // signup
    router.post("/", account_plans.create);
  
    // Get all account_plans
    router.get("/", account_plans.findAll);
  
    router.get("/:id", account_plans.findOne);
  
    // Update a accountplan with id
    router.put("/:id", account_plans.update);
  
    // Delete a accountplan with id
    router.delete("/:id", account_plans.delete);
  
    app.use("/accountplans", router);
  };