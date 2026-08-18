const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  level: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  options: [{
    type: String,
    required: true
  }],
  correctAnswer: {
    type: String,
    required: true
  },
  solution: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  }
}, { timestamps: true });

module.exports = mongoose.model('Question', QuestionSchema);
