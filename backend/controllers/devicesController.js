const db = require("../database.js");
const { mqttClient } = require("../monitor/mqttClient.js");


module.exports.addDeviceController = async (req, res) => {
	const { topic } = req.body;
	db.get("SELECT * FROM devices WHERE subscribe_topic = $1 ", topic, (err, row)=>{
		if (err) return res.json('Something went wrong').status(500);
		if (row) return res.json('Already subscribed to this topic').status(409);
		
		db.run("INSERT INTO devices (subscribe_topic) VALUES ($1)", topic, (err) => {
			if (err) return res.json('Something went wrong').status(500);

			mqttClient.subscribe(topic, function (err) {
				if (err) res.json({ error: 'Failed to subscribe to topic' }).status(500);
				return res.json({ message: 'Subscribed to topic successfully' }).status(200);
			});
		})
	})
	
};

module.exports.deleteDeviceController = async (req, res) => {
	const {topic } = req.body;
	db.get("SELECT * FROM devices WHERE subscribe_topic = $1 ", topic, (err, row)=>{
		if (err) return res.json('Something went wrong').status(500);
		if (!row) return res.json('You are not subscribed to this topic.').status(409);
		
		db.run("DELETE FROM devices WHERE subscribe_topic = $1", topic, (err) => {
			if (err) return res.json('Something went wrong').status(500);
			
			mqttClient.unsubscribe(topic, function (err) {
				if (err) res.json({ error: 'Failed to unsubscribe from topic' }).status(500);
				return res.json({ message: 'Unsubscribed from topic successfully' }).status(200);
			});
		})
	})
};