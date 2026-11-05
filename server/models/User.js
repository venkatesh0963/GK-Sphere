const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: String,
    default: 'default-avatar.png'
  },
  xp: {
    type: Number,
    default: 0
  },
  streak: {
    type: Number,
    default: 0
  },
  lastActive: {
    type: Date,
    default: Date.now
  },
  currentLevel: {
    type: Number,
    default: 1
  },
  completedLevels: {
    type: [Number],
    default: []
  },
  achievements: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Achievement',
    default: []
  },
  hearts: {
    type: Number,
    default: 5,
    min: 0,
    max: 5
  },
  lastHeartRegen: {
    type: Date,
    default: Date.now
  },
  gems: {
    type: Number,
    default: 100 // Welcome gift for learning
  },
  isPro: {
    type: Boolean,
    default: false
  },
  streakFreezes: {
    type: Number,
    default: 0
  },
  doubleXpUntil: {
    type: Date,
    default: null
  }
}, { timestamps: true });

UserSchema.pre('save', async function() {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
