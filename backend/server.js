const fs = require("fs");
const express = require("express");
const cookieParser = require('cookie-parser');
const verifyJWT = require('./middlewares/verifyJWT.js')
const credentials = require('./middlewares/credentials.js')
const corsOptions = require('./config/corsOptions.js')
const cors = require("cors");
const config = require("./misc/confParser.js")

/* Start Expre..
ss Web Server */
const app = express();

/* middlewares */
app.use(credentials)
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

/* routes */
app.use('/auth', require('./routes/auth.js'));
app.use('/logout', require('./routes/logout.js'));
app.use('/refresh', require('./routes/refresh.js'));


/* routes that require authentication */
app.use(verifyJWT);
app.get('/testauth', (req, res) => {res.sendStatus(200);}) /* temporary */
app.use('/devices', require('./routes/devices.js'));


/* MQTT Client */



/* Run Express Listener */
app.listen(config.SERVER_PORT, () => {
	console.log("Server started at port " + config.SERVER_PORT);
});
