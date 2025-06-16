import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from './pages/About';
import Customize from './pages/Customize';
import WelcomeCarousel from './components/WelcomeCarousel';
import { useThemeStore } from './contexts/useThemeStore';
import PermissionsPrompt from './components/PermissionsPrompt';
import { usePermissionStore } from './contexts/usePermissionStore';
import './index.css';

function InnerApp() {
  const { dark, toggle } = useThemeStore();
  const { shown } = usePermissionStore();
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (
      !shown &&
      location.pathname !== '/permissions' &&
      location.pathname !== '/'
    ) {
      navigate('/permissions', { replace: true });
    }
  }, [shown, location.pathname, navigate]);

  return (
    <div className={dark ? 'dark min-h-screen bg-gray-900 text-white' : 'min-h-screen bg-white text-gray-900'}>
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
