const router = require("express").Router();
const dbController = require("../../controllers/dbController");

// Matches with "/api/signin"
router.route("/:id")
  .get(dbController.getCluster);


module.exports = router;