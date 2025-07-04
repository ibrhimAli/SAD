import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate, Link } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from './pages/About';
import Customize from './pages/Customize';
import MoodEntry from './pages/MoodEntry';
import Calendar from './pages/Calendar';
import TherapyScheduler from './pages/TherapyScheduler';
import Analytics from './pages/Analytics';
import TipOfTheDay from './pages/TipOfTheDay';
import Challenge from './pages/Challenge';
import WelcomeCarousel from './components/WelcomeCarousel';
import { useThemeStore } from './contexts/useThemeStore';
import { getSeasonColors } from './utils/getSeasonColors';
import PermissionsPrompt from './components/PermissionsPrompt';
import { usePermissionStore } from './contexts/usePermissionStore';
import { useCheckInStore } from './contexts/useCheckInStore';
import PremiumModal from './components/PremiumModal';
import { usePremiumStore } from './contexts/usePremiumStore';
import { shouldShowPremiumModal } from './utils/premium';
import './index.css';

function InnerApp() {
  const { dark, toggle, season } = useThemeStore();
  const colors = getSeasonColors(season);
  const { shown } = usePermissionStore();
  const { lastPrompt, setLastPrompt } = useCheckInStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [showCheckIn, setShowCheckIn] = React.useState(false);
  const {
    firstUse,
    dismissed: premiumDismissed,
    trialStarted,
    setDismissed,
    startTrial,
  } = usePremiumStore();
  const [showPremium, setShowPremium] = React.useState(false);
  const PREMIUM_DAYS = 7;

  React.useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [dark]);

  React.useEffect(() => {
    if (
      !shown &&
      location.pathname !== '/permissions' &&
      location.pathname !== '/'
    ) {
      navigate('/permissions', { replace: true });
    }
  }, [shown, location.pathname, navigate]);

  React.useEffect(() => {
    const now = Date.now();
    if (
      location.pathname !== '/mood' &&
      location.pathname !== '/permissions' &&
      now - lastPrompt >= 24 * 60 * 60 * 1000
    ) {
      setShowCheckIn(true);
    }
  }, [lastPrompt, location.pathname]);

  React.useEffect(() => {
    if (
      shouldShowPremiumModal(
        firstUse,
        premiumDismissed,
        trialStarted,
        PREMIUM_DAYS,
      )
    ) {
      setShowPremium(true);
    }
  }, [firstUse, premiumDismissed, trialStarted]);

  React.useEffect(() => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return
    }
    if (Notification.permission === 'default') {
      void Notification.requestPermission()
    }
  }, [])

  const handleCheckIn = () => {
    setLastPrompt(Date.now());
    setShowCheckIn(false);
    navigate('/mood');
  };

  const handleStartTrial = () => {
    startTrial();
    setShowPremium(false);
  };

  const handleDismissPremium = () => {
    setDismissed(true);
    setShowPremium(false);
  };

  return (
    <div
      className={`min-h-screen ${
        dark ? 'dark bg-indigo text-creamWhite' : 'bg-pastelYellow text-indigo'
      }`}
      style={{ backgroundImage: `url(${colors.image})`, backgroundSize: 'cover' }}
    >
      {showCheckIn && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-creamWhite dark:bg-indigo p-4 rounded shadow">
            <p className="mb-4">It's time for your daily check-in.</p>
            <button
              onClick={handleCheckIn}
              className="px-4 py-2 bg-primary-dark text-white rounded"
            >
              Go to Check-In
            </button>
          </div>
        </div>
      )}
      {showPremium && (
        <PremiumModal
          onStart={handleStartTrial}
          onClose={handleDismissPremium}
        />
      )}
      <button onClick={toggle} className="m-4 p-2 border rounded">
        Toggle Theme
      </button>
      <NavBar />
      <div className="p-4">
        <Link
          to="/mood"
          className="inline-block px-4 py-2 bg-primary-dark text-white rounded"
        >
          Log today’s mood
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<WelcomeCarousel />} />
        <Route path="/permissions" element={<PermissionsPrompt />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/customize" element={<Customize />} />
        <Route path="/mood" element={<MoodEntry />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/scheduler" element={<TherapyScheduler />} />
        <Route path="/challenge" element={<Challenge />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/tip" element={<TipOfTheDay />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <InnerApp />
    </BrowserRouter>
  );
}

export default App;
