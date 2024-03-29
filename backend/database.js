const sqlite3 = require("sqlite3").verbose();
const path = require('path');
const fs = require("fs");

const DB_NAME = "tmp-db.db"
const DB_PATH = path.resolve(__dirname, "model", DB_NAME);
console.log(DB_PATH)

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

// open the database
let db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

// Check if the users table exists
db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='users'", (err, row) => {
  if (err) {
    console.error("Error checking for table existence:", err.message);
    return;
  }
  
  if (!row) {
    // Table does not exist, create it
    db.run(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user TEXT NOT NULL UNIQUE,
        pwd TEXT NOT NULL
      )`, (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
        return;
      }
      console.log("Users table has been created.");
      
      // Insert initial admin user
      db.run(`INSERT INTO users (user, pwd) VALUES ('admin', 'admin')`, (err) => {
        if (err) {
          console.error("Error inserting initial admin user:", err.message);
          return;
        }
        console.log("Defaut user has been created.");
      });
    });
  } else {
    // Check if admin user exists
    db.get("SELECT * FROM users WHERE user = 'admin'", (err, row) => {
      if (err) {
        console.error("Error checking for admin user:", err.message);
        return;
      }
      if (!row) {
        // Admin user doesn't exist, insert it
        db.run(`INSERT INTO users (user, pwd) VALUES ('admin', 'admin')`, (err) => {
          if (err) {
            console.error("Error inserting initial admin user:", err.message);
            return;
          }
          console.log("Defaut user has been created.");
        });
      }
    });
  }
});



module.exports = db;
