import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { refillHeartsGems, refillHeartsAd, togglePro } from '../store/authSlice';
import { Heart, X, Sparkles, Tv, Gem, Crown, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HeartsModal = ({ isOpen, onClose, onOpenShop }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [adPlaying, setAdPlaying] = useState(false);
  const [adProgress, setAdProgress] = useState(0);
  const [adDone, setAdDone] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(user?.nextHeartInSeconds || 0);
  const [statusMsg, setStatusMsg] = useState('');

  // Sync next heart countdown timer
  useEffect(() => {
    setSecondsLeft(user?.nextHeartInSeconds || 0);
  }, [user?.nextHeartInSeconds]);

  // Decrement countdown each second
  useEffect(() => {
    if (secondsLeft <= 0 || user?.hearts >= 5 || user?.isPro) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft, user?.hearts, user?.isPro]);

  if (!isOpen || !user) return null;

  const formatCountdown = (secs) => {
    if (secs <= 0) return '00:00';
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (h > 0) {
      return `${h}h ${m < 10 ? '0' : ''}${m}m ${s < 10 ? '0' : ''}${s}s`;
    }
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  const handleRefillGems = async () => {
    if ((user?.gems ?? 0) < 50) {
      setStatusMsg('Not enough gems! Complete quizzes to earn more.');
      setTimeout(() => setStatusMsg(''), 3000);
      return;
    }
    await dispatch(refillHeartsGems());
    setStatusMsg('Hearts fully restored to 5! ❤️');
    setTimeout(() => setStatusMsg(''), 2500);
  };

  const handleWatchAd = () => {
    setAdPlaying(true);
    setAdProgress(0);
    setAdDone(false);

    const interval = setInterval(() => {
      setAdProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setAdDone(true);
          dispatch(refillHeartsAd());
          return 100;
        }
        return prev + 25; // 4 ticks = ~3 seconds
      });
    }, 700);
  };

  const handleTogglePro = async () => {
    await dispatch(togglePro());
    setStatusMsg(user.isPro ? 'Pro deactivated.' : '🎉 GKSphere Pro Activated! Unlimited hearts.');
    setTimeout(() => setStatusMsg(''), 2500);
  };

  const heartsCount = user.isPro ? 5 : (user.hearts ?? 5);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Content */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="clay-card relative bg-white w-full max-w-md p-6 sm:p-7 z-10 overflow-hidden shadow-2xl rounded-[28px]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Header Icon & Hearts Bar */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-2xl bg-red-50 text-danger shadow-inner mb-3">
            <Heart size={36} className="fill-danger text-danger animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold font-['Outfit'] text-gray-800">
            {user.isPro ? 'Unlimited Hearts!' : 'Hearts & Lives'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-xs mx-auto">
            {user.isPro
              ? 'You have GKSphere Pro. Make mistakes freely without losing progress.'
              : 'Hearts protect your quiz progress. Each wrong answer consumes 1 heart.'}
          </p>

          {/* Hearts Graphic */}
          <div className="flex justify-center items-center space-x-2.5 mt-4">
            {[1, 2, 3, 4, 5].map((i) => {
              const filled = user.isPro || i <= (user.hearts ?? 5);
              return (
                <div
                  key={i}
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                    filled
                      ? 'bg-red-50 border-2 border-red-200 text-danger shadow-sm scale-100'
                      : 'bg-gray-100 border-2 border-gray-200 text-gray-300 opacity-60 scale-95'
                  }`}
                >
                  <Heart
                    size={22}
                    className={filled ? 'fill-danger text-danger' : 'text-gray-300'}
                  />
                </div>
              );
            })}
          </div>

          {/* Timer Countdown (if not full & not Pro) */}
          {!user.isPro && (user.hearts ?? 5) < 5 && (
            <div className="mt-3 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/60 text-orange-600 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>
              <span>Next heart in: <strong>{formatCountdown(secondsLeft)}</strong></span>
            </div>
          )}
        </div>

        {/* Status Message */}
        {statusMsg && (
          <div className="mb-4 p-2.5 rounded-xl bg-primary/10 text-primary text-xs font-bold text-center flex items-center justify-center space-x-1.5">
            <CheckCircle2 size={16} />
            <span>{statusMsg}</span>
          </div>
        )}

        {/* Refill Options */}
        {!user.isPro && (
          <div className="space-y-3 mb-6">
            {/* Option 1: Refill with Gems */}
            <button
              onClick={handleRefillGems}
              disabled={(user.hearts ?? 5) >= 5}
              className={`w-full p-3.5 rounded-clay border-2 flex items-center justify-between transition-all ${
                (user.hearts ?? 5) >= 5
                  ? 'opacity-50 cursor-not-allowed border-gray-200 bg-gray-50'
                  : 'border-primary/20 bg-white hover:border-primary/50 shadow-clay-light active:scale-[0.99]'
              }`}
            >
              <div className="flex items-center space-x-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-500 shrink-0">
                  <Gem size={20} className="fill-cyan-400" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-800">Refill All 5 Hearts</h4>
                  <p className="text-xs text-gray-500">Restore all hearts instantly</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 bg-cyan-100 text-cyan-700 font-bold px-3 py-1.5 rounded-full text-xs">
                <span>50</span>
                <Gem size={14} className="fill-cyan-600" />
              </div>
            </button>

            {/* Option 2: Watch Rewarded Ad */}
            <button
              onClick={handleWatchAd}
              disabled={(user.hearts ?? 5) >= 5 || adPlaying}
              className={`w-full p-3.5 rounded-clay border-2 flex items-center justify-between transition-all ${
                (user.hearts ?? 5) >= 5 || adPlaying
                  ? 'opacity-50 cursor-not-allowed border-gray-200 bg-gray-50'
                  : 'border-orange-200/60 bg-white hover:border-orange-400 shadow-clay-light active:scale-[0.99]'
              }`}
            >
              <div className="flex items-center space-x-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shrink-0">
                  <Tv size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-800">Watch Rewarded Ad</h4>
                  <p className="text-xs text-gray-500">Watch a 3-second sponsor ad for +1 Heart</p>
                </div>
              </div>
              <div className="bg-orange-500 text-white font-bold px-3 py-1.5 rounded-full text-xs">
                +1 ❤️ Free
              </div>
            </button>
          </div>
        )}

        {/* Ad Playing Overlay Simulation */}
        <AnimatePresence>
          {adPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-900 text-white p-6 z-20 flex flex-col justify-between items-center text-center"
            >
              <div className="w-full flex justify-between items-center text-xs text-gray-400">
                <span className="uppercase tracking-widest font-bold text-gold">Sponsor Ad</span>
                <span>{adDone ? 'Reward Unlocked!' : 'Playing...'}</span>
              </div>

              <div className="my-auto">
                <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary mx-auto flex items-center justify-center mb-4 animate-bounce">
                  <Sparkles size={36} className="text-gold" />
                </div>
                <h3 className="text-xl font-bold mb-2">GKSphere Learning Partner</h3>
                <p className="text-xs text-gray-300 max-w-xs">
                  Master new subjects daily with AI-powered personalized quizzes.
                </p>

                {/* Progress bar */}
                <div className="w-64 bg-gray-800 h-2.5 rounded-full mx-auto mt-6 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                    style={{ width: `${adProgress}%` }}
                  ></div>
                </div>
              </div>

              {adDone ? (
                <button
                  onClick={() => setAdPlaying(false)}
                  className="clay-btn-primary w-full py-2.5 text-sm"
                >
                  Claim +1 Heart & Close
                </button>
              ) : (
                <p className="text-xs text-gray-400">Reward will be given when ad ends...</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* GKSphere Pro Banner / Toggle */}
        <div className="p-4 rounded-clay bg-gradient-to-r from-primary/10 via-purple-50 to-gold/10 border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2.5 text-left">
            <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-clay-primary">
              <Crown size={20} className="text-gold" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-800 flex items-center">
                GKSphere Pro
                {user.isPro && <span className="ml-2 text-[10px] bg-gold/20 text-yellow-700 px-2 py-0.5 rounded-full font-extrabold">ACTIVE</span>}
              </h4>
              <p className="text-xs text-gray-600">Unlimited hearts from ₹99/month (₹3.3/day)</p>
            </div>
          </div>
          <button
            onClick={handleTogglePro}
            className={`px-4 py-2 rounded-full font-bold text-xs transition-all shadow-md shrink-0 ${
              user.isPro
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-primary hover:bg-primary-dark text-white'
            }`}
          >
            {user.isPro ? 'Deactivate Pro' : 'Activate Pro Free'}
          </button>
        </div>

      </motion.div>
    </div>
  );
};

export default HeartsModal;
