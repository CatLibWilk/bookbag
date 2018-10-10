const router = require("express").Router();
const clusters = require("./clusters");

// Book routes
router.use("/clusters", clusters);

module.exports = router;
