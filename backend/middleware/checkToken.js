const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkToken = (req, res, next) => {
  const token = req.header("x-access-token");
  if (!token) {
    return res.status(403).json({ message: "No token provided!" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized!" });
      }
      //find out what this is doing
      req.userId = decoded.id;
      next();
    });
  }
};

module.exports = checkToken;
