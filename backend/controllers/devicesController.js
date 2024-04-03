const db = require("../database.js");

module.exports.addDeviceController = async (req, res) => {
	const {
		hostname,
		description,
		subscribe_topic,
		publish_topic,
		net_ssid,
		net_pwd,
	} = req.body;

	db.get(
		"SELECT * FROM devices WHERE hostname = $hostname",
		hostname,
		async (err, row) => {
			if (err) return res.sendStatus(500);
			if (row) return res.status(403).json("This device already exists.");

			db.run(
				`INSERT INTO devices (hostname, description, subscribe_topic, publish_topic, net_ssid, net_pwd)
                VALUES ($hostname, $description, $subscribe_topic, $publish_topic, $net_ssid, $net_pwd)`,
				[
					hostname,
					description,
					subscribe_topic,
					publish_topic,
					net_ssid,
					net_pwd,
				],
				(err) => {
					console.log(err); /* TEMP */
					return res.sendStatus(500);
				}
			);

			return res.json("Device added successfully!");
		}
	);
};

module.exports.updateDeviceController = async (req, res) => {

};

module.exports.deleteDeviceController = async (req, res) => {

};
