import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Flame, Star, CheckCircle, Target, Heart, Gem, Snowflake, Zap, ShoppingBag, Crown } from 'lucide-react';

const SidebarRight = ({ onOpenHearts, onOpenShop }) => {
  const { user } = useSelector((state) => state.auth);
  const { progressHistory } = useSelector((state) => state.data);
  const [todayXP, setTodayXP] = useState(0);
  const [doubleXpSecs, setDoubleXpSecs] = useState(user?.doubleXpSecondsLeft || 0);

  useEffect(() => {
    if (progressHistory && progressHistory.length > 0) {
      const today = new Date().toDateString();
      const earnedToday = progressHistory
        .filter(p => new Date(p.completedAt).toDateString() === today)
        .reduce((sum, p) => sum + p.score, 0);
      setTodayXP(earnedToday);
    }
  }, [progressHistory]);

  useEffect(() => {
    setDoubleXpSecs(user?.doubleXpSecondsLeft || 0);
  }, [user?.doubleXpSecondsLeft]);

  useEffect(() => {
    if (doubleXpSecs <= 0) return;
    const interval = setInterval(() => {
      setDoubleXpSecs(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [doubleXpSecs]);

  const dailyGoal = 100; // XP
  const progressPercent = Math.min((todayXP / dailyGoal) * 100, 100);

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="clay-card h-full p-5 sm:p-6 flex flex-col space-y-5 overflow-y-auto">
      {/* Header with Shop & Pro status */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg text-primary font-['Outfit']">Stats & Inventory</h3>
        {user?.isPro ? (
          <span className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-gold/20 text-yellow-800 text-xs font-extrabold shadow-sm border border-gold/30">
            <Crown size={13} className="text-gold fill-gold" />
            <span>PRO</span>
          </span>
        ) : (
          <button
            onClick={onOpenShop}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold transition-colors"
          >
            <ShoppingBag size={13} />
            <span>Store</span>
          </button>
        )}
      </div>

      {/* Lives & Gems Currency Bar */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Hearts Widget */}
        <button
          onClick={onOpenHearts}
          className="p-2.5 rounded-2xl bg-red-50/80 border border-red-100 flex flex-col items-center hover:bg-red-100/70 transition-all active:scale-95 text-left"
        >
          <div className="flex items-center space-x-1.5 text-danger font-extrabold text-sm">
            <Heart size={17} className="fill-danger text-danger" />
            <span>{user?.isPro ? '∞' : `${user?.hearts ?? 5}/5`}</span>
          </div>
          <span className="text-[11px] text-gray-500 font-medium mt-0.5">
            {user?.isPro ? 'Unlimited' : (user?.hearts < 5 ? 'Refill ❤️' : 'Full Hearts')}
          </span>
        </button>

        {/* Gems Widget */}
        <button
          onClick={onOpenShop}
          className="p-2.5 rounded-2xl bg-cyan-50/80 border border-cyan-100 flex flex-col items-center hover:bg-cyan-100/70 transition-all active:scale-95 text-left"
        >
          <div className="flex items-center space-x-1.5 text-cyan-600 font-extrabold text-sm">
            <Gem size={17} className="fill-cyan-400 text-cyan-500" />
            <span>{user?.gems ?? 100}</span>
          </div>
          <span className="text-[11px] text-gray-500 font-medium mt-0.5">Gems Store</span>
        </button>
      </div>

      {/* Active Boost / Streak Freeze Inventory */}
      {(doubleXpSecs > 0 || (user?.streakFreezes ?? 0) > 0) && (
        <div className="space-y-1.5">
          {doubleXpSecs > 0 && (
            <div className="flex items-center justify-between p-2 rounded-xl bg-yellow-50 border border-yellow-200 text-xs font-bold text-yellow-800">
              <span className="flex items-center space-x-1">
                <Zap size={14} className="fill-yellow-500 text-yellow-600" />
                <span>2x XP Boost</span>
              </span>
              <span className="font-mono text-primary font-extrabold">{formatTimer(doubleXpSecs)}</span>
            </div>
          )}
          {(user?.streakFreezes ?? 0) > 0 && (
            <div className="flex items-center justify-between p-2 rounded-xl bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-800">
              <span className="flex items-center space-x-1">
                <Snowflake size={14} className="text-blue-500" />
                <span>Streak Freezes</span>
              </span>
              <span className="font-bold">{user?.streakFreezes} active</span>
            </div>
          )}
        </div>
      )}

      {/* Daily XP Bar */}
      <div className="space-y-1.5 pt-1">
        <div className="flex justify-between text-xs font-medium">
          <span className="text-gray-600">Daily XP Goal</span>
          <span className="text-primary font-bold">{todayXP} / {dailyGoal}</span>
        </div>
        <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden shadow-clay-light-inset">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-out"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        {todayXP >= dailyGoal && <p className="text-xs text-success font-bold text-center mt-1">Goal Reached! 🎉</p>}
      </div>

      {/* Streak Panel */}
      <div className="clay-card p-3.5 bg-orange-50 border-orange-100 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 opacity-10">
          <Flame size={54} color="#f97316" />
        </div>
        <Flame size={28} className={`mb-1.5 ${todayXP > 0 ? 'text-orange-500 animate-pulse' : 'text-gray-400'}`} />
        <p className="text-xs text-gray-600 font-medium">Daily Streak</p>
        <p className={`text-2xl font-bold ${todayXP > 0 ? 'text-orange-600' : 'text-gray-500'}`}>
          {user?.streak || 0} {user?.streak === 1 ? 'Day' : 'Days'}
        </p>
      </div>

      {/* Stats */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between p-2.5 clay-card bg-white/50 text-xs sm:text-sm">
           <div className="flex items-center space-x-2.5 text-primary">
             <Star size={18} />
             <span className="font-medium text-gray-700">Total XP</span>
           </div>
           <span className="font-bold text-primary">{user?.xp || 0}</span>
        </div>
        
        <div className="flex items-center justify-between p-2.5 clay-card bg-white/50 text-xs sm:text-sm">
           <div className="flex items-center space-x-2.5 text-success">
             <CheckCircle size={18} />
             <span className="font-medium text-gray-700">Levels Completed</span>
           </div>
           <span className="font-bold text-success">{Math.max((user?.currentLevel || 1) - 1, 0)}</span>
        </div>
      </div>

      {/* Next Milestone */}
      <div className="mt-auto p-3.5 bg-primary/10 rounded-clay">
        <h4 className="font-bold text-primary mb-1 text-xs flex items-center"><Target size={15} className="mr-1"/> Next Milestone</h4>
        <p className="text-xs text-gray-600 leading-relaxed">
          Complete {((user?.currentLevel || 1) % 5 === 0 ? 5 : 5 - ((user?.currentLevel || 1) % 5))} more levels to unlock your next badge!
        </p>
      </div>
    </div>
  );
};

export default SidebarRight;
