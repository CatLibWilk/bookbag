const router = require("express").Router();
const apiCallController = require("../../controllers/apiCallController");

//clusters associates all
router.route("/")
  .post(apiCallController.harvestResources);


module.exports = router;