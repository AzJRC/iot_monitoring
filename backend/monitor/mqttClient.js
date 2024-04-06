const mqtt = require("mqtt");
const config = require("../misc/confParser");
const db = require("../database.js");

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

// re-subscribe to all topics stored in database
db.all("SELECT subscribe_topic FROM devices", [], (err, rows)=>{
    if (err || !rows) return;
    rows.forEach((row, index) => {
        mqttClient.subscribe(row.subscribe_topic, function (err) {
            if (err) return;
        });
    })
})

const getCurrentPayload = () => {
    return payload;
}

module.exports = { mqttClient, getCurrentPayload };