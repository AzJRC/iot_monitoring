const db = require("../database.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleLogout = async (req, res) => {
    /* Verify if client has a refresh token in the cookies */
    const refreshToken = req?.cookies?.jwt;
    if (!refreshToken) return res.sendStatus(204);
    res.clearCookie(
        'jwt', 
        {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 1000 * 60 * 60 * 24 * 7,
        }
    );

    /* Verify if refresh token is in the database */
	db.get("SELECT * FROM users WHERE refresh_token = $refresh_token", refreshToken, async (err, row) => {
		if (err) return res.sendStatus(500);
		if (!row) res.sendStatus(204);

        /* Delete refresh token from database */
        db.run(
			"UPDATE users SET refresh_token = NULL WHERE user = $user",
			{ $refresh_token: refreshToken, $user: row.user },
			(err) => {
				if (err) return res.status(500);
			}
		);
    });

    res.sendStatus(200);
}

module.exports = { handleLogout };