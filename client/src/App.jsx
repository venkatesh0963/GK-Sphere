import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import DashboardLayout from './pages/Dashboard/DashboardLayout';
import SkillTreePage from './pages/Dashboard/SkillTreePage';
import Leaderboard from './pages/Dashboard/Leaderboard';
import Achievements from './pages/Dashboard/Achievements';
import Settings from './pages/Dashboard/Settings';
import MyProgress from './pages/Dashboard/MyProgress';
import AdminPanel from './pages/AdminPanel';
// import { useSelector } from 'react-redux';

function App() {
  return (
    <Router>
      <div className="min-h-screen font-['Inter']">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<SkillTreePage />} />
            <Route path="progress" element={<MyProgress />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="achievements" element={<Achievements />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
