const router = require("express").Router();
// const authController = require("../../controllers/authController.js");
const passport = require("passport");
const passportSetup = require("../../config/Passport/passport.js")


router.route("/login")
  .post(passport.authenticate('local-signin', { successRedirect: '/',
  failureRedirect: '/nope'}));

  router.route("/signup")
  .post(passport.authenticate('local-signup', { successRedirect: '/',
  failureRedirect: '/nope'}));

  router.route("/logout")
          .get( (req, res) => {
            console.log('logout hit');
            req.session.destroy(function() {
              res.redirect("/");
            });
          });

module.exports = router;