const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
require("dotenv").config();

const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(bodyParser.json());


const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_DATABASE
});


app.get("/", () => {
	console.log("Hello World!");
});

app.listen(3001, "localhost", () => {
	console.log("Server is running on http://localhost:3001");
});