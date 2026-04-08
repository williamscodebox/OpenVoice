import { motion } from "framer-motion";
import type { VoiceProfile } from "../../types/types.ts";
import './VoiceCarousel.css';

interface VoiceCarouselProps {
  voices: VoiceProfile[];
  onSelect: (voice: VoiceProfile) => void;
}

export default function VoiceCarousel({ voices, onSelect }: VoiceCarouselProps) {
  return (
    <motion.div
      className="voice-carousel"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.12 }
        }
      }}
    >
      {voices.map(v => (
        <motion.button
          key={v.id}
          className="voice-card"
          onClick={() => onSelect(v)}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src={v.avatar} className="voice-avatar" alt={v.name} />
          <h3>{v.name}</h3>
          <p>{v.tagline}</p>
        </motion.button>
      ))}
    </motion.div>
  );
}
