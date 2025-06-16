import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from './pages/About';
import { useThemeStore } from './contexts/useThemeStore';
import './index.css';

function App() {
  const { dark, toggle } = useThemeStore();

  return (
    <BrowserRouter>
      <div className={dark ? 'dark min-h-screen bg-gray-900 text-white' : 'min-h-screen bg-white text-gray-900'}>
        <button onClick={toggle} className="m-4 p-2 border rounded">
          Toggle Theme
        </button>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
