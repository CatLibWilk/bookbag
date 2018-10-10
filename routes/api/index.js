const router = require("express").Router();
const clusters = require("./clusters");
const mainpage = require("./mainpage");

// cluster routes
router.use("/clusters", clusters);
router.use("/mainpage", mainpage);

module.exports = router;
