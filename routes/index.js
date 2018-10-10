const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const authRoutes = require("./auth")
const htmlRoutes = ("./html")

// API Routes
router.use("/api", apiRoutes);
router.use("/auth", authRoutes);
router.get("/wow", (req, res) => {
  res.send("<h1>wow</h1>")
})

// API Routes
// router.use("/api");

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
