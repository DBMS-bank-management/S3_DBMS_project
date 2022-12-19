//
// This file contains the authentication middleware used to check whether the user is a manager or an employee
//

let isManager = async (req, res, next) => {
  try {
    if (req.user.role == "manager") {
      next();
    } else {
      res.status(400).json({
        status: 400,
        message: "Unauthorized, only manager can access",
      });
    }
  } catch (err) {
    console.log({ err });
    res.status(400).json({
      status: 400,
      message: "Error with your user role",
    });
  }
};

let isEmployee = async (req, res, next) => {
  try {
    if (req.user.role == "employee" || req.user.role == "manager") {
      next();
    } else {
      res.status(400).json({
        status: 400,
        message: "Unauthorized, only an employee can access",
      });
    }
  } catch (err) {
    console.log({ err });
    res.status(400).json({
      status: 400,
      message: "Error with your user role",
    });
  }
};

module.exports.isManager = isManager;
module.exports.isEmployee = isEmployee;
