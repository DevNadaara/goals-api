const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(403).send("access denied");

  try {
    const decoded = jwt.decode(token, config.get("jwtPrivate"));
    //check is users are same
    if (decoded._id !== req.params.id)
      return res.status(403).send(" access not allowed");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};
