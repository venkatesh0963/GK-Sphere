import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAchievements } from '../../store/dataSlice';
import { Award, Lock } from 'lucide-react';

// List of all possible badges in the game
const ALL_BADGES = [
  { id: 'First Byte', desc: 'Complete your first level', icon: '🌟' },
  { id: 'Knowledge Seeker', desc: 'Complete 5 levels', icon: '🧠' },
  { id: 'Trivia Master', desc: 'Complete 10 levels', icon: '👑' },
  { id: '7-Day Streak', desc: 'Maintain a 7-day learning streak', icon: '🔥' },
  { id: 'Monthly Scholar', desc: 'Maintain a 30-day learning streak', icon: '📅' },
  { id: 'Novice', desc: 'Reach Level 10', icon: '🥉' },
  { id: 'Beginner', desc: 'Reach Level 20', icon: '🥈' },
  { id: 'Apprentice', desc: 'Reach Level 30', icon: '🏅' },
  { id: 'Competent', desc: 'Reach Level 40', icon: '🥇' },
  { id: 'Pro', desc: 'Reach Level 50', icon: '🎖️' },
  { id: 'Expert', desc: 'Reach Level 60', icon: '🎓' },
  { id: 'Master', desc: 'Reach Level 70', icon: '🏆' },
  { id: 'Grandmaster', desc: 'Reach Level 80', icon: '💎' },
  { id: 'Legend', desc: 'Reach Level 90', icon: '🔮' },
  { id: 'GK God', desc: 'Reach Level 100', icon: '👑' }
];

const Achievements = () => {
  const dispatch = useDispatch();
  const { achievements, isLoading } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchAchievements());
  }, [dispatch]);

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="clay-card h-full p-6 overflow-y-auto">
      <div className="flex items-center space-x-3 mb-8">
        <Award className="text-primary" size={28} />
        <h2 className="text-3xl font-bold text-primary font-['Outfit']">Badges & Achievements</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {ALL_BADGES.map((badge) => {
          const isUnlocked = achievements.includes(badge.id);
          return (
            <div 
              key={badge.id} 
              className={`p-6 rounded-clay border-2 flex flex-col items-center text-center transition-all duration-300 ${
                isUnlocked 
                  ? 'bg-white shadow-clay-light border-primary/20 hover:scale-105' 
                  : 'bg-gray-50 border-transparent opacity-60 grayscale'
              }`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 ${
                isUnlocked ? 'bg-primary/10 shadow-clay-light-inset' : 'bg-gray-200'
              }`}>
                {isUnlocked ? badge.icon : <Lock size={24} className="text-gray-400" />}
              </div>
              <h3 className={`font-bold text-lg mb-1 ${isUnlocked ? 'text-primary' : 'text-gray-500'}`}>
                {badge.id}
              </h3>
              <p className="text-xs text-gray-500">{badge.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Achievements;
