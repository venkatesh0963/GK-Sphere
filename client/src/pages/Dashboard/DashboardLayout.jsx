import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import SidebarLeft from '../../components/SidebarLeft';
import SidebarRight from '../../components/SidebarRight';
import HeartsModal from '../../components/HeartsModal';
import ShopModal from '../../components/ShopModal';
import { fetchEconomy } from '../../store/authSlice';
import { Menu, X, Flame, Sparkles, Heart, Gem, Zap, ShoppingBag, Crown } from 'lucide-react';

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isMobileStatsOpen, setIsMobileStatsOpen] = useState(false);
  const [isHeartsModalOpen, setIsHeartsModalOpen] = useState(false);
  const [isShopModalOpen, setIsShopModalOpen] = useState(false);
  const [doubleXpSecs, setDoubleXpSecs] = useState(user?.doubleXpSecondsLeft || 0);

  // Sync economy status on load
  useEffect(() => {
    dispatch(fetchEconomy());
  }, [dispatch]);

  // Sync double XP timer
  useEffect(() => {
    setDoubleXpSecs(user?.doubleXpSecondsLeft || 0);
  }, [user?.doubleXpSecondsLeft]);

  useEffect(() => {
    if (doubleXpSecs <= 0) return;
    const interval = setInterval(() => {
      setDoubleXpSecs((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [doubleXpSecs]);

  // Close drawers when route changes
  useEffect(() => {
    setIsMobileNavOpen(false);
    setIsMobileStatsOpen(false);
  }, [location.pathname]);

  // Handle ESC key to close mobile drawers & modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMobileNavOpen(false);
        setIsMobileStatsOpen(false);
        setIsHeartsModalOpen(false);
        setIsShopModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!user) {
    return <Navigate to="/" />;
  }

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-background-light overflow-hidden">
      
      {/* Top Mobile Bar (visible on smaller screens) */}
      <header className="flex md:hidden items-center justify-between px-3 py-2 bg-white/95 backdrop-blur-md border-b border-gray-200/60 z-30 shrink-0 shadow-sm gap-1">
        {/* Open Sidebar Button */}
        <button
          onClick={() => setIsMobileNavOpen(true)}
          className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-clay bg-primary/10 text-primary hover:bg-primary/20 active:scale-95 transition-all shrink-0"
          aria-label="Open Sidebar Navigation"
        >
          <Menu size={18} />
          <span className="text-xs font-bold font-['Outfit']">Menu</span>
        </button>

        {/* Currency & Hearts Pills (Center) */}
        <div className="flex items-center space-x-1.5">
          {/* Hearts Pill */}
          <button
            onClick={() => setIsHeartsModalOpen(true)}
            className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-extrabold border transition-all active:scale-95 ${
              user.isPro
                ? 'bg-purple-50 text-purple-700 border-purple-200'
                : (user.hearts ?? 5) === 0
                ? 'bg-red-100 text-red-600 border-red-300 animate-pulse'
                : 'bg-red-50 text-danger border-red-200/70'
            }`}
            title="Hearts / Lives"
          >
            <Heart size={14} className="fill-danger text-danger" />
            <span>{user.isPro ? '∞' : `${user.hearts ?? 5}`}</span>
          </button>

          {/* Gems Pill */}
          <button
            onClick={() => setIsShopModalOpen(true)}
            className="flex items-center space-x-1 px-2 py-1 rounded-full bg-cyan-50 border border-cyan-200/80 text-cyan-600 font-extrabold text-xs active:scale-95"
            title="Gem Store"
          >
            <Gem size={14} className="fill-cyan-400 text-cyan-500" />
            <span>{user.gems ?? 100}</span>
          </button>

          {/* Double XP Pill (if active) */}
          {doubleXpSecs > 0 && (
            <div className="hidden xs:flex items-center space-x-0.5 px-1.5 py-0.5 rounded-full bg-yellow-100 text-yellow-800 text-[10px] font-extrabold">
              <Zap size={12} className="fill-yellow-500 text-yellow-600" />
              <span>{formatTimer(doubleXpSecs)}</span>
            </div>
          )}
        </div>

        {/* Streak Pill / Open Stats Drawer Button */}
        <button
          onClick={() => setIsMobileStatsOpen(true)}
          className="flex items-center space-x-1 px-2 py-1 rounded-clay bg-orange-50 border border-orange-200/60 text-orange-600 hover:bg-orange-100 active:scale-95 transition-all text-xs font-bold shrink-0"
          aria-label="Open Daily Stats"
          title="View Daily Progress"
        >
          <Flame size={14} className="text-orange-500 fill-orange-500" />
          <span>{user?.streak || 0}d</span>
        </button>
      </header>

      {/* Desktop Left Sidebar */}
      <div className="w-60 lg:w-64 flex-shrink-0 p-3 lg:p-4 hidden md:block h-full">
        <SidebarLeft />
      </div>

      {/* Center Main Content */}
      <main className="flex-1 p-2 sm:p-3 lg:p-4 relative overflow-hidden flex flex-col h-[calc(100dvh-51px)] md:h-screen">
        
        {/* Desktop Top Currency Bar */}
        <div className="hidden md:flex items-center justify-between px-4 py-2 mb-2 clay-card bg-white/70 backdrop-blur-md rounded-2xl shrink-0">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-base tracking-tight text-deep-blue font-['Outfit']">
              GK<span className="text-primary">Sphere</span>
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
              Level {user?.currentLevel || 1}
            </span>
            {user?.isPro && (
              <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-gold/20 text-yellow-800 text-xs font-extrabold border border-gold/40">
                <Crown size={12} className="text-gold fill-gold" />
                <span>PRO</span>
              </span>
            )}
          </div>

          <div className="flex items-center space-x-3">
            {/* Double XP Potion Active Badge */}
            {doubleXpSecs > 0 && (
              <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-yellow-100 border border-yellow-300 text-yellow-800 text-xs font-extrabold animate-pulse">
                <Zap size={14} className="fill-yellow-500 text-yellow-600" />
                <span>2x XP ({formatTimer(doubleXpSecs)})</span>
              </div>
            )}

            {/* Streak Counter */}
            <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-xs font-extrabold">
              <Flame size={14} className="fill-orange-500 text-orange-500" />
              <span>{user?.streak || 0} Day Streak</span>
            </div>

            {/* Hearts Pill */}
            <button
              onClick={() => setIsHeartsModalOpen(true)}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-full border text-xs font-extrabold transition-all hover:scale-105 active:scale-95 shadow-sm ${
                user.isPro
                  ? 'bg-purple-50 text-purple-700 border-purple-200'
                  : (user.hearts ?? 5) === 0
                  ? 'bg-red-100 text-red-600 border-red-300 animate-pulse'
                  : 'bg-red-50 text-danger border-red-200'
              }`}
              title="Click to manage hearts"
            >
              <Heart size={15} className="fill-danger text-danger" />
              <span>{user.isPro ? 'Unlimited Hearts' : `${user.hearts ?? 5}/5 Hearts`}</span>
            </button>

            {/* Gems Pill */}
            <button
              onClick={() => setIsShopModalOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-600 text-xs font-extrabold transition-all hover:scale-105 active:scale-95 shadow-sm"
              title="Click to open Gem Store"
            >
              <Gem size={15} className="fill-cyan-400 text-cyan-500" />
              <span>{user.gems ?? 100}</span>
            </button>

            {/* Shop Button */}
            <button
              onClick={() => setIsShopModalOpen(true)}
              className="flex items-center space-x-1 px-3 py-1 rounded-full bg-primary hover:bg-primary-dark text-white text-xs font-bold transition-all shadow-sm active:scale-95"
            >
              <ShoppingBag size={13} />
              <span>Store</span>
            </button>
          </div>
        </div>

        {/* Child Page Outlet */}
        <div className="clay-card w-full flex-1 p-2 sm:p-4 overflow-hidden flex flex-col relative min-h-0">
          <Outlet />
        </div>
      </main>

      {/* Desktop Right Sidebar */}
      <div className="w-72 flex-shrink-0 p-3 lg:p-4 hidden lg:block h-full">
        <SidebarRight
          onOpenHearts={() => setIsHeartsModalOpen(true)}
          onOpenShop={() => setIsShopModalOpen(true)}
        />
      </div>

      {/* Mobile Navigation Sidebar Drawer (< md screens) */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          isMobileNavOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isMobileNavOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileNavOpen(false)}
        />
        
        {/* Drawer Content */}
        <div
          className={`absolute top-0 bottom-0 left-0 w-[290px] max-w-[85vw] h-full p-3 sm:p-4 shadow-2xl transition-transform duration-300 ease-in-out bg-background-light flex flex-col ${
            isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <SidebarLeft onClose={() => setIsMobileNavOpen(false)} />
        </div>
      </div>

      {/* Mobile Daily Stats Drawer (< lg screens) */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          isMobileStatsOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isMobileStatsOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileStatsOpen(false)}
        />
        
        {/* Drawer Content */}
        <div
          className={`absolute top-0 bottom-0 right-0 w-[310px] max-w-[88vw] h-full p-3 sm:p-4 shadow-2xl transition-transform duration-300 ease-in-out bg-background-light flex flex-col ${
            isMobileStatsOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="clay-card h-full p-4 flex flex-col relative overflow-y-auto">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200/50">
              <h3 className="font-bold text-lg text-primary flex items-center">
                <Sparkles size={18} className="mr-1.5 text-gold fill-gold" /> Daily Progress
              </h3>
              <button
                onClick={() => setIsMobileStatsOpen(false)}
                className="p-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                aria-label="Close stats"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1">
              <SidebarRight
                onOpenHearts={() => {
                  setIsMobileStatsOpen(false);
                  setIsHeartsModalOpen(true);
                }}
                onOpenShop={() => {
                  setIsMobileStatsOpen(false);
                  setIsShopModalOpen(true);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hearts Modal */}
      <HeartsModal
        isOpen={isHeartsModalOpen}
        onClose={() => setIsHeartsModalOpen(false)}
        onOpenShop={() => {
          setIsHeartsModalOpen(false);
          setIsShopModalOpen(true);
        }}
      />

      {/* Gem Store Modal */}
      <ShopModal
        isOpen={isShopModalOpen}
        onClose={() => setIsShopModalOpen(false)}
      />

    </div>
  );
};

export default DashboardLayout;
