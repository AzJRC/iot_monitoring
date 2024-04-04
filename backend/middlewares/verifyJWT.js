const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
	/* Verify refresh token */
	const refreshToken = req?.cookies?.jwt;
	if (!refreshToken) return res.sendStatus(403);
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
		if (err) return res.sendStatus(403);
	});

	/* Verify access token */
	const authHeader = req.headers.authorization || req.headers.Authorization;
	if (!authHeader?.startsWith('Bearer')) return res.json('No authenticated').status(401);
	const token = authHeader.split(" ")[1];
	jwt.verify(
		token, 
		process.env.ACCESS_TOKEN_SECRET, 
		(err, decoded) => {
		if (err) return res.json('invalid token').status(403);
		req.user = decoded.username;
		req.roles = decoded.roles
		next();
	});
};

module.exports = verifyJWT;

	