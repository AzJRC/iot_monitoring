const mqtt = require("mqtt");
const config = require("../misc/confParser");

const MQTT_BROKER_URL = config.MQTT_BROKER_URL;
const mqttClient = mqtt.connect(MQTT_BROKER_URL);

mqttClient.on("connect", () => {
	console.log("Connected to MQTT broker");
});

module.exports = { mqttClient };