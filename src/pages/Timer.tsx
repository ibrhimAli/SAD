import React from 'react';
import { motion } from 'framer-motion';

const DURATION = 60; // seconds

export default function Timer() {
  const [timeLeft, setTimeLeft] = React.useState(DURATION);
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    if (!isActive) return;
    if (timeLeft <= 0) {
      setIsActive(false);
      return;
    }
    const id = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [isActive, timeLeft]);

  const toggle = () => setIsActive((a) => !a);
  const reset = () => {
    setIsActive(false);
    setTimeLeft(DURATION);
  };

  const progress = (timeLeft / DURATION) * 100;

  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded">
        <motion.div
          animate={{ width: `${progress}%` }}
          className="h-2 bg-primary rounded"
        />
      </div>
      <motion.div
        key={timeLeft}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-5xl font-mono"
      >
        {timeLeft > 0 ? timeLeft : "Time's up!"}
      </motion.div>
      <div className="flex gap-2">
        <button
          onClick={toggle}
          className="px-4 py-2 bg-primary text-white rounded"
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={reset} className="px-4 py-2 border rounded">
          Reset
        </button>
      </div>
    </div>
  );
}
