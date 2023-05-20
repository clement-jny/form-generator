const express = require("express");

const home_routes = require("./routes/home.routes");
const upload_routes = require("./routes/upload.routes");

const router = express.Router();

router.use("/", home_routes);
router.use("/upload", upload_routes);

module.exports = router