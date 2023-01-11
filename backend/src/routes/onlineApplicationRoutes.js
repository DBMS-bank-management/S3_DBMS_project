const { jwtauth } = require("../utils/jwt");

module.exports = (app) => {
    const onlineapplications = require("../controllers/onlineApplicationController");
  
    var router = require("express").Router();

  
    // // online application approval
    // router.post("/", onlineapplications.addloan);

    // online applicatin signup
    router.post("/", [jwtauth], onlineapplications.create);
  
    // Get all activities
    router.get("/", [jwtauth], onlineapplications.findAll);
  
    router.get("/:id", [jwtauth], onlineapplications.findOne);
  
    // Update a online application with id
    router.put("/:id", [jwtauth], onlineapplications.update);
  
    // Delete a online application with id
    router.delete("/:id", [jwtauth], onlineapplications.delete);
  
    app.use("/onlineapplications", router);
  };