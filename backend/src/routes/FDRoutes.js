const { jwtauth } = require("../utils/jwt");
const { isCustomer } = require("../utils/middleware");

module.exports = (app) => {

  const fd = require("../controllers/fdController");

  var router = require("express").Router();

  // Get the fixed deposit by customer
  router.get("/byCustomer", [jwtauth, isCustomer], fd.getFixedDepositsByUserID);

  // fd signup
  router.post("/", fd.create);

  // Get all fd
  router.get("/", fd.findAll);

  router.get("/:id", fd.findOne);

  // Update a fd with id
  router.put("/:id", fd.update);

  // Delete a fd with id
  router.delete("/:id", fd.delete);

  app.use("/fd", router);
};
