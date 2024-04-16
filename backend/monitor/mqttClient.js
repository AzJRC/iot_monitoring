const { getAllDevices } = require('./../crud/devicesCrud')
const mqtt = require("mqtt");
const config = require("../misc/confParser");

let MQTT_BROKER_URL = config.MQTT_BROKER_URL;
MQTT_BROKER_URL = 'mqtt://206.189.225.86' //Something wrong with config.MQTT_BROKER_URL

const mqttClient = mqtt.connect(MQTT_BROKER_URL);


console.log('mqttClient listening on: ', MQTT_BROKER_URL)

mqttClient.on("connect", () => {
	console.log("Connected to MQTT broker");
});

let payload = null;
mqttClient.on('message', function (topic, message) {
	console.log(payload)
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
