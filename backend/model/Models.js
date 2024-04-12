const { DataTypes, Sequelize } = require('sequelize');
const path = require("path");
const fs = require("fs");

// Database
const DB_NAME = "tmp-db.db";
const DB_PATH = path.resolve(__dirname, DB_NAME);

// Check if the database file exists
if (!fs.existsSync(DB_PATH)) {
	try {
		fs.writeFileSync(DB_PATH, "");
		console.log("Database file created.");
	} catch (err) {
		console.error("Error creating database file:", err);
		process.exit(1);
	}
}

const db = new Sequelize({
	dialect: 'sqlite',
	storage: DB_PATH
});
db.authenticate();

// Tables
const UsersModel = db.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    refreshToken: {
        type: DataTypes.STRING
    }
}, {
    tableName: "Users"
})

const DevicesModel = db.define('Devices', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    // hostname: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     unique: true
    // },
    topicSubscribed: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
    // topicToPublish: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // }
}, {
    tableName: "Devices"
})


module.exports = {UsersModel, DevicesModel}