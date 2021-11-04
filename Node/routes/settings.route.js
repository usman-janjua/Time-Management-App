const express = require('express');
const router = express.Router();
const SettingController = require('../controllers/SettingController')


router.get('/',SettingController.index);
router.post('/add', SettingController.create);
router.put('/edit/:id', SettingController.edit);

module.exports = router