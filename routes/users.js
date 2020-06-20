const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users.js');

router.get('/:id', usersCtrl.show);
router.put('/:id', usersCtrl.update);
router.put('/:id/cleardel', usersCtrl.clearDel);

module.exports = router;