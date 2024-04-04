const db = require("../database.js");

const getSubscribeTopics = () => {
    return new Promise((resolve, reject) => {
        db.all(
            "SELECT hostname, subscribe_topic FROM devices",
            (err, rows) => {
                if (err) {
                    reject(new Error('Error requesting subscribe topics'));
                    return;
                }
                if (rows.length === 0) {
                    reject(new Error("No subscribe topics in database"));
                    return;
                }
                resolve(rows);
            }
        );
    });
}

module.exports = getSubscribeTopics;