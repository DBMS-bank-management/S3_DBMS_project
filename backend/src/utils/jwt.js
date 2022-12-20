const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
// const _ = require("lodash");
const { JwT_SECRET } = require("../config");

let verifyToken = (token, next) => {
  try {
    var decoded = jwt.verify(token, JwT_SECRET);
    return { ...decoded, expired: false };
  } catch (err) {
    if (err) {
      if (err.name === "TokenExpiredError") {
        var decoded = jwt.decode(token);
        if (decoded) {
          return { ...decoded, expired: true };
        } else return false;
      } else return false;
    }
  }
};

let tokenValidation = async (req, res, next) => {
  const auth_header = req.headers["authorization"];
  if (auth_header) {
    try {
      const token = auth_header.split(" ")[1];
      req.token = token;
      const decodedToken = verifyToken(req.token, next);
      console.log({ decodedToken });
      console.log(decodedToken);
      if (!decodedToken) {
        res.status(400).json({
          status: 400,
          message: "User does not have  token",
        });
      } else if (decodedToken.expired) {
        let decoded = jwt.decode(token);

        const user = userModel.findById(decoded.auth_ID, (err, res) => {});

        user.token = jwt.sign(
          {
            id: user._id,
          },
          JwT_SECRET,
          {
            expiresIn: "20s", //change
          }
        );
        req.user = { user, userType: decoded.userType };
        next();
      } else {
        let decoded = jwt.decode(token);
        console.log("not expired");

        userModel.findById(decoded.auth_ID, (err, res) => {
          if (err) {
            console.log({ err });
          }
          let user = res;
          user.token = token;
          req.user = user;
          next();
        });
        console.log("user got in jwt authorization");

        // req.user = _.pick(user, models.User.returnable);
      }
    } catch (err) {
      console.log({ err });
      res.status(400).json({
        status: 400,
        message: "Error with your token",
      });
    }
  } else {
    res.status(400).json({
      status: 400,
      message: "User does not have  token",
    });
  }
};

module.exports.jwtauth = tokenValidation;
