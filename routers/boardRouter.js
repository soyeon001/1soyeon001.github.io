const express = require('express');
const router = express.Router();

const controller = require('../controllers/boardController');

router.get('/list', controller.list);
router.get('/view', controller.view);
router.get('/register', controller.register);
router.post('/register', controller.save);
router.put('/change', controller.change);

module.exports = router;