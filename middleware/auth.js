const { getUser } = require("../services/auth");

function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token; // Get the token from cookies
  req.user = null; // Initialize req.user to null

  if (!tokenCookie) return next(); // If no token, proceed to the next middleware

  const token = tokenCookie;
  const user = getUser(token); // Call getUser and assign the result to `user`

  if (user) {
    req.user = user; // Attach the user to the request object if valid
  }

  return next(); // Proceed to the next middleware
}

function restrictTo(roles) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login"); // Redirect if no user is authenticated

    if (!roles.includes(req.user.role)) return res.end("unauthorized"); // Check user role
    return next(); // Proceed to the next middleware
  };
}

module.exports = {
  checkForAuthentication,
  restrictTo,
};