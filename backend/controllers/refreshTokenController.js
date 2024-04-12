const db = require("../database.js");
const jwt = require("jsonwebtoken");
const { getUserByRefreshToken } = require('./../crud/usersCrud')
require("dotenv").config();

const handleRefreshToken = async (req, res) => {
	
    const refreshToken = req?.cookies?.jwt;
    if (!refreshToken) return res.sendStatus(401);

    const foundUser = await getUserByRefreshToken(refreshToken)

    // Validate FoundUser
	if (!foundUser) return res.status(403).json({ message: "Invalid" });

	jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.json(err).status(500);
            if (decoded.username !== foundUser.dataValues.username) return res.sendStatus(403);

            const newAccessToken = jwt.sign(
                { 
                    'username': foundUser.dataValues.username,
                    'roles': foundUser.dataValues.role
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '8m' }
            );
             
            const responseData = {
                data: {
                    accessToken: newAccessToken,
                },
            };

            return res.status(200).json(responseData);
        }
    )
};

module.exports = {
	handleRefreshToken
};
