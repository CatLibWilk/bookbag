const router = require("express").Router();
const dbController = require("../../controllers/dbController");

//clusters associates all
router.route("/:id")
  .get(dbController.getClusterData);


  //notes
router.route("/note/:id")
  .delete(dbController.deleteNote);

  router.route("/note")
          .post(dbController.createNote);

  //citations
router.route("/citation/:id")
  .delete(dbController.deleteCitation);

router.route("/citation")
        .post(dbController.createCitation)

module.exports = router;