const router = require("express").Router();
const dbController = require("../../controllers/dbController");

router.route("/note/:id")
        .get(dbController.getNote);

router.route("/citation/:id")
        .get(dbController.getCitation);

module.exports = router;