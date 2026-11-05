import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserStats, loseHeart, refillHeartsGems, refillHeartsAd, togglePro } from '../store/authSlice';
import { X, CheckCircle, XCircle, Heart, Gem, Zap, Tv, Crown, Snowflake } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QuestionEngine = ({ level, onComplete, onBack }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isLevelComplete, setIsLevelComplete] = useState(false);
  const [rewardInfo, setRewardInfo] = useState(null);
  const [heartLostAlert, setHeartLostAlert] = useState(false);

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

  const handleSelect = async (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    const isCorrectChoice = option === questions[currentIndex].correctAnswer;

    if (isCorrectChoice) {
      setScore(prev => prev + 10);
    } else {
      // Wrong answer -> lose heart unless Pro
      if (!user?.isPro) {
        setHeartLostAlert(true);
        setTimeout(() => setHeartLostAlert(false), 2000);
        dispatch(loseHeart());
      }
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
        setRewardInfo(res.data.reward);
        dispatch(updateUserStats(res.data.userStats));
      } catch (error) {
        console.error("Failed to save progress:", error);
      }
    }
  };

  if (loading) return <div className="flex items-center justify-center h-full"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;

  // OUT OF HEARTS SCREEN
  const isOutOfHearts = !user?.isPro && (user?.hearts ?? 5) <= 0;
  if (isOutOfHearts && !isLevelComplete) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6 max-w-md mx-auto">
        <div className="w-24 h-24 rounded-3xl bg-red-50 border-2 border-red-200 flex items-center justify-center text-danger mb-4 shadow-sm animate-pulse">
          <Heart size={48} className="fill-danger text-danger" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 font-['Outfit'] mb-2">You're Out of Hearts!</h2>
        <p className="text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed">
          You need at least 1 heart to take quizzes. Refill now to keep your learning streak going!
        </p>

        <div className="w-full space-y-3 mb-6">
          {/* Refill with Gems */}
          <button
            onClick={() => dispatch(refillHeartsGems())}
            disabled={(user?.gems ?? 0) < 50}
            className={`w-full p-3.5 rounded-clay border-2 flex items-center justify-between text-left transition-all ${
              (user?.gems ?? 0) < 50
                ? 'opacity-50 cursor-not-allowed bg-gray-50 border-gray-200'
                : 'bg-white border-cyan-200 hover:border-cyan-400 shadow-md active:scale-[0.99]'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600 shrink-0">
                <Gem size={18} className="fill-cyan-400" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-800">Refill All 5 Hearts</h4>
                <p className="text-xs text-gray-500">Spend 50 Gems ({user?.gems ?? 0} available)</p>
              </div>
            </div>
            <span className="bg-cyan-100 text-cyan-700 font-extrabold text-xs px-3 py-1.5 rounded-full">
              50 💎
            </span>
          </button>

          {/* Watch Ad */}
          <button
            onClick={() => dispatch(refillHeartsAd())}
            className="w-full p-3.5 rounded-clay border-2 border-orange-200 bg-white hover:border-orange-400 shadow-md flex items-center justify-between text-left transition-all active:scale-[0.99]"
          >
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
                <Tv size={18} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-800">Watch Rewarded Ad</h4>
                <p className="text-xs text-gray-500">Free +1 Heart refill</p>
              </div>
            </div>
            <span className="bg-orange-500 text-white font-extrabold text-xs px-3 py-1.5 rounded-full">
              +1 ❤️ Free
            </span>
          </button>

          {/* Go Pro */}
          <button
            onClick={() => dispatch(togglePro())}
            className="w-full p-3.5 rounded-clay bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg flex items-center justify-between transition-all active:scale-[0.99]"
          >
            <div className="flex items-center space-x-3 text-left">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-gold shrink-0">
                <Crown size={18} className="fill-gold" />
              </div>
              <div>
                <h4 className="font-bold text-sm">GKSphere Pro (from ₹99/mo)</h4>
                <p className="text-xs text-purple-100">Unlimited hearts & ad-free learning</p>
              </div>
            </div>
            <span className="bg-white/20 text-white font-extrabold text-xs px-3 py-1.5 rounded-full">
              Unlock
            </span>
          </button>
        </div>

        <button onClick={onBack} className="text-xs text-gray-500 hover:text-gray-800 underline">
          &larr; Back to Knowledge Tree
        </button>
      </div>
    );
  }

  // LEVEL COMPLETE SCREEN
  if (isLevelComplete) {
    return (
      <motion.div 
        initial={{ scale: 0.85, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        className="flex flex-col items-center justify-center h-full text-center p-4 max-w-md mx-auto"
      >
        <TrophyAnimation />
        <h2 className="text-3xl sm:text-4xl font-extrabold text-primary font-['Outfit'] mt-4 mb-1">
          Level {level} Complete!
        </h2>
        <p className="text-base text-gray-600 mb-6 font-medium">Score: {score} / 100</p>

        {/* Rewards Breakdown Cards */}
        <div className="w-full grid grid-cols-2 gap-3 mb-6">
          {/* XP Card */}
          <div className="clay-card p-3 bg-white/90 border border-gray-100 rounded-2xl flex flex-col items-center">
            <span className="text-xs text-gray-500 font-medium">XP Gained</span>
            <span className="text-xl font-extrabold text-primary mt-0.5">
              +{rewardInfo?.xpGained ?? score} XP
            </span>
            {rewardInfo?.doubleXpApplied && (
              <span className="mt-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 flex items-center space-x-0.5">
                <Zap size={10} className="fill-yellow-500" />
                <span>2X BOOST!</span>
              </span>
            )}
          </div>

          {/* Gems Card */}
          <div className="clay-card p-3 bg-white/90 border border-gray-100 rounded-2xl flex flex-col items-center">
            <span className="text-xs text-gray-500 font-medium">Gems Earned</span>
            <div className="flex items-center space-x-1 mt-0.5">
              <span className="text-xl font-extrabold text-cyan-600">
                +{rewardInfo?.gemsEarned ?? 20}
              </span>
              <Gem size={18} className="fill-cyan-400 text-cyan-500" />
            </div>
            <span className="mt-1 text-[10px] text-gray-400 font-semibold">Gem Store Bonus</span>
          </div>
        </div>

        {/* Streak Freeze Used Notice */}
        {rewardInfo?.streakFreezeUsed && (
          <div className="mb-6 p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold flex items-center justify-center space-x-1.5 w-full">
            <Snowflake size={16} className="text-blue-500 shrink-0" />
            <span>Streak Freeze consumed to protect your streak! ❄️</span>
          </div>
        )}

        <button onClick={onComplete} className="clay-btn-primary w-full py-3.5 text-base shadow-lg">
          Back to Knowledge Tree
        </button>
      </motion.div>
    );
  }

  const currentQ = questions[currentIndex];
  if (!currentQ) return null;
  const isCorrect = selectedOption === currentQ.correctAnswer;

  return (
    <div className="flex flex-col h-full overflow-y-auto px-1 sm:px-4 py-1 relative">
      
      {/* Floating -1 Heart Animation */}
      <AnimatePresence>
        {heartLostAlert && (
          <motion.div
            initial={{ y: 0, opacity: 1, scale: 1 }}
            animate={{ y: -30, opacity: 0, scale: 1.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute top-12 right-6 z-30 flex items-center space-x-1 px-3 py-1.5 rounded-full bg-red-600 text-white font-extrabold text-sm shadow-xl pointer-events-none"
          >
            <Heart size={16} className="fill-white" />
            <span>-1 Heart!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Quiz Header */}
      <div className="flex justify-between items-center mb-4 sm:mb-6 shrink-0">
        <button onClick={onBack} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition" aria-label="Go Back">
          <X size={20} />
        </button>

        {/* Hearts & Gems Live Indicator */}
        <div className="flex items-center space-x-2">
          <div
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-extrabold border ${
              user?.isPro
                ? 'bg-purple-50 text-purple-700 border-purple-200'
                : (user?.hearts ?? 5) <= 1
                ? 'bg-red-100 text-red-600 border-red-300 animate-pulse'
                : 'bg-red-50 text-danger border-red-200'
            }`}
          >
            <Heart size={14} className="fill-danger text-danger" />
            <span>{user?.isPro ? '∞' : `${user?.hearts ?? 5}`}</span>
          </div>

          <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 font-extrabold text-xs">
            <Gem size={13} className="fill-cyan-400 text-cyan-500" />
            <span>{user?.gems ?? 100}</span>
          </div>
        </div>

        <div className="font-bold bg-primary/10 px-3 sm:px-4 py-1 rounded-full text-primary text-xs sm:text-sm">
          {currentIndex + 1} / {questions.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-2 rounded-full mb-6 sm:mb-8 shrink-0">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question Body */}
      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full pb-6">
        <h3 className="text-lg sm:text-2xl font-bold mb-5 sm:mb-8 leading-snug sm:leading-relaxed text-gray-800">
          {currentQ.question}
        </h3>
        
        <div className="space-y-3 sm:space-y-4 mb-6">
          {currentQ.options.map((opt, idx) => {
            let btnClass = "w-full text-left p-3.5 sm:p-4 rounded-clay border-2 transition-all duration-200 text-sm sm:text-base font-medium ";
            if (!isAnswered) {
              btnClass += selectedOption === opt ? "border-primary bg-primary/5 shadow-sm" : "border-gray-100 hover:border-primary/50 bg-white shadow-clay-light";
            } else {
              if (opt === currentQ.correctAnswer) {
                btnClass += "border-success bg-success/10 font-bold";
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
              className={`p-4 sm:p-6 rounded-clay mb-6 ${isCorrect ? 'bg-success/10 border border-success/30' : 'bg-danger/10 border border-danger/30'}`}
            >
              <div className="flex items-center space-x-2 mb-2">
                {isCorrect ? <CheckCircle className="text-success shrink-0" /> : <XCircle className="text-danger shrink-0" />}
                <span className={`font-bold text-base sm:text-lg ${isCorrect ? 'text-success' : 'text-danger'}`}>
                  {isCorrect ? 'Correct!' : 'Incorrect (-1 Heart)'}
                </span>
              </div>
              <p className="text-gray-700 text-sm sm:text-base"><strong>Answer:</strong> {currentQ.correctAnswer}</p>
              {currentQ.solution && <p className="text-gray-600 mt-2 text-xs sm:text-sm leading-relaxed">{currentQ.solution}</p>}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-auto pt-4 flex justify-end">
          <button 
            onClick={handleNext} 
            disabled={!isAnswered}
            className={`clay-btn-primary w-full sm:w-auto px-8 ${!isAnswered && 'opacity-50 cursor-not-allowed'}`}
          >
            {currentIndex === questions.length - 1 ? 'Finish & Claim Rewards' : 'Next Question →'}
          </button>
        </div>
      </div>
    </div>
  );
};

const TrophyAnimation = () => (
  <div className="w-28 h-28 sm:w-32 sm:h-32 bg-yellow-100 rounded-full flex items-center justify-center mb-2 shadow-clay-light-inset">
    <span className="text-5xl sm:text-6xl">🏆</span>
  </div>
);

export default QuestionEngine;
