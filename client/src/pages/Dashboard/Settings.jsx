import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSettings, deleteAccount } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { Settings as SettingsIcon, AlertTriangle, Check, Crown } from 'lucide-react';

const Settings = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: user.username, password: '' });
  const [saveStatus, setSaveStatus] = useState('');

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

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      dispatch(deleteAccount());
      navigate('/');
    }
  };

  return (
    <div className="clay-card h-full p-6 overflow-y-auto">
      <div className="flex items-center space-x-3 mb-8">
        <SettingsIcon className="text-primary" size={28} />
        <h2 className="text-3xl font-bold text-primary font-['Outfit']">Account Settings</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Profile Settings */}
        <div className="clay-card p-6 bg-white/50">
          <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
          {saveStatus && <p className="text-success mb-4 flex items-center"><Check size={16} className="mr-1"/> {saveStatus}</p>}
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block mb-2 font-medium text-gray-600 text-sm">Username</label>
              <input type="text" name="username" value={formData.username} onChange={onChange} className="clay-input w-full" />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-600 text-sm">New Password</label>
              <input type="password" name="password" value={formData.password} onChange={onChange} className="clay-input w-full" placeholder="Leave blank to keep same" />
            </div>
            <button type="submit" className="clay-btn-primary w-full mt-4">Save Changes</button>
          </form>
        </div>

        {/* Subscription Plans */}
        <div className="clay-card p-6 bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
          <div className="flex items-center space-x-2 mb-4">
            <Crown className="text-primary" size={24} />
            <h3 className="text-xl font-bold text-primary">Subscription Plan</h3>
          </div>
          <div className="p-4 bg-white rounded-clay shadow-sm mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-gray-800">Free Tier</span>
              <span className="bg-success/20 text-success text-xs font-bold px-2 py-1 rounded-full">Current</span>
            </div>
            <p className="text-sm text-gray-600">Access to 10 basic levels and standard leaderboards.</p>
          </div>
          
          <div className="p-4 bg-primary text-white rounded-clay shadow-clay-primary relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-xl">Pro Tier</span>
                <span className="font-bold text-lg">$4.99/mo</span>
              </div>
              <p className="text-sm opacity-90 mb-4">Unlock all 100+ levels, exclusive avatar frames, and detailed analytics.</p>
              <button className="bg-white text-primary font-bold py-2 px-4 rounded-full w-full hover:bg-gray-100 transition">Upgrade to Pro</button>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="mt-8 clay-card p-6 bg-red-50 border border-red-100">
        <h3 className="text-xl font-bold text-danger flex items-center mb-4"><AlertTriangle className="mr-2" /> Danger Zone</h3>
        <p className="text-gray-600 mb-4 text-sm">Once you delete your account, there is no going back. Please be certain.</p>
        <button onClick={handleDelete} className="bg-danger text-white px-6 py-2 rounded-clay shadow-md hover:bg-red-600 transition font-medium">Delete Account</button>
      </div>

    </div>
  );
};

export default Settings;
