import whisper
import sounddevice as sd
import numpy as np

# Load Whisper model (choose: tiny, base, small, medium, large)
model = whisper.load_model("base")

RATE = 16000
DURATION = 8  # seconds

print("Listening...")

while True:
    audio = sd.rec(
        int(RATE * DURATION),
        samplerate=RATE,
        channels=1,
        dtype='int16'
    )
    sd.wait()

# Convert to float32 for Whisper
    audio_float = audio.flatten().astype(np.float32) / 32768.0

    # Transcribe
    result = model.transcribe(audio_float, fp16=False)
    text = result["text"].strip()

    if text:
        print("You said:", text)