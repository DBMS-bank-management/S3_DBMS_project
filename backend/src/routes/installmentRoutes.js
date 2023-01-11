const { jwtauth } = require("../utils/jwt");
const { isCustomer, isEmployee } = require("../utils/middleware");

module.exports = (app) => {
  const installments = require("../controllers/installmentController");

  var router = require("express").Router();

  // Get all installments
  router.get("/byUser", [isCustomer], installments.getByCustomerId);

  // pay using account
  router.post(
    "/pay/usingAccount",
    [jwtauth, isCustomer],
    installments.payUsingAccount
  );

  router.post("/pay/byCash", [isEmployee], installments.payByCash);

  // user signup
  router.post("/", installments.create);

  // Get all installments
  router.get("/", installments.findAll);

  router.get("/:id", installments.findOne);

  // Update a user with id
  router.put("/:id", installments.update);

  // Delete a user with id
  router.delete("/:id", installments.delete);

  app.use("/installments", [jwtauth], router);
};
