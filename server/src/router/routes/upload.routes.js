const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
	console.log("Hello Upload!");
	res.send({ message: "Get Upload!" });
});

router.post("/", (req, res) => {
	console.log(req.body);
	res.json({ message: "Post Upload!" });
});

module.exports = router;