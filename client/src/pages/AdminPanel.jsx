import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const AdminPanel = () => {
  return (
    <div className="min-h-screen bg-background-light p-4 sm:p-8">
      <nav className="mb-6 sm:mb-8 max-w-6xl mx-auto">
        <Link to="/dashboard" className="inline-flex items-center space-x-1.5 text-primary font-bold hover:underline text-sm">
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </Link>
      </nav>
      <div className="clay-card p-6 sm:p-8 max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-4 font-['Outfit']">Admin Dashboard</h1>
        <p className="text-gray-600 text-sm sm:text-base">Admin features (Question Management, User Analytics) are active. You have full administrator access.</p>
      </div>
    </div>
  );
};

export default AdminPanel;
