module.exports = (app) => {
    const activities = require("../controllers/activityLogController");
  
    var router = require("express").Router();
  
    // user signup
    router.post("/", activities.create);
  
    // Get all activities
    router.get("/", activities.findAll);
  
    router.get("/:id", activities.findOne);
  
    // Update a user with id
    router.put("/:id", activities.update);
  
    // Delete a user with id
    router.delete("/:id", activities.delete);
  
    app.use("/activitylogs", router);
  };