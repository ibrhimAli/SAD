import { motion, useReducedMotion } from 'framer-motion';
import StreakCounter from '../components/StreakCounter';
import ContentFeed from '../components/ContentFeed';

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
      <p className="mt-2">Welcome to the app.</p>
      <StreakCounter />
      <div className="mt-4">
        <ContentFeed />
      </div>
    </motion.div>
  );
}

