import { motion } from "framer-motion";
import './Hero.css';

interface HeroProps {
  onStartRecording: () => void;
  onUpload: () => void;
}

export default function Hero({ onStartRecording, onUpload }: HeroProps) {
  return (
    <motion.header
      className="hero"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="hero-overlay" />

      <motion.div
        className="hero-content"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h1>Swap Your Voice. Become Anyone.</h1>
        <p>Instant AI voice transformation with studio‑grade quality.</p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            className="btn primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartRecording}
          >
            🎙️ Start Recording
          </motion.button>

          <motion.button
            className="btn secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onUpload}
          >
            📤 Upload Audio
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.header>
  );
}
