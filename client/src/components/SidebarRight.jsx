import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Flame, Star, CheckCircle, Target } from 'lucide-react';

const SidebarRight = () => {
  const { user } = useSelector((state) => state.auth);
  const { progressHistory } = useSelector((state) => state.data);
  const [todayXP, setTodayXP] = useState(0);

  useEffect(() => {
    if (progressHistory && progressHistory.length > 0) {
      const today = new Date().toDateString();
      const earnedToday = progressHistory
        .filter(p => new Date(p.completedAt).toDateString() === today)
        .reduce((sum, p) => sum + p.score, 0);
      setTodayXP(earnedToday);
    }
  }, [progressHistory]);

  const dailyGoal = 100; // XP
  const progressPercent = Math.min((todayXP / dailyGoal) * 100, 100);

  return (
    <div className="clay-card h-full p-6 flex flex-col space-y-6">
      <h3 className="font-bold text-xl text-primary font-['Outfit'] mb-2">Daily Progress</h3>

      {/* Daily XP Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm font-medium">
          <span className="text-gray-600">Today's XP</span>
          <span className="text-primary">{todayXP} / {dailyGoal}</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-clay-light-inset">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-out"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        {todayXP >= dailyGoal && <p className="text-xs text-success font-bold text-center mt-1">Goal Reached! 🎉</p>}
      </div>

      {/* Streak Panel */}
      <div className="clay-card p-4 bg-orange-50 border-orange-100 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 opacity-10">
          <Flame size={64} color="#f97316" />
        </div>
        <Flame size={32} className={`mb-2 ${todayXP > 0 ? 'text-orange-500 animate-pulse' : 'text-gray-400'}`} />
        <p className="text-sm text-gray-600 font-medium">Current Streak</p>
        <p className={`text-3xl font-bold ${todayXP > 0 ? 'text-orange-600' : 'text-gray-500'}`}>
          {user?.streak || 0} {user?.streak === 1 ? 'Day' : 'Days'}
        </p>
      </div>

      {/* Stats */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 clay-card bg-white/50">
           <div className="flex items-center space-x-3 text-primary">
             <Star size={20} />
             <span className="font-medium text-gray-700">Total XP</span>
           </div>
           <span className="font-bold text-primary">{user?.xp || 0}</span>
        </div>
        
        <div className="flex items-center justify-between p-3 clay-card bg-white/50">
           <div className="flex items-center space-x-3 text-success">
             <CheckCircle size={20} />
             <span className="font-medium text-gray-700">Levels Done</span>
           </div>
           <span className="font-bold text-success">{Math.max((user?.currentLevel || 1) - 1, 0)}</span>
        </div>
      </div>

      {/* Quick Tips or Next Achievement */}
      <div className="mt-auto p-4 bg-primary/10 rounded-clay">
        <h4 className="font-bold text-primary mb-2 text-sm flex items-center"><Target size={16} className="mr-1"/> Next Milestone</h4>
        <p className="text-xs text-gray-600 leading-relaxed">
          Complete {((user?.currentLevel || 1) % 5 === 0 ? 5 : 5 - ((user?.currentLevel || 1) % 5))} more levels to unlock your next badge! Keep learning.
        </p>
      </div>
    </div>
  );
};

export default SidebarRight;
