const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (token) {
    token = token.slice(7);
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        res.json({
          message: "Invalid token",
        });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.json({ message: "Access denied!" });
  }
};

module.exports = checkToken;
