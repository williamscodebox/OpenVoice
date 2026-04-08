// src/App.tsx
import { useMemo, useState } from 'react';
import Hero from './components/Hero/Hero';
import Recorder from './components/Recorder/Recorder';
import VoiceCarousel from './components/VoiceCarousel/VoiceCarousel';
import ProcessingScreen from './components/ProcessingScreen/ProcessingScreen';
import PlaybackPanel from './components/PlaybackPanel/PlaybackPanel';
import BottomBar from './components/BottomBar/BottomBar';
import { useAudioRecorder } from './utils/hooks/useAudioRecorder';
import type { VoiceProfile } from './types/types.ts';
import './App.css';
import narratorIcon from './assets/icons/n.png';
import comedianIcon from './assets/icons/c.png';
import popstarIcon from './assets/icons/p.png';

type AppPhase = 'idle' | 'recording' | 'processing' | 'playback';

function App() {
  const [phase, setPhase] = useState<AppPhase>('idle');
  const [selectedVoice, setSelectedVoice] = useState<VoiceProfile | null>(null);
  const [transformedUrl, setTransformedUrl] = useState<string | null>(null);

  const { isRecording, audioUrl, error, startRecording, stopRecording, reset } =
    useAudioRecorder();

  const voices = useMemo<VoiceProfile[]>(
    () => [
      {
        id: 'narrator',
        name: 'The Narrator',
        tagline: 'Deep, calm, cinematic.',
        avatar: narratorIcon,
      },
      {
        id: 'comedian',
        name: 'The Comedian',
        tagline: 'Playful, bright, energetic.',
        avatar: comedianIcon,
      },
      {
        id: 'popstar',
        name: 'The Pop Star',
        tagline: 'Smooth, modern, catchy.',
        avatar: popstarIcon,
      },
    ],
    []
  );

  const handleStartRecording = async () => {
    await startRecording();
    setPhase('recording');
  };

  const handleStopRecording = () => {
    stopRecording();
    setPhase('idle');
  };

  const handleUpload = () => {
    // placeholder: wire to file input or drag-drop
    alert('Upload flow not implemented yet.');
  };

  const handleSelectVoice = (voice: VoiceProfile) => {
    setSelectedVoice(voice);
    if (!audioUrl) return;
    setPhase('processing');

    // simulate backend processing
    setTimeout(() => {
      // in real app, set transformedUrl from backend response
      setTransformedUrl(audioUrl);
      setPhase('playback');
    }, 2000);
  };

  const handleRandomVoice = () => {
    const random = voices[Math.floor(Math.random() * voices.length)];
    handleSelectVoice(random);
  };

  const handleRetry = () => {
    setPhase('idle');
    setTransformedUrl(null);
    reset();
  };

  return (
    <div className="app-root">
      <Hero onStartRecording={handleStartRecording} onUpload={handleUpload} />

      <main className="app-main">
        <section className="app-section">
          <Recorder isRecording={isRecording} onStop={handleStopRecording} error={error} />
        </section>

        <section className="app-section">
          <h2>Choose Your New Voice</h2>
          <VoiceCarousel voices={voices} onSelect={handleSelectVoice} />
        </section>
       
        <section className="app-section">
          {phase === 'processing' && <ProcessingScreen />}
          {phase === 'playback' && audioUrl && transformedUrl && (
            <PlaybackPanel
              original={audioUrl}
              transformed={transformedUrl}
              selectedVoice={selectedVoice}
              onRetry={handleRetry}
            />
          )}
        </section>
      </main>

      <BottomBar
        onRecord={handleStartRecording}
        onUpload={handleUpload}
        onRandom={handleRandomVoice}
      />
    </div>
  );
}

export default App;
