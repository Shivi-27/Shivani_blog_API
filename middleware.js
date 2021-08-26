const { jwtSecreat } = require("./utilities").constants;
const jwt = require("jsonwebtoken");

let verifyUser = (req, res, next) => {
  if (!req.headers.token)
    return res.status(400).json("Please provide token in headers!");
  jwt.verify(req.headers.token, jwtSecreat, (err, payLoad) => {
    if (err) return res.status(400).json("Invalid acess token!");
    req.user = payLoad;
    next();
  });
};

let verifyAuther = (req, res, next) => {
  if (!req.headers.token)
    return res.status(400).json("Please provide token in headers!");
  jwt.verify(req.headers.token, jwtSecreat, (err, payLoad) => {
    if (err || payLoad.userType !== "AUTHER")
      return res.status(400).json("Invalid acess token!");
    req.user = payLoad;
    next();
  });
};

module.exports = { verifyUser, verifyAuther };
