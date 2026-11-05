import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background-light p-4 sm:p-8">
      <nav className="mb-6 sm:mb-10 max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center space-x-1.5 text-primary font-bold hover:underline text-sm">
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
      </nav>
      <div className="max-w-4xl mx-auto clay-card p-6 sm:p-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4 sm:mb-6 font-['Outfit']">About GKSphere</h1>
        <p className="text-base sm:text-lg mb-6 leading-relaxed text-gray-700">
          GKSphere is a gamified General Knowledge platform built to make learning engaging and consistent.
          Our mission is to empower individuals to learn "One Byte at a Time" through daily challenges and an interactive level-based progression system.
        </p>
        <h2 className="text-xl sm:text-2xl font-bold mt-8 mb-4 text-gray-800">Our Philosophy</h2>
        <p className="mb-6 text-sm sm:text-base text-gray-600 leading-relaxed">
          We believe that learning is most effective when it is fun and habit-forming. By combining a skill-tree progression model with daily streaks, we encourage users to keep their curiosity alive.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
