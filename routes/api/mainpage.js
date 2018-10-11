const router = require("express").Router();
const dbController = require("../../controllers/dbController");

// Matches with "/api/signin"
router.route("/:id")
  .get(dbController.getClusterData);


module.exports = router;