module.exports = (app) => {
    const employees = require("../controllers/employeeController");
  
    var router = require("express").Router();
    
    // employee signup
    router.post("/", [jwtauth], employees.create);
  
    // Get all employees
    router.get("/", [jwtauth], employees.findAll);
  
    router.get("/:id", [jwtauth], employees.findOne);
  
    // Update a employee with id
    router.put("/:id", [jwtauth], employees.update);
  
    // Delete a employee with id
    router.delete("/:id", [jwtauth], employees.delete);
  
    app.use("/employees", router);
  };
  