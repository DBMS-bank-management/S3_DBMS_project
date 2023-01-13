module.exports = (app) => {
  const reports = require("../controllers/reportController");
  const { jwtauth } = require("../utils/jwt.js");
  const { isManager, isEmployee } = require("../utils/middleware.js");
  var router = require("express").Router();

  router.get(
    "/lateInstallmentsReport",
    [jwtauth, isManager],
    reports.lateInstallmentsReport
  );

  router.get(
    "/totalTransactionReport",
    [jwtauth, isManager],
    reports.totalTransactionReport
  );

  app.use("/reports", router);
};
