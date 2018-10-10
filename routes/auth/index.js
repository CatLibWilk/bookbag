const router = require("express").Router();
const authController = require("../../controllers/authController");
const passport = require("passport");
const passportSetup = require("../../config/Passport/passport.js")

// Matches with "/auth"
// router.route("/login")
//   .post(passport.authenticate('local-signin', { successRedirect: '/homepage',
//   failureRedirect: '/'}));

//   router.route("/signup")
//   .post(passport.authenticate('local-signup', { successRedirect: '/homepage',
//   failureRedirect: '/'}));

router.route("/login")
  .post(passport.authenticate('local-signin', { successRedirect: '/',
  failureRedirect: '/nope'}));

  router.route("/signup")
  .post(passport.authenticate('local-signup', { successRedirect: '/',
  failureRedirect: '/nope'}));

  // function isLoggedIn(req, res, next) {
  //   if (req.isAuthenticated()) {
  //     return next();
  //   }

  //   res.redirect("/signin");
  // }


module.exports = router;