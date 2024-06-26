const db = require("../database.js");

module.exports.addDeviceController = async (req, res) => {
	
	const {
		deviceHostname,
		deviceDescription,
		deviceMQTTSubTopic,
		deviceMQTTPubTopic,
	} = req.body;


	db.get(
		"SELECT * FROM devices WHERE hostname = $hostname",
		deviceHostname,
		async (err, row) => {
			if (err) return res.sendStatus(500);
			if (row) return res.status(403).json("This device already exists.");

			db.run(
				`INSERT INTO devices (hostname, description, subscribe_topic, publish_topic)
                VALUES ($hostname, $description, $subscribe_topic, $publish_topic)`,
				[
					deviceHostname,
					deviceDescription,
					deviceMQTTSubTopic,
					deviceMQTTPubTopic
				],
				(err) => {
					if (err) return res.status(500).json(err);
				}
			);
			return res.status(200).json("Device added successfully!");
			
		}
	);
};

module.exports.updateDeviceController = async (req, res) => {

};

module.exports.deleteDeviceController = async (req, res) => {

};
