module.exports = (app) => {
    const loan_plans = require("../controllers/LoanplanController");
  
    var router = require("express").Router();
  
    // signup
    router.post("/",[jwtauth],  loan_plans.create);
  
    // Get all loan_plans
    router.get("/", loan_plans.findAll);
  
    router.get("/:id", loan_plans.findOne);
  
    // Update a loan_plan with id
    router.put("/:id", [jwtauth], loan_plans.update);
  
    // Delete a loan_plan with id
    router.delete("/:id", [jwtauth], loan_plans.delete);
  
    app.use("/loanplans", router);
  };