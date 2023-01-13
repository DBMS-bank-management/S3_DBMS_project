module.exports = (app) => {
    const reports = require("../controllers/reportController");
    const { jwtauth } = require("../utils/jwt.js");
    const { isManager, isEmployee } = require("../utils/middleware.js");
    var router = require("express").Router();
  
    router.post("/lateInstallmentsReport",[jwtauth, isManager], reports.lateInstallmentsReport);

    router.post("/totalTransactionReport", [jwtauth, isManager], reports.totalTransactionReport);

    app.use("/reports", router);
  };
  