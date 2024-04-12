const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { getUser, updateUserRefreshToken } = require('./../crud/usersCrud')
require("dotenv").config();

module.exports.handleAuthentication = async (req, res) => {
	const { user, pwd } = req.body;
	if (!user || !pwd) return res.status(400).json({ message: "Credentials are required." });
	
	const foundUser = await getUser(user)
	
	// Validate FoundUser
	if (!foundUser) return res.status(403).json({ message: "User does not exist." });
	if (foundUser.dataValues.password !== pwd) return res.status(403).json({ message: "Invalid credentials" });
	
	// User found, generate tokens
	const access_token = jwt.sign(
		{ 
			"username": foundUser.dataValues.username,
			"roles": foundUser.dataValues.role
		},
		process.env.ACCESS_TOKEN_SECRET,
		{ expiresIn: "5m" }
	);
	const refresh_token = jwt.sign(
		{ 
			"username": foundUser.dataValues.username 
		},
		process.env.REFRESH_TOKEN_SECRET,
		{ expiresIn: "1d" }
	);

	// GenerateRefreshToken
	await updateUserRefreshToken(refresh_token, foundUser.dataValues.username)
	
	// Prepare Response Data
	const responseData = {
		data: {
			accessToken: access_token,
			roles: foundUser.dataValues.role,
		},
	};
	
	// Set the refresh token cookie
	res.cookie('jwt', refresh_token, {
		httpOnly: true,
		secure: true,
		sameSite: 'None',
		maxAge: 1000 * 60 * 60 * 24,
	});

	// Send the response
	res.status(200).json(responseData);
};


// TODO

// 	// compare password with password in the database
// 	const match = await bcrypt.compare(pwd, row.pwd);
// 	if (!row || !match) {
// 		// If no rows found, user does not exist
// 		return res.json({ error: "Incorrect credentials" }).status(401);
// 	}




	

