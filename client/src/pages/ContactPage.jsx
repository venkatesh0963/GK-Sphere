import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background-light p-4 sm:p-8">
      <nav className="mb-6 sm:mb-10 max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center space-x-1.5 text-primary font-bold hover:underline text-sm">
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
      </nav>
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6 sm:gap-8">
        <div className="clay-card p-6 sm:p-8 flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-6 font-['Outfit']">Contact Us</h1>
          <form className="space-y-4">
            <input type="text" placeholder="Name" className="clay-input w-full text-sm sm:text-base" />
            <input type="email" placeholder="Email" className="clay-input w-full text-sm sm:text-base" />
            <input type="text" placeholder="Subject" className="clay-input w-full text-sm sm:text-base" />
            <textarea placeholder="Message" className="clay-input w-full h-32 resize-none text-sm sm:text-base"></textarea>
            <button className="clay-btn-primary w-full">Send Message</button>
          </form>
        </div>
        <div className="clay-card p-6 sm:p-8 flex-1 flex flex-col justify-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 font-['Outfit']">Reach Out</h2>
          <p className="mb-2 text-sm sm:text-base text-gray-700"><strong>Email:</strong> hello@gksphere.com</p>
          <p className="mb-2 text-sm sm:text-base text-gray-700"><strong>Phone:</strong> +1 (555) 123-4567</p>
          <p className="mb-6 text-sm sm:text-base text-gray-700"><strong>Address:</strong> 123 Knowledge Ave, Tech City</p>
          <div className="bg-gray-200 h-40 sm:h-48 rounded-clay flex items-center justify-center shadow-clay-light-inset text-sm text-gray-500">
            <span>Google Maps Placeholder</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
