const { where } = require('sequelize');
const { DevicesModel } = require('../model/Models')

module.exports.getAllDevices = async () => {
    const records = await DevicesModel.findAll();
    const devices = []
	for (let record of records) {
		devices.push(record.dataValues.topicSubscribed)
	}
    return devices ? devices : null;
}

// TODO (Re-do both methods bellow and create subscribeDevice and unsubscribeDevice methods)
module.exports.addDevice = async (topicToSubscribe) => {
    const deviceExists = await DevicesModel.findOne({ where: { topicSubscribed: topicToSubscribe } });
    if (deviceExists) return null;
	
    return await DevicesModel.create({
        topicSubscribed: topicToSubscribe
    });
}

module.exports.removeDevice = async (topicToUnsubscribe) => {
    const deviceExists = await DevicesModel.findOne({ where: { topicSubscribed: topicToUnsubscribe } });
    if (!deviceExists) return null;
    await deviceExists.destroy();
    return deviceExists;
}

	// db.get("SELECT * FROM devices WHERE subscribe_topic = $1 ", topic, (err, row)=>{
	// 	if (err) return res.status(500).json('Something went wrong.');
	// 	if (row) return res.status(403).json('Already subscribed to this topic.');
		
	// 	db.run("INSERT INTO devices (subscribe_topic) VALUES ($1)", topic, (err) => {
	// 		if (err) return res.status(500).json('Something went wrong.');


	// 	})
	// })
