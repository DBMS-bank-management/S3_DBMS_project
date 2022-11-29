module.exports = (app) => {
    const employees = require("../controllers/employeeController");
  
    var router = require("express").Router();
  
    // employee signup
    router.post("/", employees.create);
  
    // Get all employees
    router.get("/", employees.findAll);
  
    router.get("/:id", employees.findOne);
  
    // Update a employee with id
    router.put("/:id", employees.update);
  
    // Delete a employee with id
    router.delete("/:id", employees.delete);
  
    app.use("/employees", router);
  };
  