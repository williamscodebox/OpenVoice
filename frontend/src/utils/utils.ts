import { callBackend } from "./apiClient";
import type { Result } from "../types/types";

export async function audioCall() {
  try {
    const user = await callBackend<Result>("run");
    console.log("User:", user);
    return user.result;
  } catch (err) {
    console.error("Request failed:", err);
  }
}

const sendAudio = async (audioBlob: Blob) => {
  const formData = new FormData();
  // formData.append("file", audioBlob, "input.wav");
  formData.append("file", audioBlob, "input.webm");

  const res = await fetch("http://localhost:8000/process-audio", {
    method: "POST",
    body: formData,
  });

  const arrayBuffer = await res.arrayBuffer();
  const blob = new Blob([arrayBuffer], { type: "audio/mpeg" });
  const url = URL.createObjectURL(blob);

  const audio = new Audio(url);
  audio.play();
};

mediaRecorder.onstop = async () => {
  const audioBlob = new Blob(chunks, { type: "audio/webm" });
  await sendAudio(audioBlob);
};
