const mqtt = require("mqtt");
const config = require("../misc/confParser");

const MQTT_BROKER_URL = config.MQTT_BROKER_URL;
const mqttClient = mqtt.connect(MQTT_BROKER_URL);

mqttClient.on("connect", () => {
	console.log("Connected to MQTT broker");
});

mqttClient.on('message', function (topic, message) {
    console.log('Received message:', message.toString(), 'on topic:', topic);
    // Forward the received message to the frontend
    // You can use WebSocket, Socket.io, or any other method to push the message to the frontend
});

module.exports = { mqttClient };