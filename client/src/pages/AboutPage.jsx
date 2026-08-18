import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background-light p-8">
      <nav className="mb-12">
        <Link to="/" className="text-primary font-bold hover:underline">&larr; Back to Home</Link>
      </nav>
      <div className="max-w-4xl mx-auto clay-card p-12">
        <h1 className="text-4xl font-bold text-primary mb-6">About GKSphere</h1>
        <p className="text-lg mb-6 leading-relaxed">
          GKSphere is a gamified General Knowledge platform built to make learning engaging and consistent.
          Our mission is to empower individuals to learn "One Byte at a Time" through daily challenges and an interactive level-based progression system.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Our Philosophy</h2>
        <p className="mb-6">
          We believe that learning is most effective when it is fun and habit-forming. By combining a skill-tree progression model with daily streaks, we encourage users to keep their curiosity alive.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
