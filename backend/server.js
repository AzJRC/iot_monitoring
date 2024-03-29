const express = require("express");
const cors = require("cors");
const { corsOptions } = require('./config/corsOptions.js')
const fs = require("fs");

/* Load sensitive configuration parameters from JSON file */
const CONF_FILE = JSON.parse(fs.readFileSync("conf.json", "utf8"));
const SERVER_PORT = CONF_FILE.SERVER_PORT;

/* Start Express Web Server */
const app = express();

/* middlewares */
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

/* routes */
app.use('/auth', require('./routes/auth.js'))

/* Run Express Listener */
app.listen(SERVER_PORT, () => {
	console.log("Server started at port " + SERVER_PORT);
});
