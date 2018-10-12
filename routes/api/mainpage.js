const router = require("express").Router();
const dbController = require("../../controllers/dbController");

//clusters
router.route("/:id")
  .get(dbController.getClusterData);

  //notes
router.route("/note/:id")
  .delete(dbController.deleteNote);

  //citations
router.route("/citation/:id")
  .delete(dbController.deleteCitation);


module.exports = router;