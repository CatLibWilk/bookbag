const router = require("express").Router();
const dbController = require("../../controllers/dbController");

// Matches with "/api/signin"
router.route("/")
  .get(dbController.getClusters);


module.exports = router;