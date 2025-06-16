import { motion } from 'framer-motion'

export default function About() {
  return (
    <motion.div className="p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="text-xl font-bold text-primary">About Page</h1>
    </motion.div>
  )
}
