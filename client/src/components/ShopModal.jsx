import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { buyShopItem, togglePro } from '../store/authSlice';
import { Gem, Heart, Snowflake, Zap, Crown, X, Check, ShoppingBag, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const ShopModal = ({ isOpen, onClose }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [feedback, setFeedback] = useState('');
  const [doubleXpSeconds, setDoubleXpSeconds] = useState(user?.doubleXpSecondsLeft || 0);

  useEffect(() => {
    setDoubleXpSeconds(user?.doubleXpSecondsLeft || 0);
  }, [user?.doubleXpSecondsLeft]);

  useEffect(() => {
    if (doubleXpSeconds <= 0) return;
    const interval = setInterval(() => {
      setDoubleXpSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [doubleXpSeconds]);

  if (!isOpen || !user) return null;

  const handleBuy = async (itemId, cost, title) => {
    if ((user.gems ?? 0) < cost) {
      setFeedback(`Not enough gems for ${title}! Complete levels to earn more.`);
      setTimeout(() => setFeedback(''), 3000);
      return;
    }

    const res = await dispatch(buyShopItem(itemId));
    if (res.type === 'auth/buyShopItem/fulfilled') {
      setFeedback(`Purchased ${title}! 🎉`);
      setTimeout(() => setFeedback(''), 2500);
    }
  };

  const handleTogglePro = async () => {
    await dispatch(togglePro());
    setFeedback(user.isPro ? 'Pro deactivated.' : '🎉 GKSphere Pro Activated! Unlimited hearts.');
    setTimeout(() => setFeedback(''), 2500);
  };

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const shopItems = [
    {
      id: 'hearts_refill',
      title: 'Full Hearts Refill',
      desc: 'Instantly restore all 5 hearts to keep learning without interruption.',
      icon: Heart,
      iconColor: 'text-danger fill-danger',
      iconBg: 'bg-red-50 border-red-100',
      cost: 50,
      badge: `${user.hearts ?? 5}/5 Hearts`,
      canBuy: (user.hearts ?? 5) < 5 && !user.isPro,
      disabledReason: user.isPro ? 'Unlimited (Pro)' : (user.hearts >= 5 ? 'Already Full' : null)
    },
    {
      id: 'streak_freeze',
      title: 'Streak Freeze Shield',
      desc: 'Protects your streak if you miss a day. Consumed automatically when needed.',
      icon: Snowflake,
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-50 border-blue-100',
      cost: 100,
      badge: `${user.streakFreezes ?? 0} Owned`,
      canBuy: true,
      disabledReason: null
    },
    {
      id: 'double_xp',
      title: '15-Min Double XP Potion',
      desc: 'Earn 2x XP on every level you complete for the next 15 minutes.',
      icon: Zap,
      iconColor: 'text-yellow-500 fill-yellow-500',
      iconBg: 'bg-yellow-50 border-yellow-100',
      cost: 75,
      badge: doubleXpSeconds > 0 ? `Active: ${formatTimer(doubleXpSeconds)}` : 'Ready',
      canBuy: true,
      disabledReason: null
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="clay-card relative bg-white w-full max-w-lg p-6 sm:p-7 z-10 overflow-hidden shadow-2xl rounded-[28px] max-h-[90vh] flex flex-col"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4 shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 shadow-inner">
              <ShoppingBag size={22} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-gray-800">Gem Store</h2>
              <p className="text-xs text-gray-500">Power-ups & streak protection</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Gem Balance */}
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 font-extrabold text-sm shadow-sm">
              <Gem size={16} className="fill-cyan-500 text-cyan-500" />
              <span>{user.gems ?? 100}</span>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Feedback message */}
        {feedback && (
          <div className="mb-4 p-2.5 rounded-xl bg-primary/10 text-primary text-xs font-bold text-center flex items-center justify-center space-x-1.5 shrink-0">
            <ShieldCheck size={16} />
            <span>{feedback}</span>
          </div>
        )}

        {/* Items List */}
        <div className="space-y-3.5 overflow-y-auto pr-1 flex-1">
          {shopItems.map((item) => {
            const Icon = item.icon;
            const notEnoughGems = (user.gems ?? 0) < item.cost;
            const isDisabled = Boolean(item.disabledReason) || notEnoughGems;

            return (
              <div
                key={item.id}
                className="clay-card p-4 bg-white/80 border border-gray-100 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-primary/20 transition-all"
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center shrink-0 ${item.iconBg}`}>
                    <Icon size={22} className={item.iconColor} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-bold text-sm text-gray-800">{item.title}</h4>
                      {item.badge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 font-semibold text-gray-600">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleBuy(item.id, item.cost, item.title)}
                  disabled={isDisabled}
                  className={`px-4 py-2 rounded-full text-xs font-bold flex items-center justify-center space-x-1.5 shrink-0 transition-all ${
                    item.disabledReason
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : notEnoughGems
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                      : 'bg-primary hover:bg-primary-dark text-white shadow-md active:scale-95'
                  }`}
                >
                  {item.disabledReason ? (
                    <span>{item.disabledReason}</span>
                  ) : (
                    <>
                      <span>{item.cost}</span>
                      <Gem size={14} className="fill-white" />
                      <span>Buy</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}

          {/* GKSphere Pro Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/15 via-purple-100/50 to-gold/15 border-2 border-primary/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
            <div className="flex items-start space-x-3">
              <div className="w-11 h-11 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-clay-primary">
                <Crown size={22} className="text-gold fill-gold" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-bold text-sm text-gray-900">GKSphere Pro Pass</h4>
                  {user.isPro ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/20 text-success font-extrabold">ACTIVE</span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold/20 text-yellow-800 font-extrabold">₹99/mo · ₹499/yr</span>
                  )}
                </div>
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                  Unlimited Hearts, Ad-free learning, 2x Gem bonuses, and special Golden avatar!
                </p>
              </div>
            </div>

            <button
              onClick={handleTogglePro}
              className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all shadow-md ${
                user.isPro
                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  : 'bg-primary hover:bg-primary-dark text-white'
              }`}
            >
              {user.isPro ? 'Deactivate Pro' : 'Get Pro (from ₹99)'}
            </button>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default ShopModal;
