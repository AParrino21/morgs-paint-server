const router = require("express").Router();
const paintingRoutes = require("./paintingRoutes");

router.use("/paintings", paintingRoutes);

module.exports = router;
