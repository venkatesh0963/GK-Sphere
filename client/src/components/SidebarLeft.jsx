import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import { LayoutDashboard, Target, Trophy, Award, Settings, LogOut } from 'lucide-react';

const SidebarLeft = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="clay-card h-full p-6 flex flex-col">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-16 h-16 rounded-full overflow-hidden shadow-clay-light border-4 border-white shrink-0">
          <img src="/clay_avatar.png" alt="User Avatar" className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="font-bold text-lg">{user?.username}</h3>
          <p className="text-sm text-gray-500">Level {user?.currentLevel}</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        <Link to="/dashboard" className="flex items-center space-x-3 p-3 rounded-clay hover:bg-white/50 transition-colors text-primary font-medium">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>
        <Link to="/dashboard/progress" className="flex items-center space-x-3 p-3 rounded-clay hover:bg-white/50 transition-colors text-gray-600">
          <Target size={20} />
          <span>My Progress</span>
        </Link>
        <Link to="/dashboard/leaderboard" className="flex items-center space-x-3 p-3 rounded-clay hover:bg-white/50 transition-colors text-gray-600">
          <Trophy size={20} />
          <span>Leaderboard</span>
        </Link>
        <Link to="/dashboard/achievements" className="flex items-center space-x-3 p-3 rounded-clay hover:bg-white/50 transition-colors text-gray-600">
          <Award size={20} />
          <span>Achievements</span>
        </Link>
        <Link to="/dashboard/settings" className="flex items-center space-x-3 p-3 rounded-clay hover:bg-white/50 transition-colors text-gray-600">
          <Settings size={20} />
          <span>Settings</span>
        </Link>
        {user?.isAdmin && (
           <Link to="/admin" className="flex items-center space-x-3 p-3 rounded-clay hover:bg-white/50 transition-colors text-gray-600">
             <Settings size={20} />
             <span>Admin Panel</span>
           </Link>
        )}
      </nav>

      <div className="mt-auto">
        <button onClick={handleLogout} className="flex items-center space-x-3 p-3 rounded-clay hover:bg-red-50 text-danger transition-colors w-full text-left font-medium">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SidebarLeft;
