const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
    // Fix here
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.email = decode.email;
    next();
  });
};

module.exports = verifyToken;
