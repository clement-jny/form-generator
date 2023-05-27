const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./uploads/");
	},
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname);
		const filename = path.basename(file.originalname, ext);

		cb(null, Date.now() + "*" + filename + ext);
	}
})

const upload = multer({ storage: storage })


router.get("/", (req, res) => {
	fs.readdir("./uploads", (err, files) => {
		if (err) {
			console.error(err);
			res.status(500).json({ message: "Error reading files" });
		} else {
			const filteredFiles = files.filter((file) => file !== '.DS_Store');

			const response = {
				count: filteredFiles.length,
				results: filteredFiles.map((file) => {
					return {
						id: Number(file.split('*')[0]),
						name: file.split('*')[1],
						path: path.join("./uploads", file)
					};
				})
			};

			res.status(200).json(response);
		}
	});
});

router.post("/", upload.single("file"), (req, res) => {
	res.status(201).json(
		{
			message: "Successfully saved",
			id: req.file.filename.split('*')[0]
		}
	);
});

router.get("/:fileId", (req, res) => {
	const fileId = req.params.fileId;

	fs.readdir("./uploads", (err, files) => {
		if (err) {
			console.error(err);
			res.status(500).json({ message: "Error reading files" });
		} else {
			const file = files.find((file) => file.split('*')[0] === fileId);

			if (file) {
				fs.readFile(path.join("./uploads", file), 'utf-8', (err, data) => {
					if (err) {
						console.error(err);
					} else {
						res.status(200).json(JSON.parse(data));
					}
				})
			} else {
				res.status(404).json({ message: "There's no corresponding file" });
			}
		}
	})
})


module.exports = router;