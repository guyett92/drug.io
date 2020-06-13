const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');

router.post('/drugs/:id/reviews', reviewsCtrl.create);
router.delete('/reviews/:id', reviewsCtrl.delReview);
router.post('/reviews/:id', reviewsCtrl.addLike);
router.put('/reviews/:id', reviewsCtrl.removeLike);

module.exports = router;