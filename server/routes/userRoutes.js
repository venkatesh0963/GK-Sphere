const express = require('express');
const router = express.Router();
const { getLeaderboard, updateSettings, deleteAccount, getAchievements } = require('../controllers/userController');
const {
  getEconomy,
  loseHeart,
  refillHeartsWithGems,
  refillHeartWithAd,
  buyShopItem,
  togglePro
} = require('../controllers/economyController');
const { protect } = require('../middleware/authMiddleware');

router.get('/leaderboard', protect, getLeaderboard);
router.put('/settings', protect, updateSettings);
router.delete('/settings', protect, deleteAccount);
router.get('/achievements', protect, getAchievements);

// Duolingo-style Gems & Hearts Economy routes
router.get('/economy', protect, getEconomy);
router.post('/hearts/lose', protect, loseHeart);
router.post('/hearts/refill-gems', protect, refillHeartsWithGems);
router.post('/hearts/refill-ad', protect, refillHeartWithAd);
router.post('/shop/buy', protect, buyShopItem);
router.post('/pro/toggle', protect, togglePro);

module.exports = router;
