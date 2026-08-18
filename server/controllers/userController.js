const User = require('../models/User');
const Progress = require('../models/Progress');
const bcrypt = require('bcryptjs');

// @desc    Get top users for leaderboard
// @route   GET /api/users/leaderboard
// @access  Private
const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find({})
      .sort({ xp: -1, streak: -1 }) // Sort by XP descending, then Streak
      .select('username xp streak currentLevel avatar')
      .limit(100);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user settings (username, password)
// @route   PUT /api/users/settings
// @access  Private
const updateSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (req.body.username) {
      // Check if username is already taken by someone else
      const existingUser = await User.findOne({ username: req.body.username });
      if (existingUser && existingUser._id.toString() !== user._id.toString()) {
        return res.status(400).json({ message: 'Username is already taken' });
      }
      user.username = req.body.username;
    }

    if (req.body.password) {
      user.password = req.body.password; // Mongoose pre-save hook will hash this
    }

    const updatedUser = await user.save();
    
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      xp: updatedUser.xp,
      currentLevel: updatedUser.currentLevel,
      streak: updatedUser.streak,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete user account and progress
// @route   DELETE /api/users/settings
// @access  Private
const deleteAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete associated progress
    await Progress.deleteMany({ userId: user._id });
    
    // Delete user
    await user.deleteOne();

    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user achievements/badges
// @route   GET /api/users/achievements
// @access  Private
const getAchievements = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('achievements');
    
    // Evaluate logic for achievements dynamically based on stats
    const earnedBadges = [];
    
    if (user.completedLevels.length >= 1) earnedBadges.push('First Byte');
    if (user.completedLevels.length >= 5) earnedBadges.push('Knowledge Seeker');
    if (user.completedLevels.length >= 10) earnedBadges.push('Trivia Master');
    if (user.streak >= 7) earnedBadges.push('7-Day Streak');
    if (user.streak >= 30) earnedBadges.push('Monthly Scholar');

    // Add DB achievements
    user.achievements.forEach(ach => earnedBadges.push(ach.title));

    res.json({ badges: earnedBadges });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getLeaderboard, updateSettings, deleteAccount, getAchievements };
