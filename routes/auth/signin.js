const router = require("express").Router();
const authController = require("../../controllers/authController");


// Matches with "/auth/signin"
  router.route("/")
          .post(authController.create)
   


  module.exports = router;