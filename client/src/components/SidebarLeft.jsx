import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../store/authSlice';
import { LayoutDashboard, Target, Trophy, Award, Settings, LogOut, X, Shield } from 'lucide-react';

const SidebarLeft = ({ onClose }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    if (onClose) onClose();
    dispatch(logout());
    navigate('/');
  };

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { to: '/dashboard/progress', label: 'My Progress', icon: Target },
    { to: '/dashboard/leaderboard', label: 'Leaderboard', icon: Trophy },
    { to: '/dashboard/achievements', label: 'Achievements', icon: Award },
    { to: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (item) => {
    if (item.exact) {
      return location.pathname === item.to;
    }
    return location.pathname.startsWith(item.to);
  };

  return (
    <div className="clay-card h-full p-5 sm:p-6 flex flex-col overflow-y-auto">
      {/* Top Header & User Info */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200/50">
        <div className="flex items-center space-x-3 min-w-0">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shadow-clay-light border-2 border-white shrink-0 bg-primary/10">
            <img src="/clay_avatar.png" alt="User Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-base sm:text-lg truncate text-gray-800">{user?.username}</h3>
            <p className="text-xs sm:text-sm text-primary font-semibold">Level {user?.currentLevel || 1}</p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors md:hidden shrink-0"
            aria-label="Close Sidebar"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1.5 sm:space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => onClose && onClose()}
              className={`flex items-center space-x-3 px-3.5 py-2.5 sm:py-3 rounded-clay transition-all duration-200 ${
                active
                  ? 'bg-primary text-white shadow-clay-primary font-semibold'
                  : 'text-gray-600 hover:text-primary hover:bg-white/60 font-medium'
              }`}
            >
              <Icon size={19} className="shrink-0" />
              <span className="truncate text-sm sm:text-base">{item.label}</span>
            </Link>
          );
        })}

        {user?.isAdmin && (
          <Link
            to="/admin"
            onClick={() => onClose && onClose()}
            className={`flex items-center space-x-3 px-3.5 py-2.5 sm:py-3 rounded-clay transition-all duration-200 ${
              location.pathname === '/admin'
                ? 'bg-primary text-white shadow-clay-primary font-semibold'
                : 'text-gray-600 hover:text-primary hover:bg-white/60 font-medium'
            }`}
          >
            <Shield size={19} className="shrink-0" />
            <span className="truncate text-sm sm:text-base">Admin Panel</span>
          </Link>
        )}
      </nav>

      {/* Logout Button */}
      <div className="mt-6 pt-4 border-t border-gray-200/50">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-3.5 py-2.5 sm:py-3 rounded-clay hover:bg-red-50 text-danger transition-colors w-full text-left font-medium text-sm sm:text-base"
        >
          <LogOut size={19} className="shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SidebarLeft;
