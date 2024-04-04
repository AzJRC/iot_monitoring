const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => { 

    /* (TODO) Verify refresh token in db, grab user and compare user with username in refreshtoken and accesstoken */

	/* Verify refresh token */
	const refreshToken = req?.cookies?.jwt;
	if (!refreshToken) return res.sendStatus(403);
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
		if (err) return res.sendStatus(403);
	});

	/* Verify access token */
	// const authHeader = req.headers["authorization"];
	// if (!authHeader) return res.json('No authenticated').status(401);
	// const token = authHeader.split(" ")[1];
	// jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
	// 	if (err) return res.json('invalid token').status(403);
	// });

	next();
};

module.exports = verifyJWT;
