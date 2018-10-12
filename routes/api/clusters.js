const router = require("express").Router();
const dbController = require("../../controllers/dbController");


router.route("/")
  .get(dbController.getClusters);

router.route("/:id")
  .delete(dbController.deleteCluster);

module.exports = router;