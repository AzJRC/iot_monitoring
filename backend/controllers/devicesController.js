const { getAllDevices, addDevice, removeDevice } = require('./../crud/devicesCrud')
const { mqttClient } = require("../monitor/mqttClient.js");


module.exports.getDevicesController = async (req, res) => {
	const devices = await getAllDevices()
	res.status(200).json({ devices });
};


module.exports.addDeviceController = async (req, res) => {
	const { topic } = req.body;
	if (!topic || topic === "") return res.status(403).json('Invalid topic');
	
	const newDevice = await addDevice(topic)
	if (!newDevice) return res.status(403).json('Already subscribed to this topic.');

	mqttClient.subscribe(topic, function (err) {
		if (err) res.status(500).json({ error: 'Failed to subscribe to topic.' });
		return res.status(201).json('New subscription');
	});
};

module.exports.deleteDeviceController = async (req, res) => {
	const {topic } = req.body;
	if (!topic || topic === "") return res.status(403).json('Invalid topic.');
	
	const removedDevice = await removeDevice(topic)
	if (!removedDevice) return res.status(403).json('Already unsubscribed to this topic.');

	mqttClient.subscribe(topic, function (err) {
		if (err) res.status(500).json({ error: 'Failed to subscribe to topic.' });
		return res.status(201).json('Successfull unsubscription');
	});
};