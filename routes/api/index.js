const router = require("express").Router();
const paintingRoutes = require("./paintingRoutes");
const paintingCMSRoutes = require('./paintingCMSRoutes')

router.use("/paintings", paintingRoutes);
router.use("/paintings/cms", paintingCMSRoutes);

module.exports = router;
