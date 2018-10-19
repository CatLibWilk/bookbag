const router = require("express").Router();
const dbController = require("../../controllers/dbController");


router.route("/")
        .get(dbController.getClusters);

router.route("/:id")
        .get(dbController.getClusterData);

router.route("/:name")
        .post(dbController.createCluster);

router.route("/:id")
        .delete(dbController.deleteCluster);


module.exports = router;