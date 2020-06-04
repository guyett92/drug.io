const express = require('express');
const router = express.Router();
const drugsCtrl = require('../controllers/drugs.js');

router.get('/', drugsCtrl.index);
router.get('/new', drugsCtrl.new);
router.post('/', drugsCtrl.create);

module.exports = router;