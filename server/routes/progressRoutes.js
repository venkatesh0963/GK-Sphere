const express = require('express');
const router = express.Router();
const { completeLevel, getUserProgress } = require('../controllers/progressController');
const { protect } = require('../middleware/authMiddleware');

router.post('/complete', protect, completeLevel);
router.get('/', protect, getUserProgress);

module.exports = router;
