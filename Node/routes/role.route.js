const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/RoleController')


router.get('/',RoleController.index);
router.get('/:id',RoleController.find);
router.post('/add', RoleController.create);
router.put('/edit/:id', RoleController.edit);
router.delete('/delete/:id', RoleController.delete);

module.exports = router