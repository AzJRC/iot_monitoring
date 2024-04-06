const db = require("../database.js");
const { mqttClient } = require("../monitor/mqttClient.js");

// const TOPIC_REGEX = /((\w+|[+])\/)+(\w+|[#+])/gi;

module.exports.getDevicesController = async (req, res) => {
	db.all("SELECT subscribe_topic FROM devices", [], (err, rows) => {
		if (err) return res.status(500).json('Something went wrong.');
		if (!rows) return res.status(204).json('There are no subscriptions.');
		
		const list = [];
		rows.forEach((value, index) => {
			list.push(value['subscribe_topic'])
		})

		return res.json({'subscriptions': list}).status(200);
	})
};


module.exports.addDeviceController = async (req, res) => {
	const { topic } = req.body;

	if (!topic || topic === "") return res.status(403).json('Invalid topic');

	db.get("SELECT * FROM devices WHERE subscribe_topic = $1 ", topic, (err, row)=>{
		if (err) return res.status(500).json('Something went wrong.');
		if (row) return res.status(403).json('Already subscribed to this topic.');
		
		db.run("INSERT INTO devices (subscribe_topic) VALUES ($1)", topic, (err) => {
			if (err) return res.status(500).json('Something went wrong.');

			mqttClient.subscribe(topic, function (err) {
				if (err) res.status(500).json({ error: 'Failed to subscribe to topic.' });
				return res.status(200).json({ message: 'Subscribed to topic successfully.' });
			});
		})
	})
};

module.exports.deleteDeviceController = async (req, res) => {
	const {topic } = req.body;

	if (!topic || topic === "") return res.status(403).json('Invalid topic.');

	db.get("SELECT * FROM devices WHERE subscribe_topic = $1 ", topic, (err, row)=>{
		if (err) return res.status(500).json('Something went wrong.');
		if (!row) return res.status(409).json('You are not subscribed to this topic.');
		
		db.run("DELETE FROM devices WHERE subscribe_topic = $1", topic, (err) => {
			if (err) return res.status(500).json('Something went wrong.');
			
			mqttClient.unsubscribe(topic, function (err) {
				if (err) res.status(500).json({ error: 'Failed to unsubscribe from topic.' });
				return res.status(200).json({ message: 'Unsubscribed from topic successfully.' });
			});
		})
	})
};