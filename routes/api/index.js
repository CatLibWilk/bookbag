const router = require("express").Router();
const clusters = require("./clusters");
const mainpage = require("./mainpage");
const edit = require("./edit")

// cluster routes
router.use("/clusters", clusters);
router.use("/mainpage", mainpage);
router.use("/edit", edit);

module.exports = router;
