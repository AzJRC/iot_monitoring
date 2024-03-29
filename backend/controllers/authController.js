const db = require("../database.js");

const authenticateUser = async (req, res) => {
	const requested_user = {
		$user: req.body.user,
		$pwd: req.body.pwd,
	};

	db.get(
		"SELECT * FROM users WHERE user = $user AND pwd = $pwd",
		requested_user,
		(err, row) => {
			if (err) {
				console.error(err.message);
				return res.status(500).json({ error: "Internal Server Error" });
			}

			return row
				? res.json("Login successful.")
				: res.status(401).json("User or password are not correct.");
		}
	);
};

module.exports = {
    authenticateUser
}