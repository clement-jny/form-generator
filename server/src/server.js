const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const router = require('./router/index.routes');
app.use(router);

app.listen(3001, "localhost", () => {
	console.log("Server is running on http://localhost:3001");
});