const router = require("express").Router();
const dbController = require("../../controllers/dbController");


router.route("/:id")
  .get(dbController.getClusterData);

router.route("/deletenote/:id")
  .delete(dbController.deleteNote);

router.route("/deletecitation/:id")
  .delete(dbController.deleteCitation);


module.exports = router;