import { motion } from "framer-motion";
import type { VoiceProfile } from "../../types/types.ts";
import './PlaybackPanel.css';

interface PlaybackPanelProps {
  original: string;
  transformed: string;
  selectedVoice: VoiceProfile | null;
  onRetry: () => void;
}

export default function PlaybackPanel({
  original,
  transformed,
  selectedVoice,
  onRetry
}: PlaybackPanelProps) {
  return (
    <motion.div
      className="playback-panel"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="playback-header">
        <h2>Compare Your Voice</h2>
        {selectedVoice && (
          <span className="playback-voice-tag">
            Using: <strong>{selectedVoice.name}</strong>
          </span>
        )}
      </div>

      <div className="playback-row">
        <div>
          <h4>Original</h4>
          <audio controls src={original} />
        </div>
        <div>
          <h4>Transformed</h4>
          <audio controls src={transformed} />
        </div>
      </div>

      <div className="playback-actions">
        <motion.button
          className="btn secondary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={onRetry}
        >
          Try Another Take
        </motion.button>

        <motion.button
          className="btn primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
        >
          Download
        </motion.button>
      </div>
    </motion.div>
  );
}
