const db = require("../database.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = (req, res) => {
	
    const refreshToken = req?.cookies?.jwt;
    if (!refreshToken) return res.sendStatus(401);

	db.get("SELECT * FROM users WHERE refresh_token = $refresh_token", refreshToken, async (err, row) => {
		if (err) return res.status(500);

		// If no rows found, user does not exist
		if (!row || row.length === 0) {
			return res.sendStatus(403);
		}

		jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err) return res.sendStatus(403);
                console.log(decoded.username, row.user,decoded.username !== row.user)
                if (decoded.username !== row.user) return res.sendStatus(401);
                console.log("I continued")

                const newAccessToken = jwt.sign(
                    { 'username': decoded.username },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '5m' }
                );
                
                console.log('hey') 
                const responseData = {
                    data: {
                        accessToken: newAccessToken,
                    },
                };

                res.status(200).json(responseData);
            }
        )
	});
};

module.exports = {
	handleRefreshToken
};
