const express = require('express');
const router = express.Router();
const WorklogController = require('../controllers/WorklogController')


router.get('/',WorklogController.index);
router.get('/:id',WorklogController.find);
router.post('/filterworklog',WorklogController.filterworklog);
router.post('/add', WorklogController.create);
router.put('/edit/:id', WorklogController.edit);
router.delete('/delete/:id', WorklogController.delete);

module.exports = router