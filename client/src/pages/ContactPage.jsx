import React from 'react';
import { Link } from 'react-router-dom';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background-light p-8">
      <nav className="mb-12">
        <Link to="/" className="text-primary font-bold hover:underline">&larr; Back to Home</Link>
      </nav>
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
        <div className="clay-card p-8 flex-1">
          <h1 className="text-3xl font-bold text-primary mb-6">Contact Us</h1>
          <form className="space-y-4">
            <input type="text" placeholder="Name" className="clay-input w-full" />
            <input type="email" placeholder="Email" className="clay-input w-full" />
            <input type="text" placeholder="Subject" className="clay-input w-full" />
            <textarea placeholder="Message" className="clay-input w-full h-32 resize-none"></textarea>
            <button className="clay-btn-primary w-full">Send Message</button>
          </form>
        </div>
        <div className="clay-card p-8 flex-1 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4">Reach Out</h2>
          <p className="mb-2"><strong>Email:</strong> hello@gkbyte.com</p>
          <p className="mb-2"><strong>Phone:</strong> +1 (555) 123-4567</p>
          <p className="mb-6"><strong>Address:</strong> 123 Knowledge Ave, Tech City</p>
          <div className="bg-gray-200 h-48 rounded-clay flex items-center justify-center shadow-clay-light-inset">
            <span className="text-gray-500">Google Maps Placeholder</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
