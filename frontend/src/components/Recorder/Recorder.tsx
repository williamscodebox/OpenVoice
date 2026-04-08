import { motion } from "framer-motion";
import './Recorder.css';

interface RecorderProps {
  isRecording: boolean;
  onStop: () => void;
  error: string | null;
}

export default function Recorder({ isRecording, onStop, error }: RecorderProps) {
  return (
    <motion.div
      className="recorder"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className={`record-circle ${isRecording ? 'active' : ''}`}
        animate={isRecording ? { scale: [1, 1.15, 1] } : {}}
        transition={{ repeat: Infinity, duration: 1.2 }}
      />

      <p className="recorder-status">
        {isRecording ? "Recording… Speak naturally." : "Tap record to start your transformation."}
      </p>

      {isRecording && (
        <motion.button
          className="stop-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          onClick={onStop}
        >
          ⏹ Stop
        </motion.button>
      )}

      {error && <p className="recorder-error">{error}</p>}
    </motion.div>
  );
}
