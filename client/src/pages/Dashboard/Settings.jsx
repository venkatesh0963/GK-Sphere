import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSettings, deleteAccount, togglePro } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { Settings as SettingsIcon, AlertTriangle, Check, Crown, Heart, Gem, Zap } from 'lucide-react';

const Settings = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: user.username, password: '' });
  const [saveStatus, setSaveStatus] = useState('');
  const [billingCycle, setBillingCycle] = useState('annual'); // 'monthly' | 'annual'

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    const dataToUpdate = {};
    if (formData.username !== user.username) dataToUpdate.username = formData.username;
    if (formData.password) dataToUpdate.password = formData.password;
    
    if (Object.keys(dataToUpdate).length > 0) {
      await dispatch(updateSettings(dataToUpdate));
      setFormData({ ...formData, password: '' });
      setSaveStatus('Settings updated successfully!');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handleTogglePro = async () => {
    await dispatch(togglePro());
    setSaveStatus(user.isPro ? 'Pro membership cancelled.' : '🎉 Upgraded to GKSphere Pro!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      dispatch(deleteAccount());
      navigate('/');
    }
  };

  return (
    <div className="clay-card h-full p-4 sm:p-6 overflow-y-auto">
      <div className="flex items-center space-x-3 mb-5 sm:mb-8">
        <SettingsIcon className="text-primary shrink-0" size={26} />
        <h2 className="text-2xl sm:text-3xl font-bold text-primary font-['Outfit']">Account Settings</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        
        {/* Profile Settings */}
        <div className="clay-card p-4 sm:p-6 bg-white/50 flex flex-col justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">Edit Profile</h3>
            {saveStatus && <p className="text-success mb-4 flex items-center text-sm font-semibold"><Check size={16} className="mr-1"/> {saveStatus}</p>}
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block mb-2 font-medium text-gray-600 text-sm">Username</label>
                <input type="text" name="username" value={formData.username} onChange={onChange} className="clay-input w-full text-sm sm:text-base" />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-600 text-sm">New Password</label>
                <input type="password" name="password" value={formData.password} onChange={onChange} className="clay-input w-full text-sm sm:text-base" placeholder="Leave blank to keep same" />
              </div>
              <button type="submit" className="clay-btn-primary w-full mt-4">Save Changes</button>
            </form>
          </div>
        </div>

        {/* Indian Rupee Affordable Subscription Plans */}
        <div className="clay-card p-4 sm:p-6 bg-gradient-to-br from-primary/10 via-purple-50 to-gold/10 border border-primary/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Crown className="text-primary" size={24} />
                <h3 className="text-lg sm:text-xl font-bold text-primary font-['Outfit']">Pro Subscriptions</h3>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                INR (₹) Pricing
              </span>
            </div>

            {/* Plan Switcher: Monthly vs Annual */}
            {!user.isPro && (
              <div className="grid grid-cols-2 gap-2 p-1 bg-white/70 rounded-2xl mb-4 border border-gray-200">
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    billingCycle === 'monthly'
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Monthly (₹99)
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('annual')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1 ${
                    billingCycle === 'annual'
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span>Annual (₹499)</span>
                  <span className="text-[9px] bg-gold text-yellow-950 font-black px-1.5 py-0.2 rounded-full">
                    -58%
                  </span>
                </button>
              </div>
            )}

            {/* Free Tier Card */}
            <div className={`p-3.5 rounded-clay shadow-sm mb-3 border transition-all ${!user.isPro ? 'bg-white border-primary/30 ring-2 ring-primary/20' : 'bg-white/60 border-transparent opacity-70'}`}>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-gray-800 text-sm">Free Learner</span>
                  <span className="text-xs font-bold text-gray-500">₹0 / month</span>
                </div>
                {!user.isPro && (
                  <span className="bg-success/20 text-success text-[10px] font-extrabold px-2 py-0.5 rounded-full">Current Plan</span>
                )}
              </div>
              <p className="text-xs text-gray-600">5 Hearts max (1 heart restored per 4 hours) & standard XP.</p>
            </div>
            
            {/* Pro Tier Card with Affordable INR Pricing */}
            <div className={`p-4 rounded-clay shadow-clay-primary relative overflow-hidden transition-all ${user.isPro ? 'bg-gradient-to-r from-primary to-purple-700 text-white ring-2 ring-gold/50' : 'bg-gradient-to-br from-primary to-primary-dark text-white'}`}>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="font-bold text-base sm:text-lg">GKSphere Pro</span>
                      <Crown size={17} className="text-gold fill-gold" />
                    </div>
                    <span className="text-[11px] text-purple-100">
                      {billingCycle === 'annual' ? 'Billed annually at ₹499 (just ₹41/mo)' : 'Flexible month-to-month'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-xl sm:text-2xl">
                      {billingCycle === 'annual' ? '₹499' : '₹99'}
                    </span>
                    <span className="text-xs opacity-90 block">
                      {billingCycle === 'annual' ? '/ year' : '/ month'}
                    </span>
                  </div>
                </div>

                <ul className="text-xs space-y-1.5 opacity-95 my-3">
                  <li className="flex items-center space-x-1.5">
                    <Heart size={13} className="fill-white" />
                    <span><strong>Unlimited Hearts (❤️ ∞)</strong> — practice non-stop</span>
                  </li>
                  <li className="flex items-center space-x-1.5">
                    <Gem size={13} className="fill-white" />
                    <span><strong>2x Gem Rewards (💎)</strong> on every completed quiz</span>
                  </li>
                  <li className="flex items-center space-x-1.5">
                    <Zap size={13} className="fill-white" />
                    <span><strong>Free Monthly Streak Freeze</strong> shields</span>
                  </li>
                </ul>

                <button
                  onClick={handleTogglePro}
                  className="bg-white text-primary font-bold py-2.5 px-4 rounded-full w-full hover:bg-gray-100 transition text-sm shadow-md mt-1 active:scale-[0.99]"
                >
                  {user.isPro
                    ? 'Cancel Pro Membership'
                    : `Upgrade for ${billingCycle === 'annual' ? '₹499 / Year (Best Value)' : '₹99 / Month'}`}
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Danger Zone */}
      <div className="mt-6 sm:mt-8 clay-card p-4 sm:p-6 bg-red-50 border border-red-100">
        <h3 className="text-lg sm:text-xl font-bold text-danger flex items-center mb-3"><AlertTriangle className="mr-2" size={20} /> Danger Zone</h3>
        <p className="text-gray-600 mb-4 text-xs sm:text-sm">Once you delete your account, there is no going back. Please be certain.</p>
        <button onClick={handleDelete} className="bg-danger text-white px-5 sm:px-6 py-2 rounded-clay shadow-md hover:bg-red-600 transition font-medium text-sm">Delete Account</button>
      </div>

    </div>
  );
};

export default Settings;
