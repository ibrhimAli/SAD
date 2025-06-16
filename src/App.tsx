import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from './pages/About';
import Customize from './pages/Customize';
import MoodEntry from './pages/MoodEntry';
import WelcomeCarousel from './components/WelcomeCarousel';
import { useThemeStore } from './contexts/useThemeStore';
import PermissionsPrompt from './components/PermissionsPrompt';
import { usePermissionStore } from './contexts/usePermissionStore';
import { useCheckInStore } from './contexts/useCheckInStore';
import './index.css';

function InnerApp() {
  const { dark, toggle } = useThemeStore();
  const { shown } = usePermissionStore();
  const { lastPrompt, setLastPrompt } = useCheckInStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [showCheckIn, setShowCheckIn] = React.useState(false);

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

  const handleCheckIn = () => {
    setLastPrompt(Date.now());
    setShowCheckIn(false);
    navigate('/mood');
  };

  return (
    <div className={dark ? 'dark min-h-screen bg-gray-900 text-white' : 'min-h-screen bg-white text-gray-900'}>
      {showCheckIn && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <p className="mb-4">It's time for your daily check-in.</p>
            <button
              onClick={handleCheckIn}
              className="px-4 py-2 bg-primary text-white rounded"
            >
              Go to Check-In
            </button>
          </div>
        </div>
      )}
      <button onClick={toggle} className="m-4 p-2 border rounded">
        Toggle Theme
      </button>
      <NavBar />
      <Routes>
        <Route path="/" element={<WelcomeCarousel />} />
        <Route path="/permissions" element={<PermissionsPrompt />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/customize" element={<Customize />} />
        <Route path="/mood" element={<MoodEntry />} />
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
