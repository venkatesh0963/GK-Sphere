import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserStats } from '../store/authSlice';
import { X, CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QuestionEngine = ({ level, onComplete, onBack }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isLevelComplete, setIsLevelComplete] = useState(false);

  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        };
        const res = await axios.get(`http://localhost:5000/api/questions/level/${level}`, config);
        setQuestions(res.data);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [level, user.token]);

  const handleSelect = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    if (option === questions[currentIndex].correctAnswer) {
      setScore(prev => prev + 10);
    }
  };

  const handleNext = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsLevelComplete(true);
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` }
        };
        const res = await axios.post(`http://localhost:5000/api/progress/complete`, {
          level,
          score: score + (selectedOption === questions[currentIndex].correctAnswer && !isAnswered ? 10 : 0)
        }, config);
        dispatch(updateUserStats(res.data.userStats));
      } catch (error) {
        console.error("Failed to save progress:", error);
      }
    }
  };

  if (loading) return <div className="flex items-center justify-center h-full"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;

  if (isLevelComplete) {
    return (
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        className="flex flex-col items-center justify-center h-full text-center"
      >
        <TrophyAnimation />
        <h2 className="text-4xl font-bold text-primary mt-6 mb-2">Level Complete!</h2>
        <p className="text-xl text-gray-600 mb-8">Score: {score} / 100</p>
        <div className="flex space-x-4">
           <button onClick={onComplete} className="clay-btn-primary">Back to Tree</button>
        </div>
      </motion.div>
    );
  }

  const currentQ = questions[currentIndex];
  const isCorrect = selectedOption === currentQ.correctAnswer;

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <button onClick={onBack} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
          <X size={20} />
        </button>
        <div className="font-bold text-primary">Level {level}</div>
        <div className="font-bold bg-primary/10 px-4 py-1 rounded-full text-primary">
          {currentIndex + 1} / {questions.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-2 rounded-full mb-8">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full">
        <h3 className="text-2xl font-bold mb-8 leading-relaxed">{currentQ.question}</h3>
        
        <div className="space-y-4 mb-8">
          {currentQ.options.map((opt, idx) => {
            let btnClass = "w-full text-left p-4 rounded-clay border-2 transition-all duration-200 ";
            if (!isAnswered) {
              btnClass += selectedOption === opt ? "border-primary bg-primary/5" : "border-gray-100 hover:border-primary/50 bg-white shadow-clay-light";
            } else {
              if (opt === currentQ.correctAnswer) {
                btnClass += "border-success bg-success/10";
              } else if (selectedOption === opt) {
                btnClass += "border-danger bg-danger/10";
              } else {
                btnClass += "border-gray-100 opacity-50";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(opt)}
                className={btnClass}
                disabled={isAnswered}
              >
                {opt}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {isAnswered && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className={`p-6 rounded-clay mb-8 ${isCorrect ? 'bg-success/10 border border-success/30' : 'bg-danger/10 border border-danger/30'}`}
            >
              <div className="flex items-center space-x-2 mb-2">
                {isCorrect ? <CheckCircle className="text-success" /> : <XCircle className="text-danger" />}
                <span className={`font-bold text-lg ${isCorrect ? 'text-success' : 'text-danger'}`}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </span>
              </div>
              <p className="text-gray-700"><strong>Answer:</strong> {currentQ.correctAnswer}</p>
              <p className="text-gray-600 mt-2 text-sm">{currentQ.solution}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-auto flex justify-end">
          <button 
            onClick={handleNext} 
            disabled={!isAnswered}
            className={`clay-btn-primary px-8 ${!isAnswered && 'opacity-50 cursor-not-allowed'}`}
          >
            {currentIndex === questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

const TrophyAnimation = () => (
  <div className="w-32 h-32 bg-yellow-100 rounded-full flex items-center justify-center mb-4 shadow-clay-light-inset">
    <span className="text-6xl">🏆</span>
  </div>
);

export default QuestionEngine;
