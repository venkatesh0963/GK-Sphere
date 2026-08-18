const express = require('express');
const router = express.Router();
const { getQuestionsByLevel, createQuestion } = require('../controllers/questionController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/level/:level', protect, getQuestionsByLevel);
router.post('/', protect, admin, createQuestion);

module.exports = router;
