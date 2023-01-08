const { isEmployee } = require("../utils/middleware");
const normalapplications = require("../controllers/normalApplicationController");
const { jwtauth } = require("../utils/jwt");

module.exports = (app) => {
  var router = require("express").Router();

  // normal applicatin signup
  router.post("/", [jwtauth, isEmployee], normalapplications.create);

  // Get all activities
  router.get("/", normalapplications.findAll);

  router.get("/:id", normalapplications.findOne);

  // Update a normal application with id
  router.put("/:id", normalapplications.update);

  // Delete a normal application with id
  router.delete("/:id", normalapplications.delete);

  app.use("/normalapplications", router);
};
