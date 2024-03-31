const db = require("../database.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const handleAuthentication = async (req, res) => {
	const { user, pwd } = req.body;
	if (!user || !pwd) {
		return res
			.status(400)
			.json({ message: "Username and password are required." });
	}

	const hashedPwd = await bcrypt.hash(pwd, 10);

	db.get("SELECT * FROM users WHERE user = $user", user, async (err, row) => {
		if (err) {
			console.error(err.message);
			return res.status(500).json({ error: err.message });
		}

		// If no rows found, user does not exist
		if (!row || row.length === 0) {
			return res.status(401).json({ error: "User or password incorrect" });
		}

		const match = await bcrypt.compare(pwd, row.pwd);
		if (!match) {
			return res.status(401).json({ error: "User or password incorrect" });
		}

		// User found, generate tokens
		const access_token = jwt.sign(
			{ username: row.user },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: "5m" }
		);
		const refresh_token = jwt.sign(
			{ username: row.user },
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: "1d" }
		);

		// Update refresh token in the database
		db.run(
			"UPDATE users SET refresh_token = $refresh_token WHERE user = $user",
			{ $refresh_token: refresh_token, $user: row.user },
			(err) => {
				if (err) {
					console.error(err.message);
					return res.status(500).json({ error: err.message });
				}
			}
		);

		const responseData = {
			data: {
				accessToken: access_token,
				roles: row.roles,
			},
		};

		// Set the refresh token cookie
		res.cookie('jwt', refresh_token, {
			httpOnly: true,
			secure: true,
            sameSite: 'None',
			maxAge: 1000 * 60 * 60 * 24 * 7,
		});

		// Send the response
		res.status(200).json(responseData);
	});
};

module.exports = {
	handleAuthentication,
};
