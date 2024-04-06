const express = require("express");
const router = express.Router();
const devicesController = require("./../controllers/devicesController")

router.route('/').get(devicesController.getDevicesController);
router.route('/add').post(devicesController.addDeviceController);
router.route('/remove').delete(devicesController.deleteDeviceController);

module.exports = router;