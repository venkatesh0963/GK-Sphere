const User = require('../models/User');
const { updateUserHearts, getEconomyProfile } = require('../utils/economyHelper');

// @desc    Get user's current economy state (hearts, countdown, gems, pro status, double XP)
// @route   GET /api/users/economy
// @access  Private
const getEconomy = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Recalculate hearts
    updateUserHearts(user);
    await user.save();

    res.json(getEconomyProfile(user));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Deduct 1 heart when answering a question wrong
// @route   POST /api/users/hearts/lose
// @access  Private
const loseHeart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Pro members have unlimited hearts!
    if (user.isPro) {
      return res.json({
        message: 'GKSphere Pro active - Unlimited hearts!',
        ...getEconomyProfile(user)
      });
    }

    // Update hearts based on any elapsed regen time first
    updateUserHearts(user);

    if (user.hearts <= 0) {
      user.hearts = 0;
      await user.save();
      return res.status(400).json({
        message: 'No hearts left! Refill with gems, watch an ad, or upgrade to GKSphere Pro for unlimited hearts.',
        outOfHearts: true,
        ...getEconomyProfile(user)
      });
    }

    // If hearts was at maximum (5), start the regen timer from now
    if (user.hearts === 5) {
      user.lastHeartRegen = new Date();
    }

    user.hearts = Math.max(0, user.hearts - 1);
    await user.save();

    res.json({
      message: user.hearts === 0 ? 'Out of hearts!' : 'Heart lost',
      ...getEconomyProfile(user)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Refill all 5 hearts using 50 gems
// @route   POST /api/users/hearts/refill-gems
// @access  Private
const refillHeartsWithGems = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const REFILL_COST = 50;

    if ((user.gems ?? 0) < REFILL_COST) {
      return res.status(400).json({
        message: `Not enough gems! You have ${user.gems ?? 0} 💎, but need ${REFILL_COST} 💎. Complete quizzes to earn more.`
      });
    }

    user.gems -= REFILL_COST;
    user.hearts = 5;
    user.lastHeartRegen = new Date();
    await user.save();

    res.json({
      message: 'Hearts fully refilled to 5!',
      ...getEconomyProfile(user)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Refill +1 heart by watching a rewarded ad
// @route   POST /api/users/hearts/refill-ad
// @access  Private
const refillHeartWithAd = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    updateUserHearts(user);

    if (user.hearts >= 5) {
      return res.json({
        message: 'Your hearts are already full!',
        ...getEconomyProfile(user)
      });
    }

    user.hearts = Math.min(5, user.hearts + 1);
    if (user.hearts === 5) {
      user.lastHeartRegen = new Date();
    }
    await user.save();

    res.json({
      message: '+1 Heart gained from watching ad! ❤️',
      ...getEconomyProfile(user)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Buy items from the in-game Gem Shop
// @route   POST /api/users/shop/buy
// @access  Private
const buyShopItem = async (req, res) => {
  const { itemId } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.gems = user.gems ?? 100;
    user.streakFreezes = user.streakFreezes ?? 0;

    switch (itemId) {
      case 'hearts_refill': {
        const COST = 50;
        if (user.gems < COST) {
          return res.status(400).json({ message: 'Not enough gems for hearts refill.' });
        }
        user.gems -= COST;
        user.hearts = 5;
        user.lastHeartRegen = new Date();
        break;
      }

      case 'streak_freeze': {
        const COST = 100;
        if (user.gems < COST) {
          return res.status(400).json({ message: 'Not enough gems for a Streak Freeze.' });
        }
        user.gems -= COST;
        user.streakFreezes += 1;
        break;
      }

      case 'double_xp': {
        const COST = 75;
        if (user.gems < COST) {
          return res.status(400).json({ message: 'Not enough gems for Double XP potion.' });
        }
        user.gems -= COST;
        // 15-minute 2x XP boost
        const currentBoostUntil = user.doubleXpUntil && new Date(user.doubleXpUntil) > new Date()
          ? new Date(user.doubleXpUntil).getTime()
          : Date.now();
        user.doubleXpUntil = new Date(currentBoostUntil + 15 * 60 * 1000);
        break;
      }

      default:
        return res.status(400).json({ message: 'Invalid shop item' });
    }

    await user.save();
    res.json({
      message: `Purchase successful! Item: ${itemId}`,
      ...getEconomyProfile(user)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle GKSphere Pro membership (instant activation / test)
// @route   POST /api/users/pro/toggle
// @access  Private
const togglePro = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isPro = !user.isPro;
    if (user.isPro) {
      user.hearts = 5; // unlimited
    }
    await user.save();

    res.json({
      message: user.isPro ? '🎉 GKSphere Pro Activated! Unlimited Hearts Unlocked.' : 'GKSphere Pro cancelled.',
      ...getEconomyProfile(user)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getEconomy,
  loseHeart,
  refillHeartsWithGems,
  refillHeartWithAd,
  buyShopItem,
  togglePro
};
