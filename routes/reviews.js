const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');

router.post('/drugs/:id/reviews', reviewsCtrl.create);

module.exports = router;