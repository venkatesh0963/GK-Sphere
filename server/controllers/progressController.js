const Progress = require('../models/Progress');
const User = require('../models/User');

// @desc    Complete a level
// @route   POST /api/progress/complete
// @access  Private
const completeLevel = async (req, res) => {
  const { level, score } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let xpGain = 0;

    // Check if progress already exists
    let progress = await Progress.findOne({ userId: user._id, level });

    if (progress) {
      // Update existing progress if score is higher
      if (score > progress.score) {
        xpGain = score - progress.score;
        progress.score = score;
      }
      progress.completed = true;
      progress.completedAt = Date.now();
      await progress.save();
    } else {
      // Create new progress
      xpGain = score;
      progress = await Progress.create({
        userId: user._id,
        level,
        score,
        completed: true,
        completedAt: Date.now()
      });
    }

    user.xp += xpGain;

    // Update User Stats
    if (!user.completedLevels.includes(level)) {
      user.completedLevels.push(level);
      
      // Unlock next level if they just completed their current highest level
      if (level === user.currentLevel) {
        user.currentLevel += 1;
      }

      // Check for milestone achievements
      if (level % 10 === 0) {
         const Achievement = require('../models/Achievement');
         const milestoneBadge = await Achievement.findOne({ levelRequired: level });
         if (milestoneBadge && !user.achievements.includes(milestoneBadge._id)) {
            user.achievements.push(milestoneBadge._id);
         }
      }
    }

    // Streak Logic
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const lastActiveDate = new Date(user.lastActive);
    lastActiveDate.setHours(0,0,0,0);

    const diffTime = Math.abs(today - lastActiveDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      // Completed a level the next day -> increase streak
      user.streak += 1;
    } else if (diffDays > 1) {
      // Missed a day -> reset streak to 1
      user.streak = 1;
    } else if (user.streak === 0) {
      // First time completion
      user.streak = 1;
    }

    user.lastActive = Date.now();
    await user.save();

    res.json({
      progress,
      userStats: {
        xp: user.xp,
        currentLevel: user.currentLevel,
        streak: user.streak,
        completedLevels: user.completedLevels
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user progress
// @route   GET /api/progress
// @access  Private
const getUserProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.user._id });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { completeLevel, getUserProgress };
