const router = require("express").Router();
const authController = require("../../controllers/authController");
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


  // router.route("/logout")
  //         .get(function(req, res) {
  //   req.session.destroy(function() {
  //     res.redirect("/");
  //   });
  // }
  // function isLoggedIn(req, res, next) {
  //   if (req.isAuthenticated()) {
  //     return next();
  //   }

  //   res.redirect("/signin");
  // }


module.exports = router;