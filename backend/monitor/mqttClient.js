const { getAllDevices } = require('./../crud/devicesCrud')
const mqtt = require("mqtt");
const config = require("../misc/confParser");

const MQTT_BROKER_URL = config.MQTT_BROKER_URL;
const mqttClient = mqtt.connect(MQTT_BROKER_URL);

mqttClient.on("connect", () => {
	console.log("Connected to MQTT broker");
});

let payload = null;
mqttClient.on('message', function (topic, message) {
	payload = {topic: topic, message: message.toString()}
});

(async () => {
    const devices = await getAllDevices()
    if (!devices) return;
    for (let device of devices) {
        mqttClient.subscribe(device, (err) => {if (err) return});
    }
})();

const getCurrentPayload = () => {
    return payload;
}



module.exports = { mqttClient, getCurrentPayload };