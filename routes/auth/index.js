const router = require("express").Router();
const authController = require("../../controllers/authController");
const passport = require("passport");
const passportSetup = require("../../config/Passport/passport.js")

// Matches with "/auth"
router.route("/login")
  .post(passport.authenticate('local-signin', { successRedirect: '/homepage',
  failureRedirect: '/'}));

  router.route("/signup")
  .post(passport.authenticate('local-signup', { successRedirect: '/homepage',
  failureRedirect: '/'}));




module.exports = router;