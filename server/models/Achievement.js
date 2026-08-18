const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  badgeImage: {
    type: String,
    default: 'default-badge.png'
  },
  levelRequired: {
    type: Number,
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Achievement', AchievementSchema);
