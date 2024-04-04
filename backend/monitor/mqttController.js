const { mqttClient } = require("./mqttClient");
const getSubscribeTopics = require("./mqttTopics");

const mqttSubscribeToTopic = (topic) => {
	mqttClient.subscribe(topic, (err) => {
		if (err) throw new Error("Error subscribing to MQTT topic");
	});
	return true;
};

const mqttListener = () => {
	mqttClient.on("message", (topic, message) => {
		console.log(
			"Received message on topic:",
            topic,
			"Message:",
			message.toString()
		);
		
        return true;
	});
};

module.exports = { mqttSubscribeToTopic, mqttListener }