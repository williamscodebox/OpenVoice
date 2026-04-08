import { motion } from "framer-motion";
import './ProcessingScreen.css';

export default function ProcessingScreen() {
  return (
    <motion.div
      className="processing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="processing-spinner"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <p>Teaching your voice new tricks…</p>
    </motion.div>
  );
}
