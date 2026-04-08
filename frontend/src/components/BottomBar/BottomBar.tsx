import { motion } from "framer-motion";
import './BottomBar.css';

interface BottomBarProps {
  onRecord: () => void;
  onUpload: () => void;
  onRandom: () => void;
}

export default function BottomBar({ onRecord, onUpload, onRandom }: BottomBarProps) {
  return (
    <motion.nav
      className="bottom-bar"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.button className="bottom-btn" whileTap={{ scale: 0.9 }} onClick={onRecord}>
        🎙️ Record
      </motion.button>

      <motion.button className="bottom-btn" whileTap={{ scale: 0.9 }} onClick={onUpload}>
        📤 Upload
      </motion.button>

      <motion.button className="bottom-btn" whileTap={{ scale: 0.9 }} onClick={onRandom}>
        🎲 Random Voice
      </motion.button>
    </motion.nav>
  );
}
