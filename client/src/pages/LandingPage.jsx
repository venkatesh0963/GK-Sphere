import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layers, Flame, Zap, BarChart2, Trophy, Award, Play, Menu, X, LogIn, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen font-['Outfit'] bg-light-bg overflow-x-hidden">
      
      {/* Top Section (Dark Blue) */}
      <div className="bg-deep-blue text-white rounded-b-[40px] sm:rounded-b-[60px] pb-24 sm:pb-32 relative z-10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
        
        {/* Background Glowing Orbs & Stars */}
        <div className="absolute top-[-20%] left-[-10%] w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-primary/40 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none"></div>
        <div className="absolute top-[20%] right-[-10%] w-[260px] sm:w-[400px] h-[260px] sm:h-[400px] bg-secondary/30 rounded-full blur-[90px] sm:blur-[100px] pointer-events-none"></div>
        
        <svg className="absolute top-[15%] left-[10%] w-6 h-6 text-gold animate-pulse opacity-80" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z"/></svg>
        <svg className="absolute top-[40%] left-[5%] w-4 h-4 text-white opacity-40" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z"/></svg>
        <svg className="absolute top-[20%] right-[30%] w-5 h-5 text-secondary animate-pulse opacity-60" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z"/></svg>
        <svg className="absolute top-[50%] right-[10%] w-8 h-8 text-primary opacity-50" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z"/></svg>

        {/* Navbar */}
        <nav className="flex justify-between items-center py-5 sm:py-6 px-4 sm:px-8 md:px-16 relative z-20">
          <Link to="/" className="flex flex-col font-bold text-2xl leading-tight tracking-tight">
            <span>GK</span>
            <span>Sphere</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
            <a href="#" className="px-4 py-1 bg-white/20 rounded-full text-sm font-bold transition-colors">Home</a>
            <a href="#features" className="px-4 py-1 hover:bg-white/10 rounded-full text-sm font-medium transition-colors text-gray-300">Features</a>
            <Link to="/about" className="px-4 py-1 hover:bg-white/10 rounded-full text-sm font-medium transition-colors text-gray-300">About</Link>
            <Link to="/contact" className="px-4 py-1 hover:bg-white/10 rounded-full text-sm font-medium transition-colors text-gray-300">Contact</Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/login" className="px-5 py-2 rounded-full font-semibold text-sm hover:text-primary transition-colors text-gray-200">
              Log In
            </Link>
            <Link to="/signup" className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary transition-all px-6 py-2.5 rounded-full font-bold text-sm shadow-[0_0_20px_rgba(99,102,241,0.5)] border border-primary-light/30">
              Get Started
            </Link>
          </div>

          {/* Mobile Open Sidebar Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex md:hidden items-center space-x-2 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all"
            aria-label="Open Navigation Sidebar"
          >
            <Menu size={22} />
          </button>
        </nav>

        {/* Mobile Navigation Sidebar Drawer */}
        <div
          className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
            mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          aria-hidden={!mobileMenuOpen}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Sidebar Drawer */}
          <div
            className={`absolute top-0 bottom-0 right-0 w-[280px] max-w-[85vw] bg-deep-blue text-white p-6 shadow-2xl border-l border-white/10 flex flex-col transition-transform duration-300 ease-in-out ${
              mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* Drawer Header with Close Button */}
            <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
              <div className="font-bold text-xl leading-tight">
                <span>GK</span><span className="text-primary">Sphere</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
                aria-label="Close Navigation Sidebar"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="space-y-3 flex-1">
              <a
                href="#"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-2xl bg-white/10 font-bold text-white text-base"
              >
                Home
              </a>
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-2xl hover:bg-white/5 text-gray-300 font-medium text-base transition-colors"
              >
                Features
              </a>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-2xl hover:bg-white/5 text-gray-300 font-medium text-base transition-colors"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-2xl hover:bg-white/5 text-gray-300 font-medium text-base transition-colors"
              >
                Contact
              </Link>
            </div>

            {/* Bottom Auth Buttons */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center space-x-2 w-full py-3 rounded-2xl bg-white/10 hover:bg-white/20 font-semibold text-sm transition-colors"
              >
                <LogIn size={18} />
                <span>Log In</span>
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center space-x-2 w-full py-3 rounded-2xl bg-primary hover:bg-primary-dark font-bold text-sm shadow-lg shadow-primary/40 transition-colors"
              >
                <span>Get Started Free</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Area */}
        <main className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 md:px-20 mt-8 sm:mt-12">
          {/* Left Text */}
          <div className="md:w-1/2 z-10 relative text-center md:text-left">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight">
              Learn Daily. <br/>
              Excel <span className="text-gold">Globally.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 max-w-lg mx-auto md:mx-0 font-light leading-relaxed">
              Dive into smart GK questions, level up your knowledge and compete with the world.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-4 mb-8 sm:mb-10">
              <Link to="/signup" className="w-full sm:w-auto bg-primary hover:bg-primary-dark transition-colors px-8 py-3.5 rounded-full font-bold shadow-lg shadow-primary/40 flex items-center justify-center text-center">
                Start Your Journey <span className="ml-2">→</span>
              </Link>
              <a href="#features" className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-gray-500 hover:border-white transition-colors font-semibold text-center">
                Explore Features
              </a>
            </div>

            <div className="flex items-center justify-center md:justify-start space-x-4">
              <div className="flex -space-x-3 shrink-0">
                <img src="/clay_avatar.png" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-deep-blue bg-primary/20 object-cover" />
                <img src="/clay_avatar.png" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-deep-blue bg-secondary/20 object-cover opacity-90" />
                <img src="/clay_avatar.png" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-deep-blue bg-gold/20 object-cover opacity-80" />
                <img src="/clay_avatar.png" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-deep-blue bg-blue-400/20 object-cover opacity-70" />
              </div>
              <p className="text-xs sm:text-sm text-gray-300 leading-tight text-left">
                Join <span className="text-gold font-bold">50K+</span> learners worldwide<br/>and grow every day!
              </p>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center relative w-full">
            {/* Subtle glow behind image */}
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-[80px] sm:blur-[100px]"></div>
            <img 
              src="/hero-boy.png" 
              alt="3D Boy Learning" 
              className="w-full max-w-xs sm:max-w-md md:max-w-lg object-contain relative z-10 hover:scale-[1.02] transition-transform duration-700"
            />
          </div>
        </main>
      </div>

      {/* Stats Banner (Overlapping) */}
      <div className="relative z-20 flex justify-center -mt-12 sm:-mt-16 px-4">
        <div className="bg-white rounded-[28px] sm:rounded-[40px] shadow-2xl p-4 sm:p-6 w-full max-w-6xl grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-nowrap justify-between items-center gap-4">
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-inner shrink-0"><Layers size={22} fill="currentColor" /></div>
            <div><p className="font-bold text-gray-800 text-sm sm:text-base">100+</p><p className="text-[11px] sm:text-xs text-gray-500 font-medium">Interactive Levels</p></div>
          </div>
          <div className="hidden lg:block w-px h-10 bg-gray-200"></div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-teal-100 flex items-center justify-center text-teal-500 shadow-inner shrink-0"><Flame size={22} fill="currentColor" /></div>
            <div><p className="font-bold text-gray-800 text-sm sm:text-base">Daily</p><p className="text-[11px] sm:text-xs text-gray-500 font-medium">Streaks</p></div>
          </div>
          <div className="hidden lg:block w-px h-10 bg-gray-200"></div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-yellow-100 flex items-center justify-center text-yellow-500 shadow-inner shrink-0"><Zap size={22} fill="currentColor" /></div>
            <div><p className="font-bold text-gray-800 text-sm sm:text-base">Instant</p><p className="text-[11px] sm:text-xs text-gray-500 font-medium">Sols</p></div>
          </div>
          <div className="hidden lg:block w-px h-10 bg-gray-200"></div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 shadow-inner shrink-0"><BarChart2 size={22} /></div>
            <div><p className="font-bold text-gray-800 text-sm sm:text-base">Smart</p><p className="text-[11px] sm:text-xs text-gray-500 font-medium">Progress Tracking</p></div>
          </div>
          <div className="hidden lg:block w-px h-10 bg-gray-200"></div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-red-100 flex items-center justify-center text-red-500 shadow-inner shrink-0"><Trophy size={22} fill="currentColor" /></div>
            <div><p className="font-bold text-gray-800 text-sm sm:text-base">Global</p><p className="text-[11px] sm:text-xs text-gray-500 font-medium">Leaderboard</p></div>
          </div>
          <div className="hidden lg:block w-px h-10 bg-gray-200"></div>

          <div className="flex items-center space-x-3 col-span-2 sm:col-span-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-green-100 flex items-center justify-center text-green-800 shadow-inner shrink-0"><Award size={22} fill="currentColor" /></div>
            <div><p className="font-bold text-gray-800 text-sm sm:text-base">Achievements</p><p className="text-[11px] sm:text-xs text-gray-800 font-medium">Badges</p></div>
          </div>

        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="pt-24 pb-32 px-4 md:px-8 relative flex flex-col items-center overflow-visible w-full max-w-[100vw]">
        
        <div className="text-center mb-16 max-w-2xl relative z-10">
          <span className="inline-block px-4 py-1 bg-white text-primary rounded-full text-xs font-bold tracking-widest shadow-sm mb-4">FEATURES</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-deep-blue">
            Everything you need to <br/>master GK, <span className="text-primary">every day.</span>
          </h2>
        </div>

        <div className="flex flex-row w-full max-w-[1920px] justify-between items-center gap-4 xl:gap-8">
          
          {/* Left Avatar */}
          <div className="hidden xl:flex flex-1 justify-start max-w-[500px] relative z-0">
             <img src="/side-girl.png" alt="Girl Learning" className="w-full object-contain pointer-events-none opacity-90 transform scale-[1.3] 2xl:scale-[1.5] origin-right transition-transform duration-700" />
          </div>

          {/* Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl relative z-10 w-full shrink-0 xl:shrink">
          
          <div className="bg-white rounded-[32px] p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
            <div className="w-32 h-32 mx-auto bg-primary text-white rounded-[32px] shadow-clay-primary-inset flex items-center justify-center text-5xl font-black mb-6 transform -rotate-3">100+</div>
            <h3 className="text-xl font-bold text-deep-blue mb-3">100+ Interactive Levels</h3>
            <p className="text-gray-500 text-sm leading-relaxed">From easy to expert - 100+ levels designed to challenge and grow your knowledge.</p>
          </div>

          <div className="bg-white rounded-[32px] p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
            <div className="w-32 h-32 mx-auto bg-white border-4 border-gray-100 text-orange-500 rounded-[32px] shadow-inner flex items-center justify-center mb-6">
              <Flame size={64} fill="currentColor" className="drop-shadow-md" />
            </div>
            <h3 className="text-xl font-bold text-deep-blue mb-3">Daily Streaks</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Keep your streak alive! Play daily, stay consistent and build a winning habit.</p>
          </div>

          <div className="bg-white rounded-[32px] p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
            <div className="w-32 h-32 mx-auto bg-primary text-yellow-400 rounded-full shadow-clay-primary flex items-center justify-center mb-6 relative">
              <div className="absolute inset-2 bg-deep-blue rounded-full opacity-10"></div>
              <Zap size={56} fill="currentColor" />
            </div>
            <h3 className="text-xl font-bold text-deep-blue mb-3">Instant Sols</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Get instant solutions and explanations to learn faster and remember better.</p>
          </div>

          <div className="bg-white rounded-[32px] p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
             <div className="w-32 h-32 mx-auto bg-blue-100 text-blue-600 rounded-[32px] shadow-inner flex items-center justify-center mb-6">
              <BarChart2 size={64} />
            </div>
            <h3 className="text-xl font-bold text-deep-blue mb-3">Smart Progress Tracking</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Track your performance, analyze your strengths and see how you improve over time.</p>
          </div>

          <div className="bg-white rounded-[32px] p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
            <div className="w-32 h-32 mx-auto flex items-end justify-center mb-6 space-x-1">
              <div className="w-8 h-12 bg-gray-200 rounded-t-lg flex items-center justify-center text-white font-bold bg-gray-400 shadow-inner">2</div>
              <div className="w-10 h-20 bg-gold rounded-t-lg flex items-center justify-center text-white font-bold shadow-inner">1</div>
              <div className="w-8 h-8 bg-orange-300 rounded-t-lg flex items-center justify-center text-white font-bold shadow-inner">3</div>
            </div>
            <h3 className="text-xl font-bold text-deep-blue mb-3">Global Leaderboard</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Compete with learners around the world and climb the ranks to be the best.</p>
          </div>

          <div className="bg-white rounded-[32px] p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
            <div className="w-32 h-32 mx-auto bg-primary text-gold rounded-[32px] shadow-clay-primary-inset flex items-center justify-center mb-6 relative transform rotate-3">
              <Award size={64} fill="currentColor" className="drop-shadow-lg" />
            </div>
            <h3 className="text-xl font-bold text-deep-blue mb-3">Achievements & Badges</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Earn badges, unlock achievements and showcase your GK mastery with pride.</p>
          </div>

          </div>

          {/* Right Avatar */}
          <div className="hidden xl:flex flex-1 justify-end max-w-[500px] relative z-0">
             <img src="/side-boy.png" alt="Boy Success" className="w-full object-contain pointer-events-none opacity-90 transform scale-[1.3] 2xl:scale-[1.5] origin-left transition-transform duration-700" />
          </div>

        </div>
      </section>

      {/* Bottom CTA & Footer Section */}
      <div className="bg-deep-blue text-white pt-20 relative overflow-hidden rounded-t-[60px] mt-10">
        
        {/* Background Glowing Orbs & Stars */}
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/30 rounded-full blur-[130px] pointer-events-none"></div>
        <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] bg-gold/10 rounded-full blur-[100px] pointer-events-none"></div>

        <svg className="absolute top-[15%] left-[20%] w-8 h-8 text-gold animate-pulse opacity-70" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z"/></svg>
        <svg className="absolute top-[40%] right-[15%] w-6 h-6 text-secondary opacity-60" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z"/></svg>

        {/* CTA */}
        <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between mb-20">
          <div className="md:w-1/3 flex justify-center mb-10 md:mb-0">
             <img src="/cta-trophy.png" alt="Trophy" className="w-64 object-contain drop-shadow-[0_20px_50px_rgba(251,191,36,0.3)] hover:-translate-y-4 transition-transform duration-700" />
          </div>
          
          <div className="md:w-1/3 text-center md:text-left mb-10 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">Small Steps Daily, <br/>Big Wins Forever.</h2>
            <p className="text-gray-400 mb-6 text-sm">Start your GK journey today and make every day count!</p>
            <Link to="/signup" className="inline-flex bg-primary hover:bg-primary-dark transition-colors px-6 py-3 rounded-full font-bold shadow-lg shadow-primary/40 items-center">
              Start Playing Now <span className="ml-2">→</span>
            </Link>
          </div>

          <div className="md:w-1/3 flex flex-col items-center md:items-end text-right">
            <div className="flex -space-x-3 mb-3">
              <img src="/clay_avatar.png" className="w-12 h-12 rounded-full border-2 border-deep-blue bg-primary/20 object-cover" />
              <img src="/clay_avatar.png" className="w-12 h-12 rounded-full border-2 border-deep-blue bg-secondary/20 object-cover opacity-90" />
              <img src="/clay_avatar.png" className="w-12 h-12 rounded-full border-2 border-deep-blue bg-gold/20 object-cover opacity-80" />
              <img src="/clay_avatar.png" className="w-12 h-12 rounded-full border-2 border-deep-blue bg-blue-400/20 object-cover opacity-70" />
              <img src="/clay_avatar.png" className="w-12 h-12 rounded-full border-2 border-deep-blue bg-purple-400/20 object-cover opacity-60" />
            </div>
            <div className="flex text-gold mb-1">
              {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
            </div>
            <p className="text-sm text-gray-400"><strong className="text-white">4.8/5</strong> from 50K+ learners</p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 pt-10 pb-6">
          <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex flex-col font-bold text-2xl leading-tight tracking-tight mb-4">
                <span>GK</span>
                <span>Sphere</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Your daily dose of knowledge. <br/>Learn. Compete. Grow. <br/>Every single day.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#levels" className="hover:text-white transition-colors">Levels</a></li>
                <li><a href="#leaderboard" className="hover:text-white transition-colors">Leaderboard</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#achievements" className="hover:text-white transition-colors">Achievements</a></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex space-x-3 mb-6">
                <a href="#" className="w-8 h-8 rounded-full bg-[#1DA1F2] flex items-center justify-center hover:scale-110 transition-transform">
                  <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FFDC80] via-[#F56040] to-[#C13584] flex items-center justify-center hover:scale-110 transition-transform">
                  <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.07M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-[#4267B2] flex items-center justify-center hover:scale-110 transition-transform">
                  <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24"><path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-[#FF0000] flex items-center justify-center hover:scale-110 transition-transform">
                  <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
              <h4 className="font-bold mb-4 text-sm">Download the App</h4>
              <div className="flex space-x-3">
                <button className="flex items-center space-x-2 bg-black border border-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-900 transition-colors">
                  <Play size={16} fill="currentColor" className="text-green-400" />
                  <div className="text-left"><p className="text-[8px] uppercase tracking-wider text-gray-400 leading-none">Get it on</p><p className="text-xs font-semibold leading-none">Google Play</p></div>
                </button>
                <button className="flex items-center space-x-2 bg-black border border-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-900 transition-colors">
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.873 14.502c-.378.192-1.353.642-2.186.642-2.476 0-4.32-1.99-4.32-4.55 0-2.614 1.83-4.506 4.31-4.506.87 0 1.77.426 2.158.625l-.683 1.34c-.28-.155-.91-.453-1.488-.453-1.517 0-2.634 1.182-2.634 2.99 0 1.768 1.096 2.94 2.628 2.94.618 0 1.258-.292 1.558-.45l.657 1.422z"/></svg>
                  <div className="text-left"><p className="text-[8px] uppercase tracking-wider text-gray-400 leading-none">Download on the</p><p className="text-xs font-semibold leading-none">App Store</p></div>
                </button>
              </div>
            </div>
          </div>
          <div className="text-center text-xs text-gray-500 mt-12">
            © 2024 GKSphere. All rights reserved.
          </div>
        </div>

      </div>

    </div>
  );
};

export default LandingPage;
