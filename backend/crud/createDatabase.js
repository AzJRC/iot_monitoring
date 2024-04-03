const sqlite3 = require("sqlite3").verbose();


//create or open the database
module.exports.createDatabase = (DB_PATH) => {
    const db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
            return null;
        } else {
            console.log('Connected to the database.');
        }
    });

    return db;
}



