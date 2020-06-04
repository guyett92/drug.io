const express = require('express');
const router = express.Router();
const drugsCtrl = require('../controllers/drugs.js');

router.get('/', drugsCtrl.index);

module.exports = router;