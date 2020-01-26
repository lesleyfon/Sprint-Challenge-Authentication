/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRETE;
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    jwt.verify(authorization, secret, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message:
            "You are not authorized And should create an account to access dad jokes",
          err
        });
      } else {
        next();
      }
    });
  }
};
