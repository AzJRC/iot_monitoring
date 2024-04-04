const mqtt = require("mqtt");
const config = require("../misc/confParser");

const MQTT_BROKER_URL = config.MQTT_BROKER_URL;
// const MQTT_TOPIC = "default";

const mqttClient = mqtt.connect(MQTT_BROKER_URL);

mqttClient.on("connect", () => {
	console.log("Connected to MQTT broker");
});

// mqttClient.subscribe(MQTT_TOPIC, (err) => {
// 	if (!err) {
// 		console.log("Subscribed to MQTT topic:", MQTT_TOPIC);
// 	} else {
// 		console.error("Error subscribing to MQTT topic:", err);
// 	}
// });

// mqttClient.on("message", (topic, message) => {
// 	console.log(
// 		"Received message on topic:",
// 		topic,
// 		"Message:",
// 		message.toString()
// 	);
// 	// Process the incoming message as needed
// });
