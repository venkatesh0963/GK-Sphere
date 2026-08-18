const Question = require('../models/Question');

// @desc    Get questions for a specific level
// @route   GET /api/questions/level/:level
// @access  Private
const getQuestionsByLevel = async (req, res) => {
  try {
    const level = parseInt(req.params.level);
    // Fetch random 10 questions for this level
    const questions = await Question.aggregate([
      { $match: { level: level } },
      { $sample: { size: 10 } }
    ]);

    if (questions.length === 0) {
      return res.status(404).json({ message: 'No questions found for this level' });
    }

    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Admin: Create a new question
// @route   POST /api/questions
// @access  Private/Admin
const createQuestion = async (req, res) => {
  const { level, category, question, options, correctAnswer, solution, difficulty } = req.body;

  try {
    const newQuestion = await Question.create({
      level, category, question, options, correctAnswer, solution, difficulty
    });
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getQuestionsByLevel, createQuestion };
