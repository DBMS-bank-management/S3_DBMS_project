const { jwtauth } = require("../utils/jwt");
const { isCustomer } = require("../utils/middleware");

module.exports = (app) => {
  const loans = require("../controllers/LoanController");

  var router = require("express").Router();

  // Get loans by id
  router.get("/byUser", [jwtauth, isCustomer], loans.getLoansByUserID);

  // user signup
  router.post("/", [jwtauth], loans.create);

  // Get all loans
  router.get("/", [jwtauth], loans.findAll);

  router.get("/:id", [jwtauth], loans.findOne);

  // Update a user with id
  router.put("/:id", [jwtauth], loans.update);

  // Delete a user with id
  router.delete("/:id", [jwtauth], loans.delete);

  app.use("/loans", router);
};
