const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const { createDatabase } = require("./crud/createDatabase");

const DB_NAME = "tmp-db.db";
const DB_PATH = path.resolve(__dirname, "model", DB_NAME);

/* (TODO) Install and implement sqlize */

// Check if the database file exists, and create it if it doesn't
if (!fs.existsSync(DB_PATH)) {
	try {
		fs.writeFileSync(DB_PATH, "");
		console.log("Database file created.");
	} catch (err) {
		console.error("Error creating database file:", err);
		process.exit(1);
	}
}

// create/open the database
const db = createDatabase(DB_PATH);

// Check if the users table exists
db.get(
	"SELECT name FROM sqlite_master WHERE type='table' AND name='users'",
	(err, row) => {
		if (err) {
			console.error("Error checking for table existence:", err.message);
			return;
		}

		if (!row) {
			// Users table does not exist, create it
			db.run(
				`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user TEXT NOT NULL UNIQUE,
        pwd TEXT NOT NULL,
        roles TEXT NOT NULL,
        refresh_token TEXT
        )`,
				(err) => {
					if (err) {
						console.error("Error creating table:", err.message);
						return;
					}
					console.log("Users table has been created.");

					// Encrypt the password (TODO: Change default password to be chosen on installation)
					bcrypt.hash("admin", 10, (err, hashedPwd) => {
						if (err) {
							console.error("Error hashing password:", err.message);
							return;
						}

						// Insert the initial admin user with the hashed password
						db.run(
							`INSERT INTO users (user, pwd, roles, refresh_token) VALUES ('admin', ?, 'administrator', NULL)`,
							[hashedPwd],
							(err) => {
								if (err) {
									console.error(
										"Error inserting initial admin user:",
										err.message
									);
									return;
								}
								console.log("Default user has been created.");
							}
						);
					});
				}
			);
		} else {
			// Check if admin user exists
			db.get("SELECT * FROM users WHERE user = 'admin'", (err, row) => {
				if (err) {
					console.error("Error checking for admin user:", err.message);
					return;
				}
				if (!row) {
					// Admin user doesn't exist, insert it
					bcrypt.hash("admin", 10, (err, hashedPwd) => {
						if (err) {
							console.error("Error hashing password:", err.message);
							return;
						}

						// Insert the initial admin user with the hashed password
						db.run(
							`INSERT INTO users (user, pwd, roles, refresh_token) VALUES ('admin', ?, 'administrator', NULL)`,
							[hashedPwd],
							(err) => {
								if (err) {
									console.error(
										"Error inserting initial admin user:",
										err.message
									);
									return;
								}
								console.log("Default user has been created.");
							}
						);
					});
				}
			});
		}
	}
);

// Check if devices table exists
db.get(
	"SELECT name FROM sqlite_master WHERE type='table' AND name='devices'",
	(err, row) => {
		if (err) {
			console.error("Error checking for table existence:", err.message);
			return;
		}

		if (!row) {
			// Users table does not exist, create it (TODO: Allow subscribe or publish to several topics)
			//  CREATE TABLE devices (
			// 	id INTEGER PRIMARY KEY AUTOINCREMENT,
			// 	hostname TEXT NOT NULL UNIQUE,
			// 	description TEXT,
			// 	subscribe_topic TEXT NOT NULL,
			// 	publish_topic TEXT NOT NULL
			// 	)
			db.run(
				`CREATE TABLE devices (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				subscribe_topic TEXT NOT NULL
				)`,
				(err) => {
					if (err) {
						console.error("Error creating table:", err.message);
						return;
					}
					console.log("Devices table has been created.");
				}
			);
		}
	}
);

module.exports = db;
