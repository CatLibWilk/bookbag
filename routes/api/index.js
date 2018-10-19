const router = require("express").Router();
const clusters = require("./clusters");
const mainpage = require("./mainpage");
const harvest = require("./harvest");


// cluster routes
router.use("/clusters", clusters);

router.use("/mainpage", mainpage);

router.use("/harvest", harvest);

module.exports = router;
