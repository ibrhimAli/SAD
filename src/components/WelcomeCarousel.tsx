import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Slide {
  title: string;
  description: string;
  icon: string;
}

const slides: Slide[] = [
  {
    title: 'Log your mood',
    description: 'Track how you feel every day.',
    icon: '📝',
  },
  {
    title: 'View insights',
    description: 'Discover patterns in your emotions.',
    icon: '📊',
  },
  {
    title: 'Get tips for well-being',
    description: 'Personalised advice to improve your mood.',
    icon: '💡',
  },
];

export default function WelcomeCarousel() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const next = () => {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    } else {
      navigate('/mood');
    }
  };

  const skip = () => navigate('/mood');

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 text-center">
      <button onClick={skip} className="self-end mb-4 underline">
        Skip
      </button>
      <div className="flex-1 flex items-center justify-center w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <div className="text-6xl mb-4" aria-hidden="true">
              {slides[index].icon}
            </div>
            <h2 className="text-2xl font-bold">{slides[index].title}</h2>
            <p className="mt-2">{slides[index].description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex gap-2 mt-4">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full ${
              i === index ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
      <button
        onClick={next}
        className="mt-6 px-4 py-2 bg-primary text-white rounded"
      >
        {index === slides.length - 1 ? 'Get Started' : 'Next'}
      </button>
    </div>
  );
}
