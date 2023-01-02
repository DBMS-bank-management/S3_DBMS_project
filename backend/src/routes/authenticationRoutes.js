module.exports = (app) => {
const authentication = require("../controllers/authenticationController");

var router = require("express").Router();

// user signup
router.post("/employee-login", authentication.employeeLogin);

app.use("/auth", router);
};