const db = require("../database.js");

module.exports.addDeviceController = async (req, res) => {
	
	const {
		deviceHostname,
		deviceDescription,
		deviceMQTTSubTopic,
		deviceMQTTPubTopic,
		deviceMQTTUser,
		deviceMQTTPwd
	} = req.body;


	db.get(
		"SELECT * FROM devices WHERE hostname = $hostname",
		deviceHostname,
		async (err, row) => {
			if (err) return res.sendStatus(500);
			if (row) return res.json("This device already exists.").status(403);

			db.run(
				`INSERT INTO devices (hostname, description, subscribe_topic, publish_topic, net_ssid, net_pwd)
                VALUES ($hostname, $description, $subscribe_topic, $publish_topic, $net_ssid, $net_pwd)`,
				[
					deviceHostname,
					deviceDescription,
					deviceMQTTSubTopic,
					deviceMQTTPubTopic,
					deviceMQTTUser,
					deviceMQTTPwd,
				],
				(err) => {
					if (err) return res.json(err).status(500)
				}
			);
			return res.json("Device added successfully!").status(200);
		}
	);
};

module.exports.updateDeviceController = async (req, res) => {

};

module.exports.deleteDeviceController = async (req, res) => {

};
