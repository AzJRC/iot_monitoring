const mqtt = require("mqtt");
const config = require("../misc/confParser");

const MQTT_BROKER_URL = config.MQTT_BROKER_URL;
const mqttClient = mqtt.connect(MQTT_BROKER_URL);

mqttClient.on("connect", () => {
	console.log("Connected to MQTT broker");
});

let payload = null;
mqttClient.on('message', function (topic, message) {
    // console.log('Received message:', message.toString(), 'on topic:', topic);  
	payload = {topic: topic, message: message.toString()}
});

const getCurrentPayload = () => {
    return payload;
}

module.exports = { mqttClient, getCurrentPayload };