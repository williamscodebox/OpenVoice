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

export async function sendAudio(blob: Blob) {
  const formData = new FormData();
  formData.append("file", blob, "input.webm");

  const res = await fetch("http://localhost:8000/process-audio", {
    method: "POST",
    body: formData,
  });

  const arrayBuffer = await res.arrayBuffer();
  const audioBlob = new Blob([arrayBuffer], { type: "audio/mpeg" });
  const url = URL.createObjectURL(audioBlob);

  new Audio(url).play();
}
