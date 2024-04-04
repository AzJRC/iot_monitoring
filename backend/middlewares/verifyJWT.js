const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
	/* Verify refresh token */
	const refreshToken = req?.cookies?.jwt;
	if (!refreshToken) return res.sendStatus(400);
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
		if (err) return res.sendStatus(401);
	});

	/* Verify access token */
	const authHeader = req.headers.authorization || req.headers.Authorization;
	if (!authHeader?.startsWith('Bearer')) return res.status(401).json('No authenticated');
	const token = authHeader.split(" ")[1];
	jwt.verify(
		token, 
		process.env.ACCESS_TOKEN_SECRET, 
		(err, decoded) => {
		if (err) return res.status(401).json('invalid token');
		req.user = decoded.username;
		req.roles = decoded.roles
		next();
	});
};

module.exports = verifyJWT;

	