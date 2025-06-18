import { motion, useReducedMotion } from 'framer-motion';
import StreakCounter from '../components/StreakCounter';
import ContentFeed from '../components/ContentFeed';
import { Link } from 'react-router-dom';

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
      className="p-4"
    >
      <h1 className="text-2xl font-bold">Home Page</h1>
      <p className="mt-2">Welcome to the app. "Every day is a new beginning."</p>
      <StreakCounter />
      <Link
        to="/mood"
        className="mt-4 inline-block px-4 py-2 bg-primary-dark text-white rounded"
      >
        Log today’s mood
      </Link>
      <div className="mt-4">
        <ContentFeed />
      </div>
    </motion.div>
  );
}

