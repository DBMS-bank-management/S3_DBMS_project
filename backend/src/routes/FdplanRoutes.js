const { jwtauth } = require("../utils/jwt");

module.exports = (app) => {
    const fd_plans = require("../controllers/FdplanController");
  
    var router = require("express").Router();
  
    // signup
    router.post("/", [jwtauth], fd_plans.create);
  
    // Get all fdt_plans
    router.get("/", fd_plans.findAll);
  
    router.get("/:id", fd_plans.findOne);
  
    // Update a fd_plan with id
    router.put("/:id", [jwtauth], fd_plans.update);
  
    // Delete a fd_plan with id
    router.delete("/:id", [jwtauth], fd_plans.delete);
  
    app.use("/fixeddepositplans", router);
  };