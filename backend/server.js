const fs = require("fs");
const express = require("express");
const cookieParser = require('cookie-parser');
const verifyJWT = require('./middlewares/verifyJWT.js')
const credentials = require('./middlewares/credentials.js')
const corsOptions = require('./config/corsOptions.js')
const cors = require("cors");
const config = require("./misc/confParser.js")

/* Start Express Web Server */
const app = express();

/* middlewares */
app.use(credentials)
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

/* routes */
app.use('/auth', require('./routes/auth.js'));
app.use('/logout', require('./routes/logout.js'));


/* routes that require authentication */
app.use(verifyJWT);
app.get('/testauth', (req, res) => {res.sendStatus(200);}) /* temporary */

app.use('/refresh', require('./routes/refresh.js'));

app.use('/devices', require('./routes/devices.js'));
// app.use('/data') /* (TODO) MQTT -> POST, Browser -> GET */


/* MQTT Client */
require('./monitor/mqttClient.js');


/* Run Express Listener */
app.listen(config.SERVER_PORT, () => {
	console.log("Server started at port " + config.SERVER_PORT);
});
