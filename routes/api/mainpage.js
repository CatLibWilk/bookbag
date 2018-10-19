const router = require("express").Router();
const dbController = require("../../controllers/dbController");


  //notes
router.route("/note/:id")
      .get(dbController.getNote);

router.route("/note")
      .post(dbController.createNote);

router.route("/note/:id")
      .put(dbController.editNote);

router.route("/note/:id")
      .delete(dbController.deleteNote);


  //citations

router.route("/citation/:id")
      .get(dbController.getCitation);

router.route("/citation")
      .post(dbController.createCitation);
      
router.route("/citation/:id")
      .delete(dbController.deleteCitation);


module.exports = router;