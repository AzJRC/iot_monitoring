const express = require("express");
const router = express.Router();
const devicesController = require("./../controllers/devicesController")

router.route('/add').post(devicesController.addDeviceController);
router.route('/remove').delete(devicesController.deleteDeviceController);
router.route('/update').put(devicesController.updateDeviceController);

module.exports = router;