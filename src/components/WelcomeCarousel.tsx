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
    title: 'Track your mood',
    description: 'Log how you feel each day.',
    icon: '📝',
  },
  {
    title: 'See insights',
    description: 'Spot trends in your entries.',
    icon: '📈',
  },
  {
    title: 'Try tips',
    description: 'Discover ways to boost your mood.',
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
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <div className="bg-creamWhite dark:bg-indigo p-6 rounded shadow w-full max-w-md text-center">
        <button onClick={skip} className="self-end mb-4 underline block">
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
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -100) {
                  next();
                } else if (info.offset.x > 100 && index > 0) {
                  setIndex(index - 1);
                }
              }}
            >
              <div className="text-8xl mb-4" aria-hidden="true">
                {slides[index].icon}
              </div>
              <h2 className="text-2xl font-bold">{slides[index].title}</h2>
              <p className="mt-2">{slides[index].description}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex gap-2 mt-4 justify-center">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full ${
                i === index ? 'bg-primary' : 'bg-mutedBlueGray dark:bg-creamWhite'
              }`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="mt-6 px-4 py-2 bg-indigo text-creamWhite rounded w-full"
        >
          {index === slides.length - 1 ? 'Get Started' : 'Next'}
        </button>
      </div>
    </div>
  );
}
