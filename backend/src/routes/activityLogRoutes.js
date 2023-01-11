module.exports = (app) => {
    const activities = require("../controllers/activityLogController");
  
    var router = require("express").Router();
  
    // user signup
    router.post("/", [jwtauth], activities.create);
  
    // Get all activities
    router.get("/", [jwtauth], activities.findAll);
  
    router.get("/:id", [jwtauth], activities.findOne);
  
    // Update a user with id
    router.put("/:id", [jwtauth], activities.update);
  
    // Delete a user with id
    router.delete("/:id", [jwtauth], activities.delete);
  
    app.use("/activitylogs", router);
  };