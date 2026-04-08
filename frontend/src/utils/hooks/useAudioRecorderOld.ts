import { useRef, useState } from "react";

export function useAudioRecorder() {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    // const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const devices = await navigator.mediaDevices.enumerateDevices();
    const mics = devices.filter(d => d.kind === "audioinput");

    if (mics.length === 0) {
      throw new Error("No microphones available");
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: { deviceId: mics[0].deviceId }
    });

    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;
    chunksRef.current = [];

    recorder.ondataavailable = (e) => {
      chunksRef.current.push(e.data);
    };

    recorder.start();
    setIsRecording(true);
  };

  const stopRecording = async (): Promise<Blob> => {
    return new Promise((resolve) => {
      const recorder = mediaRecorderRef.current;
      if (!recorder) return;

      recorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        setIsRecording(false);
        resolve(audioBlob);
      };

      recorder.stop();
    });
  };

  return { startRecording, stopRecording, isRecording };
}
