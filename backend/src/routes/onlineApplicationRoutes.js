module.exports = (app) => {
    const onlineapplications = require("../controllers/onlineApplicationController");
  
    var router = require("express").Router();
  
    // online applicatin signup
    router.post("/", onlineapplications.create);
  
    // Get all activities
    router.get("/", onlineapplications.findAll);
  
    router.get("/:id", onlineapplications.findOne);
  
    // Update a online application with id
    router.put("/:id", onlineapplications.update);
  
    // Delete a online application with id
    router.delete("/:id", onlineapplications.delete);
  
    app.use("/onlineapplications", router);
  };