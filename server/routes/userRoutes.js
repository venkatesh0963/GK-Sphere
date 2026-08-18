const express = require('express');
const router = express.Router();
const { getLeaderboard, updateSettings, deleteAccount, getAchievements } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/leaderboard', protect, getLeaderboard);
router.put('/settings', protect, updateSettings);
router.delete('/settings', protect, deleteAccount);
router.get('/achievements', protect, getAchievements);

module.exports = router;
