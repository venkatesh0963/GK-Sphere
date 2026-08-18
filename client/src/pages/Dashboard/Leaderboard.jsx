import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboard } from '../../store/dataSlice';
import { Trophy } from 'lucide-react';

const Leaderboard = () => {
  const dispatch = useDispatch();
  const { leaderboard, isLoading } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, [dispatch]);

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="clay-card h-full p-6 overflow-y-auto">
      <div className="flex items-center space-x-3 mb-6">
        <Trophy className="text-yellow-500" size={28} />
        <h2 className="text-3xl font-bold text-primary font-['Outfit']">Global Leaderboard</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-100">
              <th className="p-4 font-bold text-gray-600">Rank</th>
              <th className="p-4 font-bold text-gray-600">User</th>
              <th className="p-4 font-bold text-gray-600">Level</th>
              <th className="p-4 font-bold text-gray-600">Streak</th>
              <th className="p-4 font-bold text-gray-600 text-right">XP</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user, index) => (
              <tr key={user._id} className="border-b border-gray-50 hover:bg-primary/5 transition-colors">
                <td className="p-4 font-bold text-gray-500">#{index + 1}</td>
                <td className="p-4 font-medium flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden shadow-clay-light-inset border-2 border-white shrink-0 bg-primary/10">
                    <img src="/clay_avatar.png" alt="User Avatar" className="w-full h-full object-cover" />
                  </div>
                  <span>{user.username}</span>
                </td>
                <td className="p-4 text-gray-600">{user.currentLevel}</td>
                <td className="p-4 text-orange-500 font-medium">{user.streak} 🔥</td>
                <td className="p-4 font-bold text-primary text-right">{user.xp}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {leaderboard.length === 0 && <p className="text-center mt-8 text-gray-500">No users found.</p>}
      </div>
    </div>
  );
};

export default Leaderboard;
