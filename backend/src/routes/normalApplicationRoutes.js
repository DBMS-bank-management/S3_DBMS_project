const { isEmployee, isManager, isCustomer } = require("../utils/middleware");
const normalapplications = require("../controllers/normalApplicationController");
const { jwtauth } = require("../utils/jwt");

module.exports = (app) => {
  var router = require("express").Router();

  router.get(
    "/pending/byUser",
    [jwtauth, isCustomer],
    normalapplications.getPendingLoanApplicationsByCustomerId
  );

  // normal applicatin signup
  router.post("/", [jwtauth, isEmployee], normalapplications.create);

  // Get all activities
  router.get("/", normalapplications.findAll);

  router.get("/:id", normalapplications.findOne);

  // Update a normal application with id
  router.put("/:id", normalapplications.update);

  // Delete a normal application with id
  router.delete("/:id", normalapplications.delete);

  router.post("/decline/:id", [jwtauth, isManager], normalapplications.decline);
  
  // normal application approval
  router.post("/approve/:id", [jwtauth, isManager], normalapplications.approve);

  app.use("/normalapplications", router);
};
