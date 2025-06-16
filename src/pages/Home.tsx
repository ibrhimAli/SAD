import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4">
      <h1 className="text-2xl font-bold">Home Page</h1>
      <p className="mt-2">Welcome to the app.</p>
    </motion.div>
  );
}
